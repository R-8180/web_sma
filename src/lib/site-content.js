import "server-only";
import { defaultNewsItems, defaultSiteContent } from "./content-defaults";
import { getSupabaseConfig } from "./supabase/env";
import { createSupabaseServerClient } from "./supabase/server";

export async function getSiteContent() {
  if (!getSupabaseConfig()) {
    console.warn("Supabase belum dikonfigurasi; menampilkan konten awal lokal.");
    return defaultSiteContent;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("id", 1)
    .maybeSingle();

  if (error) throw new Error(`Gagal membaca konten situs: ${error.message}`);
  return data?.content ?? defaultSiteContent;
}

export async function getNewsItems({ includeUnpublished = false } = {}) {
  if (!getSupabaseConfig()) {
    console.warn("Supabase belum dikonfigurasi; menampilkan berita awal lokal.");
    return defaultNewsItems;
  }

  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("news")
    .select("id, category, title, date, excerpt, image, content, published")
    .order("created_at", { ascending: false });

  if (!includeUnpublished) query = query.eq("published", true);

  const { data, error } = await query;
  if (error) throw new Error(`Gagal membaca berita: ${error.message}`);
  return data ?? [];
}
