import Link from "next/link";
import Image from "next/image";
import { connection } from "next/server";
import NewsCard from "../components/NewsCard";
import { getNewsItems, getSiteContent } from "../lib/site-content";

export const instant = false;

export default async function HomePage() {
  await connection();
  const [content, featuredNews] = await Promise.all([getSiteContent(), getNewsItems()]);
  const home = content.home;

  return (
    <main>
      <section className="relative isolate flex min-h-[540px] items-end overflow-hidden bg-school-forest md:min-h-[620px]">
        <Image
          src={home.heroImage}
          alt={home.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,45,29,0.62)_0%,rgba(24,45,29,0.3)_48%,rgba(24,45,29,0.02)_100%)]" />

        <div className="section-shell relative z-10 w-full pb-12 pt-16 md:pb-16">
          <div className="max-w-2xl text-white">
            <p className="mb-4 text-sm font-semibold text-white/90">{home.heroEyebrow}</p>
            <h1 className="max-w-[12ch] text-4xl font-bold leading-[1.08] sm:text-5xl md:text-6xl">
              {home.heroTitle}
            </h1>
            <p className="mt-5 max-w-[38ch] text-base leading-7 text-white/90 md:text-lg">
              {home.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex min-h-12 items-center bg-white px-5 text-sm font-bold text-school-ink transition-colors hover:bg-school-sage focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-px"
              >
                {home.profileLinkLabel} <span aria-hidden="true" className="ml-3">&rarr;</span>
              </Link>
              <Link
                href="/berita"
                className="inline-flex min-h-12 items-center border border-white/80 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-px"
              >
                {home.newsLinkLabel}
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
                  src={home.welcomeImage}
                  alt={home.welcomeImageAlt}
                  width={640}
                  height={840}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="px-4 py-4 md:px-5 md:py-5 lg:px-7 lg:py-6">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-school-forest md:text-[11px]">
                  {home.welcomeLabel}
                </p>
                <h2 className="text-lg font-bold leading-snug text-school-ink md:text-xl">
                  {home.welcomeTitle}
                </h2>

                <div className="mt-3 space-y-2 text-[12.5px] leading-6 text-school-ink/80 md:text-sm md:leading-7">
                  {home.welcomeParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>

                <div className="mt-4 border-t border-[#d2d8ce] pt-3 text-[12.5px] text-school-ink/80 md:text-sm">
                  <p>{home.welcomeClosing}</p>
                  <p className="mt-3 font-bold text-school-ink">{home.welcomeSignoff}</p>
                  <p className="mt-1 font-semibold text-school-ink">{home.principalTitle}</p>
                  <p className="mt-2 font-semibold text-school-ink">{home.principalName}</p>
                  <p>{home.principalNip}</p>
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
                {home.profileEyebrow}
              </p>
              <h2 className="max-w-[12ch] text-2xl font-black leading-tight text-school-ink md:text-[2rem]">
                {home.profileTitle}
              </h2>
              <p className="mt-3 max-w-[38ch] text-sm leading-6 text-school-ink/75">
                {home.profileDescription}
              </p>
            </div>

            <div className="border-l-4 border-school-yellow bg-[#f8faf6] pl-4 py-2 md:pl-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-school-forest">{home.visionLabel}</p>
              <p className="mt-2 text-sm leading-6 text-school-ink/80 md:text-[14px] md:leading-7">
                {home.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="kabar" className="bg-[#f7f9f5] py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-bold text-school-forest">{home.newsEyebrow}</p>
              <h2 className="text-3xl font-bold text-school-ink md:text-4xl">{home.newsTitle}</h2>
            </div>
            <Link href="/berita" className="border-b border-school-forest pb-1 text-sm font-bold text-school-forest hover:text-school-ink">
              {home.allNewsLabel} <span aria-hidden="true">&rarr;</span>
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
