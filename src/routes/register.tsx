import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteHeader } from "@/components/aacl/site-header";
import { StepIndicator } from "@/components/aacl/primitives";
import { useFlow } from "@/lib/flow";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — Paws in the Park | AACL Cape Town" },
      {
        name: "description",
        content:
          "Step one of Paws in the Park registration: share your name, email and cellphone with AACL Cape Town.",
      },
      { property: "og:title", content: "Register — Paws in the Park | AACL Cape Town" },
      {
        property: "og:description",
        content: "Step one of registration for the AACL Cape Town Paws in the Park event.",
      },
    ],
  }),
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const flow = useFlow();
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!flow.name.trim() || !flow.email.trim() || !flow.phone.trim()) {
      setError("Please complete all three fields before continuing.");
      return;
    }
    setError("");
    navigate({ to: "/pace" });
  }

  const field =
    "w-full rounded-md border border-hairline bg-white px-4 py-3 text-sm text-slate-body outline-none focus:border-brand";

  return (
    <div className="min-h-screen bg-page">
      <SiteHeader />

      <main className="mx-auto max-w-2xl px-6 py-14">
        <StepIndicator current={1} />
        <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-brand-dark">
          Event Registration
        </h1>
        <p className="mt-3 text-center text-sm text-slate-body">
          Step 1 of 2 — your contact details.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-10 rounded-xl border border-hairline bg-white p-8 shadow-sm"
        >
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-medium text-slate-body">
              Full Name
              <input
                className={field}
                value={flow.name}
                onChange={(e) => flow.update({ name: e.target.value })}
                placeholder="Sarah Jenkins"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-body">
              Email
              <input
                type="email"
                className={field}
                value={flow.email}
                onChange={(e) => flow.update({ email: e.target.value })}
                placeholder="sarah@example.co.za"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-body">
              Cellphone
              <input
                className={field}
                value={flow.phone}
                onChange={(e) => flow.update({ phone: e.target.value })}
                placeholder="082 000 0000"
              />
            </label>
          </div>

          {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-brand px-8 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            >
              Next
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
