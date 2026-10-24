"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./env";

let supabase;

export function getSupabaseBrowserClient() {
  const config = getSupabaseConfig();
  if (!config) {
    throw new Error(
      "Supabase belum dikonfigurasi. Salin .env.example ke .env.local dan isi NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  supabase ??= createBrowserClient(config.url, config.key);
  return supabase;
}
