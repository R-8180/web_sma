import Image from "next/image";
import { connection } from "next/server";
import { getSiteContent } from "../lib/site-content";

export default async function Footer() {
  await connection();
  const { brand, footer } = await getSiteContent();

  return (
    <footer id="kontak" className="site-chrome mt-16 border-t border-slate-200 bg-white text-slate-700">
      <div className="section-shell py-12">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-[1.4fr_0.9fr_1.2fr_0.7fr] lg:gap-10">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src={brand.logo}
                alt={`Logo ${brand.name}`}
                width={52}
                height={68}
                className="h-[68px] w-[52px] shrink-0 object-contain"
              />
              <div>
                <div className="text-base font-bold leading-tight text-slate-900 sm:text-lg">{brand.name}</div>
                <div className="mt-1 text-xs font-medium tracking-[0.12em] text-school-forest">NPSN: {footer.npsn}</div>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-600">
              {footer.description}
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-slate-900">{footer.contactTitle}</h2>
            <ul className="space-y-3 text-sm leading-6 text-slate-600">
              <li>{footer.address}</li>
              <li>{footer.phone}</li>
              <li>{footer.email}</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-slate-900">{footer.locationTitle}</h2>
            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
              <iframe
                title={`Peta lokasi ${brand.name}`}
                src={footer.mapEmbedUrl}
                className="pointer-events-none h-44 w-full border-0"
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={footer.mapLinkUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Buka lokasi ${brand.name} di Google Maps`}
                className="absolute inset-0 z-10 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-forest"
              >
                <span className="absolute left-2 top-2 inline-flex items-center rounded-sm bg-white px-3 py-2 text-sm font-semibold text-blue-700 shadow-md">
                  {footer.mapButtonLabel}
                  <span aria-hidden="true" className="ml-2">↗</span>
                </span>
              </a>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-slate-900">{footer.socialTitle}</h2>
            <ul className="space-y-3 text-sm leading-6 text-slate-600">
              {footer.socialLinks.map((link) => (
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
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
}