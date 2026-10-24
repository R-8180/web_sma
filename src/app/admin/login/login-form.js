"use client";

import { useActionState } from "react";
import { signInAdmin } from "../actions";

const initialState = { error: "" };

export default function LoginForm() {
  const [state, action, pending] = useActionState(signInAdmin, initialState);

  return (
    <form action={action} className="mt-7 space-y-5">
      <label className="block text-sm font-semibold text-slate-700">
        Email admin
        <input name="email" type="email" autoComplete="username" required className="mt-2 min-h-11 w-full rounded-lg border border-slate-300 px-3 font-normal focus-visible:outline-2 focus-visible:outline-school-forest" />
      </label>
      <label className="block text-sm font-semibold text-slate-700">
        Password
        <input name="password" type="password" autoComplete="current-password" required className="mt-2 min-h-11 w-full rounded-lg border border-slate-300 px-3 font-normal focus-visible:outline-2 focus-visible:outline-school-forest" />
      </label>
      {state.error && <p role="alert" className="text-sm text-red-700">{state.error}</p>}
      <button disabled={pending} className="min-h-11 w-full rounded-lg bg-school-forest px-5 font-bold text-white hover:bg-school-ink disabled:opacity-60">
        {pending ? "Memeriksa..." : "Masuk"}
      </button>
    </form>
  );
}
