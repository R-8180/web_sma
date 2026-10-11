import Link from "next/link";

export default function NewsCard({ item, compact = false }) {
  if (compact) {
    return (
      <article className="grid grid-cols-[6rem_1fr] gap-4 border-b border-school-line py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
        <Link href={`/berita/${item.id}`} className="block self-start">
          <img src={item.image} alt={`Foto ilustrasi: ${item.title}`} className="aspect-square w-full object-cover" />
        </Link>
        <div>
          <p className="text-xs font-bold text-school-forest">{item.category} / {item.date}</p>
          <h3 className="mt-2 text-lg font-bold leading-snug text-school-ink">
            <Link href={`/berita/${item.id}`} className="transition-colors hover:text-school-forest">
              {item.title}
            </Link>
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-700">{item.excerpt}</p>
          <Link href={`/berita/${item.id}`} className="mt-3 inline-flex border-b border-school-forest pb-1 text-sm font-semibold text-school-forest">
            Baca selengkapnya
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="grid gap-5 sm:grid-cols-[1.1fr_0.9fr] sm:items-center sm:gap-7">
      <Link href={`/berita/${item.id}`} className="group block">
        <img src={item.image} alt={`Foto ilustrasi: ${item.title}`} className="aspect-[16/10] w-full object-cover" />
      </Link>
      <div>
        <p className="text-xs font-bold text-school-forest">{item.category} / {item.date}</p>
        <h3 className="mt-3 text-xl font-bold leading-snug text-school-ink md:text-2xl">
          <Link href={`/berita/${item.id}`} className="transition-colors hover:text-school-forest">
            {item.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-700">{item.excerpt}</p>
        <Link href={`/berita/${item.id}`} className="mt-5 inline-flex border-b border-school-forest pb-1 text-sm font-bold text-school-forest">
          Baca selengkapnya
        </Link>
      </div>
    </article>
  );
}