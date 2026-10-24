"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { defaultNewsItems, defaultSiteContent } from "../../lib/content-defaults";
import { requireAdmin } from "../../lib/admin";
import { createSupabaseServerClient } from "../../lib/supabase/server";

export async function signInAdmin(_previousState, formData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Email dan password harus diisi." };

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Login gagal. Periksa email dan password." };

  if (data.user?.app_metadata?.role !== "admin") {
    await supabase.auth.signOut();
    return { error: "Akun ini belum memiliki akses admin." };
  }

  redirect("/admin");
}

export async function signOutAdmin() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(`Gagal keluar: ${error.message}`);
  redirect("/admin/login");
}

export async function saveSiteContent(content) {
  const { supabase } = await requireAdmin();
  if (!content || typeof content !== "object" || Array.isArray(content)) {
    return { error: "Format konten tidak valid." };
  }

  const { error } = await supabase
    .from("site_content")
    .upsert({ id: 1, content, updated_at: new Date().toISOString() });
  if (error) return { error: `Konten gagal disimpan: ${error.message}` };

  revalidatePath("/", "layout");
  return { success: "Konten situs berhasil disimpan." };
}

export async function saveNewsItem(item) {
  const { supabase } = await requireAdmin();
  const fields = ["id", "category", "title", "date", "excerpt", "image"];
  if (!item || fields.some((field) => typeof item[field] !== "string" || !item[field].trim())) {
    return { error: "Lengkapi semua kolom berita." };
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id)) {
    return { error: "Slug berita hanya boleh berisi huruf kecil, angka, dan tanda hubung." };
  }
  if (!Array.isArray(item.content) || !item.content.length || item.content.some((p) => typeof p !== "string" || !p.trim())) {
    return { error: "Isi berita harus memiliki minimal satu paragraf." };
  }

  const { error } = await supabase.from("news").upsert({
    ...Object.fromEntries(fields.map((field) => [field, item[field].trim()])),
    content: item.content.map((paragraph) => paragraph.trim()),
    published: Boolean(item.published),
  });
  if (error) return { error: `Berita gagal disimpan: ${error.message}` };

  revalidatePath("/", "layout");
  revalidatePath("/berita");
  revalidatePath(`/berita/${item.id}`);
  return { success: "Berita berhasil disimpan." };
}

export async function deleteNewsItem(id) {
  const { supabase } = await requireAdmin();
  if (typeof id !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
    return { error: "Slug berita tidak valid." };
  }

  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) return { error: `Berita gagal dihapus: ${error.message}` };

  revalidatePath("/", "layout");
  revalidatePath("/berita");
  revalidatePath(`/berita/${id}`);
  return { success: "Berita berhasil dihapus." };
}

export async function uploadImage(formData) {
  const { supabase } = await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || !file.size) return { error: "Pilih gambar untuk diunggah." };
  if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
    return { error: "Format gambar harus JPG, PNG, WEBP, atau GIF." };
  }
  if (file.size > 5 * 1024 * 1024) return { error: "Ukuran gambar maksimal 5 MB." };

  const extension = file.type.split("/")[1].replace("jpeg", "jpg");
  const path = `${crypto.randomUUID()}.${extension}`;
  const { data, error } = await supabase.storage
    .from("site-images")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) return { error: `Gambar gagal diunggah: ${error.message}` };

  const { data: { publicUrl } } = supabase.storage.from("site-images").getPublicUrl(data.path);
  return { url: publicUrl };
}

export async function initializeContent() {
  const { supabase } = await requireAdmin();
  const { data: current, error: readError } = await supabase
    .from("site_content")
    .select("id")
    .eq("id", 1)
    .maybeSingle();
  if (readError) return { error: `Gagal memeriksa konten situs: ${readError.message}` };

  if (!current) {
    const { error } = await supabase.from("site_content").insert({ id: 1, content: defaultSiteContent });
    if (error) return { error: `Gagal menginisialisasi konten situs: ${error.message}` };
  }

  const { data: existingNews, error: newsReadError } = await supabase
    .from("news")
    .select("id")
    .limit(1);
  if (newsReadError) return { error: `Gagal memeriksa berita: ${newsReadError.message}` };

  if (!existingNews?.length) {
    const { error } = await supabase.from("news").insert(
      defaultNewsItems.map((item) => ({ ...item, published: true })),
    );
    if (error) return { error: `Gagal menginisialisasi berita: ${error.message}` };
  }

  revalidatePath("/", "layout");
  return { success: "Konten awal dan berita berhasil disalin ke Supabase." };
}
