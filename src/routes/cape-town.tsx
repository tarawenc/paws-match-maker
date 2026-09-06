import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/aacl/site-header";
import { PlaceholderImage } from "@/components/aacl/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cape-town")({
  head: () => ({
    meta: [
      { title: "Cape Town Events — AACL" },
      {
        name: "description",
        content:
          "Upcoming AACL Cape Town events including Paws in the Park 2026 at Jack Muller District Park, Bellville.",
      },
      { property: "og:title", content: "Cape Town Events — AACL" },
      {
        property: "og:description",
        content: "Paws in the Park 2026 and more AACL Cape Town shelter and clinic events.",
      },
    ],
  }),
  component: CapeTown,
});

const FACILITIES = ["All CPT", "Bellville", "Epping"] as const;

const SECONDARY = [
  { title: "Kitten Foster Open Day", facility: "Epping", date: "12 Oct 2026" },
  { title: "Free Sterilisation Drive", facility: "Bellville", date: "26 Oct 2026" },
  { title: "Volunteer Induction Morning", facility: "Epping", date: "09 Nov 2026" },
];

function CapeTown() {
  const [active, setActive] = useState<(typeof FACILITIES)[number]>("All CPT");
  const visible =
    active === "All CPT" ? SECONDARY : SECONDARY.filter((e) => e.facility === active);

  return (
    <div className="min-h-screen bg-page">
      <SiteHeader />

      <div className="border-b border-hairline bg-page">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-3 px-6 py-4">
          {FACILITIES.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={cn(
                "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                active === f
                  ? "border-brand-dark bg-brand-dark text-brand-foreground"
                  : "border-hairline bg-white text-slate-body hover:bg-mint",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <article className="grid overflow-hidden rounded-lg border border-hairline bg-white md:grid-cols-2">
          <PlaceholderImage className="min-h-[280px]" label="Event photo" />
          <div className="flex flex-col justify-center gap-4 p-8">
            <h1 className="text-3xl font-bold tracking-tight text-brand-dark md:text-4xl">
              PAWS IN THE PARK 2026
            </h1>
            <p className="text-base text-slate-body">Jack Muller District Park, Bellville</p>
            <p className="text-sm text-slate-body">
              Saturday, 24th November · Walk a shelter dog matched to your pace.
            </p>
            <div>
              <Link
                to="/register"
                className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
              >
                Register
              </Link>
            </div>
          </div>
        </article>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {visible.map((e) => (
            <article
              key={e.title}
              className="overflow-hidden rounded-lg border border-hairline bg-page"
            >
              <PlaceholderImage className="h-36 w-full" />
              <div className="p-5">
                <h2 className="text-base font-semibold text-brand-dark">{e.title}</h2>
                <p className="mt-1 text-sm text-slate-body">{e.facility}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-body">
                  {e.date}
                </p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}