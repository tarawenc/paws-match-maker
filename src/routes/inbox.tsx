import { createFileRoute, Link } from "@tanstack/react-router";
import { PlaceholderImage } from "@/components/aacl/primitives";
import { firstName, useFlow } from "@/lib/flow";

export const Route = createFileRoute("/inbox")({
  head: () => ({
    meta: [
      { title: "Your Match Email — AACL Cape Town" },
      {
        name: "description",
        content:
          "Preview the AACL Cape Town email confirming your Paws in the Park dog match and event ticket.",
      },
      { property: "og:title", content: "Your Match Email — AACL Cape Town" },
      {
        property: "og:description",
        content: "The confirmation email with your matched dog and event ticket link.",
      },
    ],
  }),
  component: Inbox,
});

const OTHER_MAIL = [
  { from: "Jack Muller Parks", subject: "Weekend park notice", time: "09:12" },
  { from: "Woolworths", subject: "Your order is on the way", time: "Mon" },
  { from: "Book Club", subject: "November pick", time: "Sun" },
];

function Inbox() {
  const flow = useFlow();
  const dog = flow.matchedDog;
  const name = firstName(flow.name);

  return (
    <div className="min-h-screen bg-page">
      <div className="border-b border-hairline bg-placeholder">
        <div className="mx-auto max-w-6xl px-6 py-3 text-sm font-semibold text-slate-body">
          Webmail Client
        </div>
      </div>

      <main className="mx-auto grid max-w-6xl gap-6 px-6 py-8 md:grid-cols-[300px_1fr]">
        <aside className="overflow-hidden rounded-lg border border-hairline bg-white">
          <div className="border-l-4 border-brand bg-mint/40 p-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-bold text-brand-dark">AACL Cape Town</span>
              <span className="text-xs text-slate-body">10:04</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-slate-body">
              Great news, {name}! Your match is confirmed
            </p>
            <span className="mt-2 inline-block rounded bg-brand px-2 py-0.5 text-[10px] font-bold uppercase text-brand-foreground">
              Unread
            </span>
          </div>
          {OTHER_MAIL.map((m) => (
            <div key={m.from} className="border-t border-hairline p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-slate-body">{m.from}</span>
                <span className="text-xs text-slate-body/70">{m.time}</span>
              </div>
              <p className="mt-1 text-sm text-slate-body/80">{m.subject}</p>
            </div>
          ))}
        </aside>

        <section className="rounded-lg border border-hairline bg-white p-8">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-dark text-[10px] font-bold text-brand-foreground">
            AACL
          </span>
          <h1 className="mt-6 text-2xl font-bold text-brand-dark">Great news, {name}!</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-body">
            Our behaviour team has approved your pairing with{" "}
            <strong>{dog?.name ?? "Buster"}</strong> ({dog?.breed ?? "Collie Cross - High Energy"})
            for Paws in the Park 2026 at Jack Muller District Park, Bellville. Your pace is set to{" "}
            {flow.pace}, and your ticket is ready.
          </p>

          <div className="mt-6 flex items-center gap-4 rounded-lg border border-hairline p-4">
            <PlaceholderImage className="h-20 w-20 rounded-md" />
            <div className="text-sm text-slate-body">
              <p className="font-semibold text-brand-dark">
                {dog?.name ?? "Buster"}, {dog?.age ?? "2 yrs"}
              </p>
              <p>Saturday, 24th Nov · 08:00</p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/ticket"
              className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            >
              View Your Match &amp; Ticket
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}