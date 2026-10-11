import Image from "next/image";
import { missionItems, schoolDetails } from "../../data";

export const metadata = {
  title: "Profil | SMA Negeri 9 Semarang",
  description: "Profil sekolah, sejarah, visi, misi, dan komitmen SMA Negeri 9 Semarang.",
};

export default function AboutPage() {
  return (
    <main className="section-shell py-12 md:py-16">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <h1 className="max-w-[14ch] text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Mengenal SMA Negeri 9 Semarang
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
            SMA Negeri 9 Semarang adalah sekolah menengah negeri di Kelurahan Padangsari, Kecamatan Banyumanik, Kota Semarang.
          </p>
        </div>

        <figure>
          <div className="relative aspect-[4/3]">
            <Image
              src="/sma9.jpg"
              alt="Gedung SMA Negeri 9 Semarang di Banyumanik"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="mt-2 text-xs text-slate-500">Gedung SMA Negeri 9 Semarang.</figcaption>
        </figure>
      </section>

      <section className="mt-16 grid gap-10 border-y border-slate-200 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Sejarah singkat</h2>
          <div className="prose-lg mt-6 space-y-4 text-slate-600">
            <p>
              SMA Negeri 9 Semarang didirikan pada tahun pelajaran 1981/1982 berdasarkan Surat Keputusan Menteri Pendidikan dan Kebudayaan Republik Indonesia Nomor 0219/O/1981 tanggal 14 Juli 1981 tentang pembukaan sekolah baru.
            </p>
            <p>
              Pada awal berdirinya, sekolah diampu oleh 15 orang guru dengan R. Soemarman sebagai kepala sekolah pertama. Selanjutnya, setelah pembangunan enam ruang kelas baru di Jl. Cemara Raya selesai pada 1 Februari 1982, kegiatan belajar mengajar dipindahkan ke gedung sekolah yang baru.
            </p>
          </div>
        </div>

        <div className="lg:border-l lg:border-slate-200 lg:pl-8">
          <h2 className="text-2xl font-black text-slate-900">Identitas sekolah</h2>
          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between gap-4 border-b border-school-line pb-3">
              <dt className="text-slate-500">Nama sekolah</dt>
              <dd className="font-semibold text-slate-800">{schoolDetails.name}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-school-line pb-3">
              <dt className="text-slate-500">NPSN</dt>
              <dd className="font-semibold text-slate-800">{schoolDetails.npsn}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-school-line pb-3">
              <dt className="text-slate-500">Alamat</dt>
              <dd className="text-right font-semibold text-slate-800">{schoolDetails.address}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-school-line pb-3">
              <dt className="text-slate-500">Telepon</dt>
              <dd className="font-semibold text-slate-800">{schoolDetails.phone}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-school-line pb-3">
              <dt className="text-slate-500">Email</dt>
              <dd className="font-semibold text-slate-800">{schoolDetails.email}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Visi dan misi</h2>
        <p className="mt-6 max-w-4xl border-l-4 border-school-yellow pl-5 text-lg leading-8 text-slate-700">
          Terwujudnya SMA Negeri 9 Semarang yang aman dan nyaman bagi seluruh komponen sekolah untuk meningkatkan ketaqwaan, hubungan sosial, pengetahuan, keterampilan, kepedulian berbudaya, pencegahan terhadap pencemaran dan kerusakan, serta pelestarian lingkungan.
        </p>

        <ol className="mt-10 grid grid-cols-1 gap-x-10 border-t border-slate-200 lg:grid-cols-2">
          {missionItems.map((mission) => (
            <li key={mission.title} className="grid gap-2 border-b border-slate-200 py-4 sm:grid-cols-[5rem_1fr] sm:gap-4">
              <h3 className="font-semibold text-school-forest">{mission.title}</h3>
              <p className="text-sm leading-7 text-slate-600">{mission.description}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
