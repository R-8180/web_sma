import Link from "next/link";
import Image from "next/image";
import NewsCard from "../components/NewsCard";
import { missionItems, newsItems } from "../data";

export default function HomePage() {
  const featuredNews = newsItems;

  return (
    <main>
      <section className="relative isolate flex min-h-[540px] items-end overflow-hidden bg-school-forest md:min-h-[620px]">
        <Image
          src="/sma9.jpg"
          alt="Gedung SMA Negeri 9 Semarang di Banyumanik"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,45,29,0.62)_0%,rgba(24,45,29,0.3)_48%,rgba(24,45,29,0.02)_100%)]" />

        <div className="section-shell relative z-10 w-full pb-12 pt-16 md:pb-16">
          <div className="max-w-2xl text-white">
            <p className="mb-4 text-sm font-semibold text-white/90">Sekolah negeri di Banyumanik</p>
            <h1 className="max-w-[12ch] text-4xl font-bold leading-[1.08] sm:text-5xl md:text-6xl">
              SMA Negeri 9 Semarang
            </h1>
            <p className="mt-5 max-w-[38ch] text-base leading-7 text-white/90 md:text-lg">
              Tempat belajar, bertumbuh, dan merawat lingkungan bersama.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex min-h-12 items-center bg-white px-5 text-sm font-bold text-school-ink transition-colors hover:bg-school-sage focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-px"
              >
                Profil sekolah <span aria-hidden="true" className="ml-3">&rarr;</span>
              </Link>
              <Link
                href="/berita"
                className="inline-flex min-h-12 items-center border border-white/80 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-px"
              >
                Berita sekolah
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="sambutan" className="bg-school-sage text-school-ink">
        <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-10">
          <div className="overflow-hidden rounded-[1.5rem] border border-[#d9dfd2] bg-[#f4f6f0] shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
            <div className="grid items-center gap-3 lg:grid-cols-[0.38fr_1.62fr] lg:gap-4">
              <div className="relative h-full min-h-[240px] bg-[#edf2eb] lg:min-h-[320px]">
                <Image
                  src="/kepala_sekolah.jpeg"
                  alt="Kepala SMA Negeri 9 Semarang"
                  width={640}
                  height={840}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="px-4 py-4 md:px-5 md:py-5 lg:px-7 lg:py-6">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-school-forest md:text-[11px]">
                  Sambutan Kepala Sekolah
                </p>
                <h2 className="text-lg font-bold leading-snug text-school-ink md:text-xl">
                  Assalamualaikum warahmatullahi wabarakatuh,
                </h2>

                <div className="mt-3 space-y-2 text-[12.5px] leading-6 text-school-ink/80 md:text-sm md:leading-7">
                  <p>
                    Puji syukur kita panjatkan ke hadirat Allah SWT, Tuhan Yang Maha Esa, atas limpahan rahmat dan karunia-Nya sehingga website SMA Negeri 9 Semarang ini dapat hadir sebagai sarana informasi dan komunikasi bagi seluruh warga sekolah dan masyarakat.
                  </p>
                  <p>
                    Website ini kami hadirkan sebagai bentuk komitmen dalam memanfaatkan perkembangan teknologi informasi untuk mendukung kemajuan pendidikan. Melalui platform ini, kami berupaya menyediakan informasi yang dibutuhkan siswa, guru, orang tua, dan masyarakat luas.
                  </p>
                  <p>
                    Kami menyadari bahwa dalam era digital, keterbukaan informasi dan kemudahan akses menjadi kebutuhan penting. Oleh karena itu, website ini diharapkan menjadi media yang efektif, informatif, dan inspiratif bagi semua pihak.
                  </p>
                  <p>
                    Besar harapan kami, website ini dapat menjadi jembatan komunikasi yang baik antara sekolah dengan keluarga besar SMA Negeri 9 Semarang.
                  </p>
                </div>

                <div className="mt-4 border-t border-[#d2d8ce] pt-3 text-[12.5px] text-school-ink/80 md:text-sm">
                  <p>Wassalamualaikum warahmatullahi wabarakatuh,</p>
                  <p className="mt-3 font-bold text-school-ink">Hormat kami,</p>
                  <p className="mt-1 font-semibold text-school-ink">Kepala SMA Negeri 9 Semarang</p>
                  <p className="mt-2 font-semibold text-school-ink">Rr. Tri Widiyastuti, S.Pd.</p>
                  <p>NIP. 19701231 199702 2 003</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10">
          <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10">
            <div className="pt-1">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-school-forest">
                Profil sekolah
              </p>
              <h2 className="max-w-[12ch] text-2xl font-black leading-tight text-school-ink md:text-[2rem]">
                SMA Negeri 9 Semarang
              </h2>
              <p className="mt-3 max-w-[38ch] text-sm leading-6 text-school-ink/75">
                Sekolah menengah atas negeri yang menumbuhkan semangat belajar, membangun akhlak mulia, serta menanamkan kepedulian terhadap lingkungan dan sesama.
              </p>
            </div>

            <div className="border-l-4 border-school-yellow bg-[#f8faf6] pl-4 py-2 md:pl-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-school-forest">Visi</p>
              <p className="mt-2 text-sm leading-6 text-school-ink/80 md:text-[14px] md:leading-7">
                Terwujudnya SMA Negeri 9 Semarang yang aman dan nyaman bagi seluruh komponen sekolah untuk meningkatkan ketaqwaan, hubungan sosial, pengetahuan, keterampilan, kepedulian berbudaya, pencegahan terhadap pencemaran dan kerusakan, serta pelestarian lingkungan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="kabar" className="bg-[#f7f9f5] py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-bold text-school-forest">Dari sekolah</p>
              <h2 className="text-3xl font-bold text-school-ink md:text-4xl">Kabar dan kegiatan</h2>
            </div>
            <Link href="/berita" className="border-b border-school-forest pb-1 text-sm font-bold text-school-forest hover:text-school-ink">
              Semua berita <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            {featuredNews.map((item) => (
              <NewsCard key={item.id} item={item} compact />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
