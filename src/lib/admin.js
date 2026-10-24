import "server-only";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./supabase/server";

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) throw new Error(`Gagal memeriksa sesi admin: ${error.message}`);
  if (!user || user.app_metadata?.role !== "admin") {
    redirect("/admin/login");
  }

  return { supabase, user };
}
