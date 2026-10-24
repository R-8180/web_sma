"use client";

import { useState, useTransition } from "react";
import { deleteNewsItem, initializeContent, saveNewsItem, saveSiteContent, signOutAdmin, uploadImage } from "./actions";

const sectionLabels = {
  brand: "Identitas situs",
  navigation: "Navigasi",
  home: "Beranda",
  about: "Profil sekolah",
  news: "Halaman berita",
  footer: "Footer dan kontak",
};

const sidebarGroups = [
  {
    label: "MENU UTAMA",
    items: [
      { key: "overview", label: "Ringkasan", icon: "overview" },
      { key: "news-editor", label: "Berita & artikel", icon: "news" },
    ],
  },
  {
    label: "KONTEN WEBSITE",
    items: [
      { key: "home", label: "Beranda", icon: "home" },
      { key: "about", label: "Profil sekolah", icon: "about" },
      { key: "brand", label: "Identitas situs", icon: "brand" },
      { key: "navigation", label: "Navigasi website", icon: "navigation" },
      { key: "news", label: "Halaman berita", icon: "page" },
      { key: "footer", label: "Kontak & footer", icon: "contact" },
    ],
  },
];

const sidebarIcons = {
  overview: ["M3 3h8v8H3z", "M14 3h7v5h-7z", "M14 11h7v10h-7z", "M3 14h8v7H3z"],
  news: ["M5 4h14v16H5z", "M8 8h8", "M8 12h8", "M8 16h5"],
  home: ["m3 10 9-7 9 7", "M5 9v11h14V9", "M9 20v-7h6v7"],
  about: ["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M4 21a8 8 0 0 1 16 0"],
  brand: ["M4 7h16v13H4z", "M8 7V4h8v3", "M8 12h8"],
  navigation: ["M4 6h16", "M4 12h16", "M4 18h16", "M8 6h.01", "M8 12h.01", "M8 18h.01"],
  page: ["M6 3h9l4 4v14H6z", "M14 3v5h5", "M9 12h7", "M9 16h7"],
  contact: ["M4 5h16v14H4z", "m4 7 8 6 8-6"],
  external: ["M14 4h6v6", "m20 4-9 9", "M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"],
  menu: ["M4 6h16", "M4 12h16", "M4 18h16"],
  close: ["m6 6 12 12", "M18 6 6 18"],
  logout: ["M10 17l5-5-5-5", "M15 12H3", "M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"],
  plus: ["M12 5v14", "M5 12h14"],
  arrow: ["M5 12h14", "m13 6 6 6-6 6"],
  check: ["m5 12 4 4L19 6"],
};

function AdminIcon({ name, className = "h-5 w-5" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {(sidebarIcons[name] ?? []).map((path, index) => <path key={`${name}-${index}`} d={path} />)}
    </svg>
  );
}

function updatePath(value, path, nextValue) {
  if (!path.length) return nextValue;
  const [key, ...rest] = path;
  const copy = Array.isArray(value) ? [...value] : { ...value };
  copy[key] = updatePath(value[key], rest, nextValue);
  return copy;
}

function ContentFields({ value, path, onChange, onValidityChange }) {
  return Object.entries(value).map(([key, child]) => {
    const fieldPath = [...path, key];
    const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
    if (typeof child === "string") {
      const isLong = child.length > 100;
      const control = isLong
        ? <textarea rows={Math.min(10, Math.max(3, Math.ceil(child.length / 100)))} value={child} onChange={(event) => onChange(fieldPath, event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal leading-6 focus-visible:outline-2 focus-visible:outline-school-forest" />
        : <input value={child} onChange={(event) => onChange(fieldPath, event.target.value)} className="mt-1 min-h-10 w-full rounded-lg border border-slate-300 px-3 text-sm font-normal focus-visible:outline-2 focus-visible:outline-school-forest" />;
      return (
        <label key={fieldPath.join(".")} className="block text-sm font-semibold text-slate-700">
          {label}
          {control}
          {/(image|logo)$/i.test(key) && <ImageUpload onUploaded={(url) => onChange(fieldPath, url)} />}
        </label>
      );
    }
    if (Array.isArray(child) && child.every((item) => typeof item === "string")) {
      return (
        <label key={fieldPath.join(".")} className="block text-sm font-semibold text-slate-700">
          {label} <span className="font-normal text-slate-500">(satu item per baris)</span>
          <textarea value={child.join("\n")} onChange={(event) => onChange(fieldPath, event.target.value.split("\n"))} rows={Math.min(14, Math.max(3, child.length))} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal leading-6 focus-visible:outline-2 focus-visible:outline-school-forest" />
        </label>
      );
    }
    if (Array.isArray(child) || (child && typeof child === "object")) {
      return (
        <JsonField
          key={fieldPath.join(".")}
          label={label}
          value={child}
          onChange={(nextValue) => onChange(fieldPath, nextValue)}
          onValidityChange={(isValid) => onValidityChange(fieldPath.join("."), isValid)}
        />
      );
    }
    return null;
  });
}

function JsonField({ label, value, onChange, onValidityChange }) {
  const [text, setText] = useState(JSON.stringify(value, null, 2));
  const [error, setError] = useState("");

  function updateText(nextText) {
    setText(nextText);
    try {
      onChange(JSON.parse(nextText));
      setError("");
      onValidityChange(true);
    } catch {
      setError("JSON belum valid; perbaiki format sebelum menyimpan.");
      onValidityChange(false);
    }
  }

  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label} <span className="font-normal text-slate-500">(format JSON)</span>
      <textarea value={text} onChange={(event) => updateText(event.target.value)} rows={Math.min(18, Math.max(4, text.split("\n").length))} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs leading-5 focus-visible:outline-2 focus-visible:outline-school-forest" />
      {error && <span role="alert" className="mt-1 block text-xs text-red-700">{error}</span>}
    </label>
  );
}

