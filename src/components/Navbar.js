import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { getSiteContent } from "../lib/site-content";

export default async function Navbar() {
  await connection();
  const { brand, navigation } = await getSiteContent();

  return (
    <header className="site-chrome sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2 leading-tight text-school-forest">
          <Image src={brand.logo} alt={`Logo ${brand.name}`} width={48} height={60} className="h-10 w-8 object-contain" />
          <div className="leading-none">
            <span className="block text-[0.72rem] font-black tracking-[0.08em] text-school-forest sm:text-xs">{brand.shortName}</span>
            <span className="block text-[0.6rem] font-bold tracking-[0.14em] text-school-forest sm:text-[0.68rem]">{brand.locationLabel}</span>
          </div>
        </Link>

        <nav aria-label="Navigasi utama" className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-10 items-center whitespace-nowrap px-1 text-[11px] font-medium text-slate-700 transition-colors hover:bg-school-sage hover:text-school-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-forest sm:px-3 sm:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/admin/login"
          className="inline-flex min-h-10 shrink-0 items-center rounded-md bg-school-forest px-2.5 text-[11px] font-bold text-white transition-colors hover:bg-school-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-forest sm:px-3 sm:text-sm"
        >
          Login Admin
        </Link>
      </div>
    </header>
  );
}