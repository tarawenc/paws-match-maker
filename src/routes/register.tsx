import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteHeader } from "@/components/aacl/site-header";
import { useFlow, type Pace } from "@/lib/flow";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register & Set Your Pace — Paws in the Park" },
      {
        name: "description",
        content:
          "Tell AACL Cape Town your walking pace and contact details so we can match you with the right shelter dog.",
      },
      { property: "og:title", content: "Register & Set Your Pace — Paws in the Park" },
      {
        property: "og:description",
        content: "Share your pace preference and details to start matching with a shelter dog.",
      },
    ],
  }),
  component: Register,
});

const PACES: { value: Pace; blurb: string }[] = [
  { value: "Casual Walker", blurb: "A relaxed 2km stroll with plenty of sniff breaks." },
  { value: "Avid Jogger", blurb: "A steady 5km run with a high-energy buddy." },
];

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
    navigate({ to: "/match" });
  }

  const field =
    "w-full rounded-md border border-hairline bg-white px-4 py-3 text-sm text-slate-body outline-none focus:border-brand";

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="grid md:grid-cols-2">
        <section className="bg-page px-8 py-12 md:px-12">
          <h1 className="text-3xl font-bold tracking-tight text-brand-dark">
            Tell us about yourself
          </h1>
          <p className="mt-3 max-w-md text-sm text-slate-body">
            Your pace helps our behaviour team pair you with a dog that will enjoy the day as much
            as you will.
          </p>

          <div className="mt-8 rounded-lg border border-hairline bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-body">
              Pace preference
            </h2>
            <div className="mt-4 grid gap-3">
              {PACES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => flow.update({ pace: p.value })}
                  className={cn(
                    "rounded-md border p-4 text-left transition-colors",
                    flow.pace === p.value
                      ? "border-brand-dark bg-brand-dark text-brand-foreground"
                      : "border-hairline bg-white text-slate-body hover:bg-mint",
                  )}
                >
                  <span className="block text-base font-semibold">{p.value}</span>
                  <span className="mt-1 block text-xs opacity-90">{p.blurb}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-8 py-12 md:px-12">
          <form onSubmit={onSubmit} className="mx-auto max-w-md">
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
                Email Address
                <input
                  type="email"
                  className={field}
                  value={flow.email}
                  onChange={(e) => flow.update({ email: e.target.value })}
                  placeholder="sarah@example.co.za"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-body">
                Cell Number
                <input
                  className={field}
                  value={flow.phone}
                  onChange={(e) => flow.update({ phone: e.target.value })}
                  placeholder="082 000 0000"
                />
              </label>
            </div>

            {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="rounded-md bg-brand px-8 py-3.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
              >
                Save &amp; Start Swiping
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}