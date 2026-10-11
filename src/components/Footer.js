const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/channel/UCb9MVgaSq7JJ0binRRfXZ5A" },
  { label: "Instagram", href: "https://www.instagram.com/sman9semarang/" },
  { label: "Twitter", href: "https://twitter.com/sman9semarang" },
];

export default function Footer() {
  return (
    <footer id="kontak" className="mt-16 border-t border-slate-200 bg-white text-slate-700">
      <div className="section-shell py-12">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-[1.4fr_0.9fr_1.2fr_0.7fr] lg:gap-10">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img
                src="/SMAN_9_Semarang_logo.jpg"
                alt="Logo SMA Negeri 9 Semarang"
                className="h-[68px] w-[52px] shrink-0 object-contain"
              />
              <div>
                <div className="text-base font-bold leading-tight text-slate-900 sm:text-lg">SMA Negeri 9 Semarang</div>
                <div className="mt-1 text-xs font-medium tracking-[0.12em] text-school-forest">NPSN: 20328939</div>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-600">
              Sekolah menengah negeri di Kelurahan Padangsari, Kecamatan Banyumanik, Kota Semarang.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-slate-900">Kontak</h2>
            <ul className="space-y-3 text-sm leading-6 text-slate-600">
              <li>Jl. Cemara Raya, Banyumanik, Semarang</li>
              <li>(024) 7472812</li>
              <li>smu092001@yahoo.com</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-slate-900">Lokasi</h2>
            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
              <iframe
                title="Peta lokasi SMA Negeri 9 Semarang"
                src="https://www.google.com/maps?ll=-7.071196,110.423282&z=13&t=m&hl=id&gl=ID&mapclient=embed&cid=7301604671334218619&output=embed"
                className="pointer-events-none h-44 w-full border-0"
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://www.google.com/maps?ll=-7.071196,110.423282&z=13&t=m&hl=id&gl=ID&mapclient=embed&cid=7301604671334218619"
                target="_blank"
                rel="noreferrer"
                aria-label="Buka lokasi SMA Negeri 9 Semarang di Google Maps"
                className="absolute inset-0 z-10 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-forest"
              >
                <span className="absolute left-2 top-2 inline-flex items-center rounded-sm bg-white px-3 py-2 text-sm font-semibold text-blue-700 shadow-md">
                  Buka di Maps
                  <span aria-hidden="true" className="ml-2">↗</span>
                </span>
              </a>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-slate-900">Sosial media</h2>
            <ul className="space-y-3 text-sm leading-6 text-slate-600">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-school-forest">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
          © 2026 SMA Negeri 9 Semarang. Semua hak dilindungi.
        </div>
      </div>
    </footer>
  );
}