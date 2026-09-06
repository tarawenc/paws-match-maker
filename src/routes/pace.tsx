import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { SiteHeader } from "@/components/aacl/site-header";
import { StepIndicator } from "@/components/aacl/primitives";
import { useFlow, type Pace } from "@/lib/flow";

export const Route = createFileRoute("/pace")({
  head: () => ({
    meta: [
      { title: "Your Walking Pace — Paws in the Park | AACL" },
      {
        name: "description",
        content:
          "Step two of registration: tell AACL Cape Town whether you prefer walking, jogging or neither.",
      },
      { property: "og:title", content: "Your Walking Pace — Paws in the Park | AACL" },
      {
        property: "og:description",
        content: "Choose walking, jogging or neither so we can pair you with the right dog.",
      },
    ],
  }),
  component: PaceStep,
});

const OPTIONS: { value: Pace; blurb: string }[] = [
  { value: "Walking", blurb: "A relaxed 2km stroll with plenty of sniff breaks." },
  { value: "Jogger", blurb: "A steady 5km run with a high-energy buddy." },
  { value: "Neither", blurb: "I'd rather help at the stands and meet the dogs." },
];

function PaceStep() {
  const navigate = useNavigate();
  const flow = useFlow();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate({ to: "/match" });
  }

  return (
    <div className="min-h-screen bg-page">
      <SiteHeader />

      <main className="mx-auto max-w-2xl px-6 py-14">
        <StepIndicator current={2} />
        <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-brand-dark">
          What&apos;s your pace?
        </h1>
        <p className="mt-3 text-center text-sm text-slate-body">
          Step 2 of 2 — this helps our behaviour team pair you well.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-10 rounded-xl border border-hairline bg-white p-8 shadow-sm"
        >
          <fieldset className="grid gap-4">
            <legend className="sr-only">Pace preference</legend>
            {OPTIONS.map((o) => (
              <label
                key={o.value}
                className="flex cursor-pointer items-start gap-3 rounded-md border border-hairline p-4 transition-colors hover:bg-mint/50"
              >
                <input
                  type="radio"
                  name="pace"
                  value={o.value}
                  checked={flow.pace === o.value}
                  onChange={() => flow.update({ pace: o.value })}
                  className="mt-1 h-4 w-4 accent-brand"
                />
                <span>
                  <span className="block text-base font-semibold text-brand-dark">{o.value}</span>
                  <span className="mt-1 block text-xs text-slate-body">{o.blurb}</span>
                </span>
              </label>
            ))}
          </fieldset>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-brand px-8 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
