import Image from "next/image";
import { connection } from "next/server";
import { getSiteContent } from "../../lib/site-content";

export const metadata = {
  title: "Profil | SMA Negeri 9 Semarang",
  description: "Profil sekolah, sejarah, visi, misi, dan komitmen SMA Negeri 9 Semarang.",
};

export const instant = false;

export default async function AboutPage() {
  await connection();
  const { about } = await getSiteContent();

  return (
    <main className="section-shell py-12 md:py-16">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <h1 className="max-w-[14ch] text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            {about.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
            {about.introduction}
          </p>
        </div>

        <figure>
          <div className="relative aspect-[4/3]">
            <Image
              src={about.image}
              alt={about.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="mt-2 text-xs text-slate-500">{about.imageCaption}</figcaption>
        </figure>
      </section>

      <section className="mt-16 grid gap-10 border-y border-slate-200 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-2xl font-black text-slate-900">{about.historyTitle}</h2>
          <div className="prose-lg mt-6 space-y-4 text-slate-600">
            {about.historyParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>

        <div className="lg:border-l lg:border-slate-200 lg:pl-8">
          <h2 className="text-2xl font-black text-slate-900">{about.identityTitle}</h2>
          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between gap-4 border-b border-school-line pb-3">
              <dt className="text-slate-500">{about.identityLabels.name}</dt>
              <dd className="font-semibold text-slate-800">{about.schoolDetails.name}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-school-line pb-3">
              <dt className="text-slate-500">{about.identityLabels.npsn}</dt>
              <dd className="font-semibold text-slate-800">{about.schoolDetails.npsn}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-school-line pb-3">
              <dt className="text-slate-500">{about.identityLabels.address}</dt>
              <dd className="text-right font-semibold text-slate-800">{about.schoolDetails.address}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-school-line pb-3">
              <dt className="text-slate-500">{about.identityLabels.phone}</dt>
              <dd className="font-semibold text-slate-800">{about.schoolDetails.phone}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-school-line pb-3">
              <dt className="text-slate-500">{about.identityLabels.email}</dt>
              <dd className="font-semibold text-slate-800">{about.schoolDetails.email}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">{about.visionTitle}</h2>
        <p className="mt-6 max-w-4xl border-l-4 border-school-yellow pl-5 text-lg leading-8 text-slate-700">
          {about.vision}
        </p>

        <ol className="mt-10 grid grid-cols-1 gap-x-10 border-t border-slate-200 lg:grid-cols-2">
          {about.missionItems.map((mission) => (
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