function ImageUpload({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  function handleUpload() {
    if (!file) {
      setMessage("Pilih gambar untuk diunggah.");
      return;
    }
    const formData = new FormData();
    formData.set("file", file);
    startTransition(async () => {
      const result = await uploadImage(formData);
      if (result.error) setMessage(result.error);
      else {
        onUploaded(result.url);
        setMessage("Gambar berhasil diunggah.");
      }
    });
  }

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => setFile(event.target.files?.[0] ?? null)} className="max-w-full text-xs font-normal" />
      <button type="button" onClick={handleUpload} disabled={pending} className="rounded-md border border-school-forest px-3 py-1.5 text-xs font-bold text-school-forest disabled:opacity-50">
        {pending ? "Mengunggah..." : "Unggah gambar"}
      </button>
      {message && <span role="status" className="text-xs font-normal text-slate-600">{message}</span>}
    </div>
  );
}

const emptyNews = { id: "", category: "", title: "", date: "", excerpt: "", image: "", content: [""], published: true };

function NewsEditor({ initialNews }) {
  const [news, setNews] = useState(initialNews);
  const [form, setForm] = useState(emptyNews);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  function submit(event) {
    event.preventDefault();
    startTransition(async () => {
      const result = await saveNewsItem(form);
      setMessage(result.error ?? result.success);
      if (result.success) {
        setNews((current) => [form, ...current.filter((item) => item.id !== form.id)]);
        setForm(emptyNews);
        setEditing(false);
      }
    });
  }

  function remove(id) {
    if (!window.confirm(`Hapus berita "${id}"?`)) return;
    startTransition(async () => {
      const result = await deleteNewsItem(id);
      setMessage(result.error ?? result.success);
      if (result.success) setNews((current) => current.filter((item) => item.id !== id));
    });
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
      <section className="rounded-xl border border-school-line bg-white p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-school-ink">Daftar berita ({news.length})</h2>
          <button onClick={() => { setForm({ ...emptyNews }); setEditing(true); }} className="rounded-lg bg-school-forest px-3 py-2 text-sm font-bold text-white">Berita baru</button>
        </div>
        <ul className="mt-4 divide-y divide-slate-200">
          {news.map((item) => (
            <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <p className="font-semibold text-slate-800">{item.title}</p>
                <p className="mt-1 text-xs text-slate-500">{item.category} · {item.id} · {item.published === false ? "Draf" : "Terbit"}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setForm({ ...item, content: [...item.content] }); setEditing(true); }} className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold">Edit</button>
                <button onClick={() => remove(item.id)} className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700">Hapus</button>
              </div>
            </li>
          ))}
        </ul>
        {!news.length && <p className="mt-4 text-sm text-slate-600">Belum ada berita. Gunakan tombol inisialisasi untuk menyalin konten awal.</p>}
      </section>

      {editing && (
        <form onSubmit={submit} className="space-y-4 rounded-xl border border-school-line bg-white p-5">
          <h2 className="text-xl font-bold text-school-ink">{form.id ? "Edit berita" : "Buat berita"}</h2>
          {[
            ["id", "Slug (huruf kecil dan tanda hubung)"],
            ["category", "Kategori"],
            ["title", "Judul"],
            ["date", "Tanggal tampilan"],
            ["excerpt", "Ringkasan"],
            ["image", "URL gambar"],
          ].map(([name, label]) => (
            <label key={name} className="block text-sm font-semibold text-slate-700">
              {label}
              <input required value={form[name]} onChange={(event) => setForm({ ...form, [name]: event.target.value })} className="mt-1 min-h-10 w-full rounded-lg border border-slate-300 px-3 font-normal focus-visible:outline-2 focus-visible:outline-school-forest" />
              {name === "image" && <ImageUpload onUploaded={(url) => setForm({ ...form, image: url })} />}
            </label>
          ))}
          <label className="block text-sm font-semibold text-slate-700">
            Isi berita <span className="font-normal text-slate-500">(satu paragraf per baris)</span>
            <textarea required value={form.content.join("\n")} onChange={(event) => setForm({ ...form, content: event.target.value.split("\n") })} rows={8} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal leading-6 focus-visible:outline-2 focus-visible:outline-school-forest" />
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input type="checkbox" checked={form.published !== false} onChange={(event) => setForm({ ...form, published: event.target.checked })} />
            Terbitkan berita
          </label>
          <div className="flex gap-3">
            <button disabled={pending} className="rounded-lg bg-school-forest px-4 py-2 font-bold text-white disabled:opacity-50">{pending ? "Menyimpan..." : "Simpan berita"}</button>
            <button type="button" onClick={() => setEditing(false)} className="rounded-lg border border-slate-300 px-4 py-2 font-semibold">Batal</button>
          </div>
        </form>
      )}
      {message && <p role="status" className="text-sm text-slate-700 xl:col-span-2">{message}</p>}
    </div>
  );
}

