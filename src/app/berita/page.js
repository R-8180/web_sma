"use client";

import { useMemo, useState } from "react";
import NewsCard from "../../components/NewsCard";
import { newsItems } from "../../data";

const categories = ["Semua", ...new Set(newsItems.map((item) => item.category))];

export default function BeritaPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredItems = useMemo(() => {
    if (activeCategory === "Semua") return newsItems;
    return newsItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="section-shell py-16 md:py-20">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">Berita sekolah</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Informasi kegiatan, pembelajaran, dan kehidupan sekolah.
        </p>
      </div>

      <div className="mb-10 flex flex-wrap gap-x-6 border-b border-slate-200">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
            className={`border-b-2 px-1 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-forest ${
              activeCategory === category
                ? "border-school-forest text-school-ink"
                : "border-transparent text-slate-600 hover:text-school-forest"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredItems[0] && <NewsCard item={filteredItems[0]} />}

      <div className="mt-12 grid gap-x-10 md:grid-cols-2">
        {filteredItems.slice(1).map((item) => (
          <NewsCard key={item.id} item={item} compact />
        ))}
      </div>
    </main>
  );
}
