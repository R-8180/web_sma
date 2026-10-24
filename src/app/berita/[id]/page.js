import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getNewsItems, getSiteContent } from "../../../lib/site-content";

export const instant = false;

export async function generateMetadata({ params }) {
  await connection();
  const { id } = await params;
  const newsItems = await getNewsItems();
  const item = newsItems.find((news) => news.id === id);

  if (!item) {
    return {
      title: "Berita tidak ditemukan",
    };
  }

  return {
    title: `${item.title} | SMA Negeri 9 Semarang`,
    description: item.excerpt,
  };
}

export default async function BeritaDetailPage({ params }) {
  await connection();
  const { id } = await params;
  const [newsItems, { news: pageContent }] = await Promise.all([
    getNewsItems(),
    getSiteContent(),
  ]);
  const item = newsItems.find((news) => news.id === id);

  if (!item) {
    notFound();
  }

  return (
    <main className="section-shell py-12 md:py-16">
      <div className="mb-6">
        <Link href="/berita" className="inline-flex items-center border-b border-school-forest pb-1 text-sm font-semibold text-school-forest">
          ← {pageContent.backLabel}
        </Link>
      </div>

      <article className="mx-auto max-w-4xl">
        <div className="mb-3 text-sm font-semibold text-school-forest">
          {item.category}
        </div>
        <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
          {item.title}
        </h1>
        <time className="mt-4 block text-sm text-slate-600">
          {item.date}
        </time>

        <figure className="mt-8">
          <img
            src={item.image}
            alt={`Ilustrasi berita kategori ${item.category.toLowerCase()}`}
            className="aspect-[16/9] w-full object-cover"
          />
          <figcaption className="mt-2 text-xs text-slate-500">{pageContent.imageCaption}</figcaption>
        </figure>

        <div className="prose-lg mt-8 space-y-5 text-slate-700">
          {item.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