export default function AdminDashboard({ initialContent, initialNews }) {
  const [content, setContent] = useState(initialContent);
  const [section, setSection] = useState("overview");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();
  const [initializing, setInitializing] = useState(false);
  const [invalidJsonFields, setInvalidJsonFields] = useState({});
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const hasInvalidJson = Object.values(invalidJsonFields).some(Boolean);
  const publishedCount = initialNews.filter((item) => item.published !== false).length;
  const draftCount = initialNews.length - publishedCount;
  const currentTitle = section === "overview"
    ? "Ringkasan"
    : section === "news-editor"
      ? "Berita & artikel"
      : sectionLabels[section];

  function save() {
    startTransition(async () => {
      const result = await saveSiteContent(content);
      setMessage(result.error ?? result.success);
    });
  }

  function initialize() {
    setInitializing(true);
    startTransition(async () => {
      const result = await initializeContent();
      setMessage(result.error ?? result.success);
      setInitializing(false);
      if (result.success) window.location.reload();
    });
  }

  function selectSection(key) {
    setSection(key);
    setMessage("");
    setMobileNavOpen(false);
  }

  return (
    <main className="admin-dashboard-shell min-h-screen bg-[#f5f7f5] text-slate-800 lg:flex">
      {mobileNavOpen && (
        <button
          type="button"
          aria-label="Tutup menu"
          onClick={() => setMobileNavOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/45 lg:hidden"
        />
      )}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col bg-[#17352b] text-white shadow-2xl transition-transform duration-200 lg:static lg:z-auto lg:shrink-0 lg:translate-x-0 lg:shadow-none ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-6">
          <button type="button" onClick={() => selectSection("overview")} className="flex items-center gap-3 text-left">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-sm font-black tracking-wide">S9</span>
            <span>
              <span className="block text-sm font-extrabold tracking-wide">SMAN 9</span>
              <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.17em] text-emerald-100/65">Content manager</span>
            </span>
          </button>
          <button type="button" aria-label="Tutup menu" onClick={() => setMobileNavOpen(false)} className="rounded-lg p-2 text-white/70 hover:bg-white/10 lg:hidden">
            <AdminIcon name="close" />
          </button>
        </div>

        <nav aria-label="Navigasi dashboard" className="flex-1 space-y-7 overflow-y-auto px-4 py-7">
          {sidebarGroups.map((group) => (
            <div key={group.label}>
              <p className="px-3 text-[10px] font-bold tracking-[0.17em] text-emerald-100/45">{group.label}</p>
              <div className="mt-3 space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    disabled={hasInvalidJson}
                    onClick={() => selectSection(item.key)}
                    aria-current={section === item.key ? "page" : undefined}
                    className={`flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-[13px] font-medium transition-colors disabled:opacity-50 ${section === item.key ? "bg-[#d9eddf] font-bold text-[#17352b] shadow-sm" : "text-white/75 hover:bg-white/8 hover:text-white"}`}
                  >
                    <AdminIcon name={item.icon} className="h-[18px] w-[18px] shrink-0" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <a href="/" target="_blank" rel="noreferrer" className="mb-3 flex min-h-10 items-center gap-3 rounded-lg px-3 text-xs font-semibold text-white/70 hover:bg-white/8 hover:text-white">
            <AdminIcon name="external" className="h-4 w-4" />
            Lihat website
          </a>
          <div className="flex items-center gap-3 rounded-xl bg-white/[0.07] p-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d9eddf] text-xs font-black text-[#17352b]">AD</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold">Administrator</p>
              <p className="mt-0.5 text-[10px] text-white/55">Pengelola website</p>
            </div>
            <form action={signOutAdmin}>
              <button type="submit" aria-label="Keluar dari dashboard" title="Keluar" className="rounded-lg p-2 text-white/65 transition-colors hover:bg-white/10 hover:text-white">
                <AdminIcon name="logout" className="h-[18px] w-[18px]" />
              </button>
            </form>
          </div>
        </div>
      </aside>

      <div className="min-h-screen min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur sm:px-7 lg:px-10">
          <div className="flex min-w-0 items-center gap-3">
            <button type="button" aria-label="Buka menu" onClick={() => setMobileNavOpen(true)} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 lg:hidden">
              <AdminIcon name="menu" />
            </button>
            <div className="min-w-0">
              <p className="hidden text-[11px] font-semibold text-slate-400 sm:block">Panel pengelolaan <span className="mx-1.5">/</span> Konten website</p>
              <h1 className="truncate text-lg font-extrabold tracking-tight text-slate-800 sm:mt-0.5 sm:text-xl">{currentTitle}</h1>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <span className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-800 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Mode pengelola
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-extrabold text-school-forest">AD</span>
          </div>
        </header>

        <div className="mx-auto max-w-[1440px] p-4 sm:p-7 lg:p-10">
          {section === "overview" ? (
            <div className="space-y-7">
              <section className="flex flex-col justify-between gap-5 rounded-2xl bg-gradient-to-br from-[#17352b] via-[#204638] to-[#2c6147] p-6 text-white shadow-sm sm:flex-row sm:items-center sm:p-8">
                <div className="max-w-xl">
                  <p className="text-xs font-bold uppercase tracking-[0.17em] text-emerald-100/70">Ruang kerja website</p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">Selamat datang di dashboard.</h2>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-white/70">Kelola isi website SMA Negeri 9 Semarang dari satu tempat—mulai dari halaman utama sampai berita sekolah.</p>
                </div>
                <button type="button" onClick={initialize} disabled={pending || initializing} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-bold text-[#17352b] transition hover:bg-emerald-50 disabled:opacity-60">
                  <AdminIcon name={initializing ? "check" : "plus"} className="h-4 w-4" />
                  {initializing ? "Memproses..." : "Siapkan konten awal"}
                </button>
              </section>

              {message && (
                <p role="status" className={`rounded-xl border px-4 py-3 text-sm ${message.includes("gagal") || message.includes("Gagal") ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>
                  {message}
                </p>
              )}

              <section aria-label="Ringkasan konten" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: "Bagian konten", value: Object.keys(sectionLabels).length, detail: "Area website yang dapat diedit", icon: "page" },
                  { label: "Total berita", value: initialNews.length, detail: "Artikel di database", icon: "news" },
                  { label: "Berita terbit", value: publishedCount, detail: "Ditampilkan ke pengunjung", icon: "check" },
                  { label: "Berita draf", value: draftCount, detail: "Belum ditampilkan ke publik", icon: "brand" },
                ].map((card) => (
                  <article key={card.label} className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.025)]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">{card.label}</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800"><AdminIcon name={card.icon} className="h-[18px] w-[18px]" /></span>
                    </div>
                    <p className="mt-4 text-3xl font-black tracking-tight text-slate-800">{card.value}</p>
                    <p className="mt-1 text-[11px] text-slate-400">{card.detail}</p>
                  </article>
                ))}
              </section>

              <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
                <section className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.025)]">
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                    <div>
                      <h2 className="text-sm font-extrabold text-slate-800">Berita terbaru</h2>
                      <p className="mt-1 text-xs text-slate-400">Artikel yang tersimpan di database</p>
                    </div>
                    <button type="button" onClick={() => selectSection("news-editor")} className="inline-flex items-center gap-1.5 text-xs font-bold text-school-forest hover:text-school-ink">
                      Kelola berita <AdminIcon name="arrow" className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  {initialNews.length ? (
                    <ul className="divide-y divide-slate-100">
                      {initialNews.slice(0, 4).map((item) => (
                        <li key={item.id} className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-slate-700">{item.title}</p>
                            <p className="mt-1 text-xs text-slate-400">{item.category} <span className="mx-1">·</span> {item.date}</p>
                          </div>
                          <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${item.published === false ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
                            {item.published === false ? "Draf" : "Terbit"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-6 py-10 text-center">
                      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 text-slate-400"><AdminIcon name="news" /></span>
                      <p className="mt-3 text-sm font-bold text-slate-700">Belum ada konten di database</p>
                      <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">Siapkan konten awal untuk menyalin data situs dan berita bawaan. Konten yang sudah tersimpan tidak akan ditimpa.</p>
                      <button type="button" onClick={initialize} disabled={pending || initializing} className="mt-4 rounded-lg bg-school-forest px-4 py-2 text-xs font-bold text-white hover:bg-school-ink disabled:opacity-50">
                        {initializing ? "Memproses..." : "Inisialisasi konten"}
                      </button>
                    </div>
                  )}
                </section>

                <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.025)] sm:p-6">
                  <h2 className="text-sm font-extrabold text-slate-800">Akses cepat</h2>
                  <p className="mt-1 text-xs text-slate-400">Pilih bagian website untuk mulai mengelola.</p>
                  <div className="mt-4 space-y-2">
                    {[
                      ["home", "Edit konten beranda", "home"],
                      ["about", "Edit profil sekolah", "about"],
                      ["news-editor", "Tambah atau edit berita", "news"],
                      ["footer", "Perbarui kontak sekolah", "contact"],
                    ].map(([key, label, icon]) => (
                      <button key={key} type="button" onClick={() => selectSection(key)} className="group flex min-h-12 w-full items-center gap-3 rounded-lg border border-slate-100 px-3 text-left transition hover:border-emerald-100 hover:bg-emerald-50/50">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-800"><AdminIcon name={icon} className="h-4 w-4" /></span>
                        <span className="flex-1 text-xs font-bold text-slate-700">{label}</span>
                        <AdminIcon name="arrow" className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-school-forest" />
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 rounded-lg bg-[#f7f9f5] p-3.5">
                    <p className="text-[11px] font-bold text-slate-700">Catatan pengelolaan</p>
                    <p className="mt-1 text-[11px] leading-5 text-slate-500">Inisialisasi hanya mengisi tabel yang kosong. Perubahan konten tersimpan setelah tombol simpan ditekan.</p>
                  </div>
                </section>
              </div>
            </div>
          ) : section === "news-editor" ? (
            <div className="space-y-5">
              <div>
                <p className="text-sm text-slate-500">Kelola artikel dan publikasi berita website sekolah.</p>
              </div>
              <NewsEditor initialNews={initialNews} />
            </div>
          ) : (
            <div className="max-w-5xl space-y-5">
              <div>
                <p className="text-sm text-slate-500">Perbarui informasi yang ditampilkan pada bagian {sectionLabels[section].toLowerCase()}.</p>
              </div>
              <section className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.025)]">
                <div className="border-b border-slate-100 px-5 py-4 sm:px-7">
                  <h2 className="text-sm font-extrabold text-slate-800">Konten {sectionLabels[section]}</h2>
                  <p className="mt-1 text-xs text-slate-400">Pastikan informasi sudah benar sebelum menyimpan perubahan.</p>
                </div>
                <div className="grid gap-x-7 gap-y-5 p-5 sm:grid-cols-2 sm:p-7">
                  <ContentFields
                    value={content[section]}
                    path={[section]}
                    onChange={(path, value) => setContent((current) => updatePath(current, path, value))}
                    onValidityChange={(path, valid) => setInvalidJsonFields((current) => ({ ...current, [path]: !valid }))}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-7">
                  <button onClick={save} disabled={pending || hasInvalidJson} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-school-forest px-4 text-sm font-bold text-white shadow-sm transition hover:bg-school-ink disabled:cursor-not-allowed disabled:opacity-50">
                    <AdminIcon name="check" className="h-4 w-4" />
                    {pending ? "Menyimpan..." : "Simpan perubahan"}
                  </button>
                  <p className={`text-xs ${message.includes("gagal") || message.includes("Gagal") ? "text-red-700" : "text-slate-500"}`} role="status">{message || "Perubahan akan langsung diterapkan pada website setelah disimpan."}</p>
                </div>
              </section>
            </div>
          )}
        </div>
        <footer className="border-t border-slate-200/80 px-4 py-4 text-center text-[11px] text-slate-400 sm:px-7 lg:px-10">
          © 2026 SMA Negeri 9 Semarang <span className="mx-1.5">·</span> Panel pengelolaan konten
        </footer>
      </div>
    </main>
  );
}
