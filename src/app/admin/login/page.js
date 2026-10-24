import LoginForm from "./login-form";

export const metadata = { title: "Login Admin | SMA Negeri 9 Semarang" };

export default function AdminLoginPage() {
  return (
    <main className="section-shell flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-2xl border border-school-line bg-white p-7 shadow-sm sm:p-9">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-school-forest">Area pengelola</p>
        <h1 className="mt-3 text-3xl font-black text-school-ink">Login admin</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">Masuk untuk mengelola konten SMA Negeri 9 Semarang.</p>
        <LoginForm />
      </div>
    </main>
  );
}
