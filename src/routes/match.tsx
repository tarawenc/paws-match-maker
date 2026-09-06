import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, X } from "lucide-react";
import { SiteHeader } from "@/components/aacl/site-header";
import { PlaceholderImage, StepIndicator, TraitChip } from "@/components/aacl/primitives";
import { DOGS, useFlow } from "@/lib/flow";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/match")({
  head: () => ({
    meta: [
      { title: "Find Your Buddy — Paws in the Park | AACL" },
      {
        name: "description",
        content:
          "Swipe through AACL Cape Town shelter dogs, shortlist your favourites and submit your matches for review.",
      },
      { property: "og:title", content: "Find Your Buddy — Paws in the Park | AACL" },
      {
        property: "og:description",
        content: "Shortlist shelter dogs and submit your matches for the behaviour team to review.",
      },
    ],
  }),
  component: Match,
});

function Match() {
  const navigate = useNavigate();
  const flow = useFlow();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<"left" | "right" | null>(null);

  const dog = DOGS[index];
  const done = index >= DOGS.length;

  function advance(direction: "left" | "right") {
    if (leaving) return;
    if (direction === "right" && dog) flow.shortlistDog(dog);
    setLeaving(direction);
    setTimeout(() => {
      setIndex((i) => i + 1);
      setLeaving(null);
    }, 280);
  }

  return (
    <div className="min-h-screen bg-page">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 py-12">
        <StepIndicator current={3} />

        {!done && dog ? (
          <>
            <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-brand-dark">
              Find your buddy
            </h1>
            <p className="mt-2 text-center text-sm text-slate-body">
              Pass on a pup or tap the heart to shortlist. Dog {index + 1} of {DOGS.length}.
            </p>

            <div className="mt-10 flex items-center justify-center gap-8">
              <button
                type="button"
                onClick={() => advance("left")}
                aria-label="Pass"
                className="grid h-14 w-14 place-items-center rounded-full border border-hairline bg-white text-danger transition-colors hover:bg-white/70"
              >
                <X className="h-6 w-6" />
              </button>

              <article
                className={cn(
                  "w-[320px] overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300",
                  leaving === "left" && "-translate-x-24 -rotate-6 opacity-0",
                  leaving === "right" && "translate-x-24 rotate-6 opacity-0",
                )}
              >
                <PlaceholderImage className="h-64 w-full" label={`${dog.name} photo`} />
                <div className="p-5">
                  <h2 className="text-lg font-bold text-brand-dark">
                    {dog.name}, {dog.age}
                  </h2>
                  <p className="mt-1 text-sm text-slate-body">{dog.breed}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {dog.traits.map((t) => (
                      <TraitChip key={t}>{t}</TraitChip>
                    ))}
                  </div>
                </div>
              </article>

              <button
                type="button"
                onClick={() => advance("right")}
                aria-label="Shortlist"
                className="grid h-14 w-14 place-items-center rounded-full border border-hairline bg-white text-brand transition-colors hover:bg-mint"
              >
                <Heart className="h-6 w-6" />
              </button>
            </div>
          </>
        ) : (
          <section className="mx-auto mt-8 max-w-lg rounded-xl border border-hairline bg-white p-8 shadow-sm">
            <h1 className="text-center text-2xl font-bold text-brand-dark">Review Your Shortlist</h1>
            <p className="mt-2 text-center text-sm text-slate-body">
              {flow.shortlist.length
                ? "These are the dogs you hearted."
                : "You didn't heart any dogs — our team will suggest a buddy for you."}
            </p>

            <ul className="mt-6 grid gap-3">
              {flow.shortlist.map((d) => (
                <li
                  key={d.id}
                  className="flex items-center gap-4 rounded-md border border-hairline p-3"
                >
                  <PlaceholderImage className="h-14 w-14 rounded-md" label={d.name} />
                  <div className="text-sm text-slate-body">
                    <p className="font-semibold text-brand-dark">
                      {d.name}, {d.age}
                    </p>
                    <p>{d.breed}</p>
                  </div>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => navigate({ to: "/pending" })}
              className="mt-8 w-full rounded-md bg-brand px-8 py-4 text-base font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            >
              Submit Matches for Review
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
