import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/about" },
  { label: "Berita", href: "/berita" },
  { label: "Kontak", href: "#kontak" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2 leading-tight text-school-forest">
          <Image src="/SMAN_9_Semarang_logo.jpg" alt="Logo SMA Negeri 9 Semarang" width={48} height={60} className="h-10 w-8 object-contain" />
          <div className="leading-none">
            <span className="block text-[0.72rem] font-black tracking-[0.08em] text-school-forest sm:text-xs">SMA NEGERI 9</span>
            <span className="block text-[0.6rem] font-bold tracking-[0.14em] text-school-forest sm:text-[0.68rem]">SEMARANG</span>
          </div>
        </Link>

        <nav aria-label="Navigasi utama" className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-10 items-center whitespace-nowrap px-1 text-[11px] font-medium text-slate-700 transition-colors hover:bg-school-sage hover:text-school-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-forest sm:px-3 sm:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}