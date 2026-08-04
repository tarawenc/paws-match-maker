import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/aacl/site-header";
import { PlaceholderImage } from "@/components/aacl/primitives";
import { fullName, useFlow } from "@/lib/flow";

export const Route = createFileRoute("/ticket")({
  head: () => ({
    meta: [
      { title: "Your Paws in the Park Ticket — AACL Cape Town" },
      {
        name: "description",
        content:
          "Your confirmed Paws in the Park 2026 walking buddy, pace and event ticket with QR entry code.",
      },
      { property: "og:title", content: "Your Paws in the Park Ticket — AACL Cape Town" },
      {
        property: "og:description",
        content: "Your confirmed walking buddy, pace and QR entry ticket for Paws in the Park 2026.",
      },
    ],
  }),
  component: Ticket,
});

function Ticket() {
  const flow = useFlow();
  const dog = flow.matchedDog;
  const dogName = dog?.name ?? "Buster";
  const pace = flow.pace === "Avid Jogger" ? "Avid Jogger (5km)" : "Casual Walker (2km)";

  return (
    <div className="min-h-screen bg-page">
      <SiteHeader confirmed />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-center text-3xl font-bold tracking-tight text-brand-dark md:text-4xl">
          It&apos;s Official! You&apos;re walking with {dogName}.
        </h1>
        <p className="mt-3 text-center text-sm text-slate-body">
          Bring this ticket to the Jack Muller District Park entrance on the day.
        </p>

        <section className="mt-10 rounded-xl border-2 border-dashed border-brand bg-white p-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center">
            <PlaceholderImage className="h-32 w-32 shrink-0 rounded-md" label={dogName} />

            <div className="flex-1 text-sm text-slate-body">
              <p className="text-lg font-bold text-brand-dark">
                {dogName}, {dog?.age ?? "2 yrs"}
              </p>
              <dl className="mt-4 grid gap-2">
                <div className="flex gap-2">
                  <dt className="font-semibold">Date:</dt>
                  <dd>Saturday, 24th Nov</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold">Pace:</dt>
                  <dd>{pace}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold">Handler:</dt>
                  <dd>{fullName(flow.name)}</dd>
                </div>
              </dl>
            </div>

            <PlaceholderImage className="h-32 w-32 shrink-0 rounded-md" label="QR Code" />
          </div>
        </section>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            className="rounded-md bg-brand px-8 py-3.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
          >
            Download Ticket / Add to Wallet
          </button>
        </div>
      </main>
    </div>
  );
}