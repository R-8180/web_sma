import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section-shell flex min-h-[60vh] items-center justify-center py-16">
      <div className="max-w-xl rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-[0_22px_50px_-35px_rgba(15,23,42,0.4)]">
        <div className="mb-4 text-xs font-semibold tracking-[0.2em] text-school-forest uppercase">
          Not found
        </div>
        <h1 className="text-3xl font-black text-slate-900 md:text-4xl">Halaman yang Anda cari tidak tersedia.</h1>
        <p className="mt-4 text-slate-600">
          Berita yang diminta mungkin belum tersedia atau ID yang dimasukkan tidak valid.
        </p>
        <Link
          href="/berita"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-school-forest px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
        >
          Kembali ke daftar berita
        </Link>
      </div>
    </main>
  );
}
