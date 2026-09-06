import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderImage } from "@/components/aacl/primitives";
import { fullName, useFlow } from "@/lib/flow";

export const Route = createFileRoute("/ticket")({
  head: () => ({
    meta: [
      { title: "It's Official — Your Paws in the Park Ticket" },
      {
        name: "description",
        content:
          "Your confirmed Paws in the Park 2026 walking buddy and event ticket with QR entry code.",
      },
      { property: "og:title", content: "It's Official — Your Paws in the Park Ticket" },
      {
        property: "og:description",
        content: "Your confirmed walking buddy and QR entry ticket for Paws in the Park 2026.",
      },
    ],
  }),
  component: Ticket,
});

function Ticket() {
  const flow = useFlow();
  const dog = flow.shortlist[0];
  const dogName = dog?.name ?? "Buster";

  return (
    <div className="min-h-screen bg-page">
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-center text-3xl font-bold tracking-tight text-brand-dark md:text-4xl">
          IT&apos;S OFFICIAL!
        </h1>
        <p className="mt-3 text-center text-base text-slate-body">
          Show your ticket at the event check-in.
        </p>

        <section className="mt-10 rounded-xl border-2 border-dashed border-brand bg-white p-10">
          <h2 className="text-center text-xl font-bold text-brand-dark">
            Paws in the Park 2026
          </h2>
          <p className="mt-1 text-center text-sm text-slate-body">
            Saturday, 24th November · Jack Muller District Park, Bellville
          </p>

          <div className="mt-8 flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <PlaceholderImage className="h-36 w-36 shrink-0 rounded-md" label={`${dogName} photo`} />

            <div className="text-sm text-slate-body">
              <p className="text-lg font-bold text-brand-dark">
                {dogName}, {dog?.age ?? "2 yrs"}
              </p>
              <dl className="mt-4 grid gap-2">
                <div className="flex gap-2">
                  <dt className="font-semibold">Handler:</dt>
                  <dd>{fullName(flow.name)}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold">Pace:</dt>
                  <dd>{flow.pace}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold">Check-in:</dt>
                  <dd>07:30 — Gate B</dd>
                </div>
              </dl>
            </div>

            <PlaceholderImage className="h-36 w-36 shrink-0 rounded-md" label="QR Code" />
          </div>
        </section>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            className="rounded-md bg-brand px-10 py-3.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
          >
            Download
          </button>
        </div>
      </main>
    </div>
  );
}
