import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/aacl/site-header";
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
  {
    title: "Kitten Foster Open Day",
    facility: "Epping",
    date: "12 Oct 2026",
    image: "/kitten-foster.jpg",
    position: "object-[25%_center]",
  },
  {
    title: "Free Sterilisation Drive",
    facility: "Bellville",
    date: "26 Oct 2026",
    image: "/sterilisation-drive.jpg",
    position: "object-center",
  },
  {
    title: "Volunteer Induction Morning",
    facility: "Epping",
    date: "09 Nov 2026",
    image: "/volunteer-induction.jpg",
    position: "object-top",
  },
];

function CapeTown() {
  const [active, setActive] = useState<(typeof FACILITIES)[number]>("All CPT");
  const visible =
    active === "All CPT" ? SECONDARY : SECONDARY.filter((e) => e.facility === active);

  return (
    <div className="relative min-h-screen bg-page">
      {/* Extra-large seamless repeating paw watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-repeat opacity-[0.05]"
        style={{
          backgroundImage: "url('/paw-pattern.png')",
          backgroundSize: "1100px 1100px",
        }}
      />

      <div className="relative z-10">
        <SiteHeader />

        <div className="border-b border-hairline bg-page/90 backdrop-blur-sm">
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
          <article className="grid overflow-hidden rounded-lg border border-hairline bg-white shadow-sm md:grid-cols-2">
            <img
              src="/event-walk.jpg"
              alt="Dog walking on a leash at Paws in the Park"
              className="h-full min-h-[280px] w-full object-cover object-center"
            />
            <div className="flex flex-col justify-center gap-4 p-8">
              <h1 className="text-3xl font-bold tracking-tight text-brand-dark md:text-4xl">
                PAWS IN THE PARK 2026
              </h1>
              <p className="text-base text-slate-body font-medium">Jack Muller District Park, Bellville</p>
              
              <div className="space-y-2 text-sm text-slate-body">
                <p>
                  <strong className="text-brand-dark">When:</strong> Saturday, 24th November · 08:00 AM – 12:00 PM
                </p>
                <p>
                  <strong className="text-brand-dark">Activities:</strong> You can run, walk, or just help out at the stands! Get matched with a shelter dog suited to your pace.
                </p>
                <p>
                  <strong className="text-brand-dark">Entry:</strong> Free registration, with an optional donation in lieu of a fee to help fund rescue shelter care.
                </p>
                <p>
                  <strong className="text-brand-dark">What to Bring:</strong> Be sure to bring your own water and sun protection.
                </p>
                <p className="text-xs text-slate-500">
                  <em>* Please do not bring outside dog treats. Shelter-approved treats will be available on sale at the check-in tables.</em>
                </p>
              </div>

              <div className="pt-2">
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
                className="overflow-hidden rounded-lg border border-hairline bg-page shadow-sm"
              >
                <img
                  src={e.image}
                  alt={e.title}
                  className={cn("h-48 w-full object-cover", e.position)}
                />
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
    </div>
  );
}