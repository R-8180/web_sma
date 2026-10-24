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
  const [section, setSection] = useState("home");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();
  const [initializing, setInitializing] = useState(false);
  const [invalidJsonFields, setInvalidJsonFields] = useState({});
  const hasInvalidJson = Object.values(invalidJsonFields).some(Boolean);

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

  return (
    <main className="min-h-screen bg-[#f7f9f5]">
      <div className="section-shell py-10 md:py-14">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-school-forest">Pengelola konten</p>
            <h1 className="mt-2 text-3xl font-black text-school-ink md:text-4xl">Dashboard admin</h1>
            <p className="mt-2 text-sm text-slate-600">Kelola teks, identitas, gambar, dan berita situs sekolah.</p>
          </div>
          <form action={signOutAdmin}><button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700">Keluar</button></form>
        </header>

        <div className="mb-6 flex flex-wrap gap-3">
          <button onClick={initialize} disabled={pending || initializing} className="rounded-lg border border-school-forest bg-white px-4 py-2 text-sm font-bold text-school-forest disabled:opacity-50">
            {initializing ? "Menyalin..." : "Inisialisasi konten awal"}
          </button>
          <span className="self-center text-xs text-slate-500">Hanya mengisi tabel yang masih kosong; tidak menimpa konten yang sudah ada.</span>
        </div>

        <nav aria-label="Bagian konten" className="mb-5 flex flex-wrap gap-2">
          {Object.entries(sectionLabels).map(([key, label]) => (
            <button key={key} disabled={hasInvalidJson} onClick={() => setSection(key)} aria-pressed={section === key} className={`rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-50 ${section === key ? "bg-school-forest text-white" : "border border-slate-300 bg-white text-slate-700"}`}>{label}</button>
          ))}
          <button disabled={hasInvalidJson} onClick={() => setSection("news-editor")} aria-pressed={section === "news-editor"} className={`rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-50 ${section === "news-editor" ? "bg-school-forest text-white" : "border border-slate-300 bg-white text-slate-700"}`}>Kelola berita</button>
        </nav>

        {section === "news-editor" ? (
          <NewsEditor initialNews={initialNews} />
        ) : (
          <section className="rounded-xl border border-school-line bg-white p-5 sm:p-7">
            <h2 className="mb-5 text-xl font-bold text-school-ink">{sectionLabels[section]}</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <ContentFields
                value={content[section]}
                path={[section]}
                onChange={(path, value) => setContent((current) => updatePath(current, path, value))}
                onValidityChange={(path, valid) => setInvalidJsonFields((current) => ({ ...current, [path]: !valid }))}
              />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-5">
              <button onClick={save} disabled={pending || hasInvalidJson} className="rounded-lg bg-school-forest px-5 py-2.5 font-bold text-white disabled:opacity-50">{pending ? "Menyimpan..." : "Simpan perubahan"}</button>
              {message && <p role="status" className="text-sm text-slate-700">{message}</p>}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
