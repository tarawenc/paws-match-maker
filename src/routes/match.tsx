import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, X } from "lucide-react";
import { SiteHeader } from "@/components/aacl/site-header";
import { PlaceholderImage, StepIndicator, TraitChip } from "@/components/aacl/primitives";
import { DOGS, useFlow } from "@/lib/flow";

export const Route = createFileRoute("/match")({
  head: () => ({
    meta: [
      { title: "Paws Match — Find Your Walking Buddy" },
      {
        name: "description",
        content:
          "Swipe through AACL Cape Town shelter dogs and pick the walking buddy you want to join at Paws in the Park.",
      },
      { property: "og:title", content: "Paws Match — Find Your Walking Buddy" },
      {
        property: "og:description",
        content: "Swipe through shelter dogs to choose your Paws in the Park walking buddy.",
      },
    ],
  }),
  component: Match,
});

function Match() {
  const navigate = useNavigate();
  const flow = useFlow();
  const [index, setIndex] = useState(0);
  const dog = DOGS[index % DOGS.length]!;

  function pass() {
    setIndex((i) => (i + 1) % DOGS.length);
  }

  function match() {
    flow.update({ matchedDog: dog });
    navigate({ to: "/pending" });
  }

  return (
    <div className="min-h-screen bg-page">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 py-10">
        <StepIndicator current={3} />

        <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-brand-dark">
          Who do you want to walk with?
        </h1>
        <p className="mt-2 text-center text-sm text-slate-body">
          Pass on a pup or tap the heart to request a match.
        </p>

        <div className="mt-10 flex items-center justify-center gap-8">
          <button
            type="button"
            onClick={pass}
            aria-label="Pass"
            className="grid h-14 w-14 place-items-center rounded-full border border-hairline bg-white text-danger transition-colors hover:bg-white/70"
          >
            <X className="h-6 w-6" />
          </button>

          <article className="w-[320px] overflow-hidden rounded-xl bg-white shadow-lg">
            <PlaceholderImage className="h-64 w-full" label={dog.name} />
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
            onClick={match}
            aria-label="Match"
            className="grid h-14 w-14 place-items-center rounded-full border border-hairline bg-white text-brand transition-colors hover:bg-mint"
          >
            <Heart className="h-6 w-6" />
          </button>
        </div>
      </main>
    </div>
  );
}