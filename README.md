This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Menjalankan project

Jalankan server pengembangan:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Buka http://localhost:3000.

## Struktur project


## CMS admin dan Supabase

Konten situs dapat diedit melalui dashboard admin. Pengaturan halaman disimpan pada tabel `site_content`, berita disimpan pada tabel `news`, dan gambar baru diunggah ke bucket Storage `site-images`.

### Menyiapkan Supabase

1. Buka **SQL Editor** pada project Supabase dan jalankan isi `supabase/migrations/202610240001_cms_setup.sql`. Migrasi ini membuat tabel konten dan bucket Storage publik `site-images`, dengan akses unggah/hapus dibatasi untuk akun admin.
2. Salin `.env.example` menjadi `.env.local`, lalu isi `NEXT_PUBLIC_SUPABASE_ANON_KEY` dengan **anon/public/publishable key** dari pengaturan API project. URL project sudah disediakan di template.
3. Buat akun admin melalui **Authentication → Users** di Supabase. Pada **app_metadata** akun tersebut, tetapkan:

   ```json
   { "role": "admin" }
   ```

   Jangan mengatur peran admin melalui `user_metadata`, karena metadata itu dapat diubah oleh pemilik akun.
4. Jalankan `npm run dev`, buka `/admin/login`, lalu masuk dengan email dan password akun admin.
5. Klik **Inisialisasi konten awal** sekali untuk menyalin teks, profil sekolah, kontak, dan berita bawaan situs ke database. Proses ini tidak menimpa data yang sudah ada.

`.env.local` tidak boleh di-commit. Aplikasi hanya menggunakan URL project dan anon/publishable key yang dibatasi oleh Row Level Security; **password database tidak diperlukan dan jangan disimpan di kode atau file frontend**. Karena password database sempat dibagikan melalui chat, segera rotasi/reset password itu dari pengaturan database Supabase dan jangan gunakan kembali password yang sama.

Dashboard menggunakan formulir visual untuk mengedit beranda, identitas/navigasi, profil, misi, halaman berita, kontak/footer, dan berita. Item seperti menu navigasi, data sekolah, misi, paragraf, dan tautan sosial dapat ditambah atau dihapus langsung melalui tombol. Untuk menyimpan foto di Supabase, pilih foto pada kolom gambar lalu tekan **Gunakan gambar ini**; foto diunggah ke bucket `site-images` dan tautannya disimpan bersama konten di database. Format yang diterima JPG, PNG, WEBP, atau GIF dengan ukuran maksimal 5 MB. Foto lama yang masih memakai alamat file lokal perlu diunggah ulang melalui dashboard agar berpindah ke Storage.

Tautan **Login Admin** tersedia pada navigasi website dan membuka `/admin/login`.

Jika kredensial Supabase belum dikonfigurasi, situs menampilkan konten awal lokal. Dashboard dan penyimpanan Supabase baru berfungsi setelah langkah konfigurasi di atas selesai.

Application routes and layouts are written in JavaScript under `src/app/`.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
