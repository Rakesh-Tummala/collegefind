"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    if (mode === "signup") {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: String(form.get("name")), email, password })
      });
      if (!response.ok) {
        const body = await response.json();
        setError(body.error ?? "Unable to create account");
        setLoading(false);
        return;
      }
    }

    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <section className="mx-auto grid min-h-[70vh] max-w-md place-items-center">
      <form onSubmit={onSubmit} className="w-full rounded-md border border-border bg-white p-6 shadow-soft">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-white"><GraduationCap className="h-6 w-6" /></span>
          <div>
            <h1 className="text-xl font-semibold">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
            <p className="text-sm text-slate-600">{mode === "login" ? "Login to save colleges." : "Start building your shortlist."}</p>
          </div>
        </div>
        <div className="grid gap-4">
          {mode === "signup" ? <Input id="name" name="name" label="Name" required minLength={2} /> : null}
          <Input id="email" name="email" label="Email" type="email" required />
          <Input id="password" name="password" label="Password" type="password" required minLength={8} />
          {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
          <Button type="submit" disabled={loading}>{loading ? "Please wait..." : mode === "login" ? "Login" : "Signup"}</Button>
        </div>
        <p className="mt-5 text-center text-sm text-slate-600">
          {mode === "login" ? "New here?" : "Already have an account?"}{" "}
          <Link className="font-medium text-primary" href={mode === "login" ? "/signup" : "/login"}>
            {mode === "login" ? "Create account" : "Login"}
          </Link>
        </p>
      </form>
    </section>
  );
}
