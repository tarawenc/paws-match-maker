import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail } from "lucide-react";
import { PlaceholderImage } from "@/components/aacl/primitives";
import { firstName, useFlow } from "@/lib/flow";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "AACL Cape Town (View Match) — Email" },
      {
        name: "description",
        content:
          "The AACL Cape Town email confirming your Paws in the Park registration and matched shelter dog.",
      },
      { property: "og:title", content: "AACL Cape Town (View Match) — Email" },
      {
        property: "og:description",
        content: "Your registration is confirmed — open your match and ticket.",
      },
    ],
  }),
  component: EmailView,
});

function EmailView() {
  const flow = useFlow();
  const dog = flow.shortlist[0];

  return (
    <div className="min-h-screen bg-page">
      <div className="flex h-16 items-center gap-6 border-b border-hairline bg-white px-6">
        <span className="flex items-center gap-2 text-lg font-semibold text-slate-body">
          <Mail className="h-5 w-5 text-brand" /> Mail
        </span>
      </div>

      <main className="mx-auto max-w-3xl px-6 py-8">
        <Link to="/inbox" className="inline-flex items-center gap-2 text-sm text-slate-body">
          <ArrowLeft className="h-4 w-4" /> Back to inbox
        </Link>

        <article className="mt-4 rounded-lg border border-hairline bg-white p-8">
          <h1 className="text-xl font-bold text-brand-dark">AACL Cape Town (View Match)</h1>
          <div className="mt-4 flex items-center gap-3 border-b border-hairline pb-4">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-dark text-[10px] font-bold text-brand-foreground">
              AACL
            </span>
            <div className="text-sm text-slate-body">
              <p className="font-semibold text-brand-dark">AACL Cape Town</p>
              <p className="text-xs">events@aacl.co.za · 10:04</p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-slate-body">
            Hi {firstName(flow.name)}, thank you for registering for Paws in the Park 2026 at Jack
            Muller District Park, Bellville. Your registration is confirmed and our behaviour team
            has reviewed your shortlist against your {flow.pace.toLowerCase()} preference.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-body">
            We&apos;re delighted to pair you with{" "}
            <strong>{dog?.name ?? "Buster"}</strong> ({dog?.breed ?? "Collie Cross"}) on the day.
            Tap below to view your match and event ticket.
          </p>

          <div className="mt-6 flex items-center gap-4 rounded-lg border border-hairline p-4">
            <PlaceholderImage className="h-20 w-20 rounded-md" label={dog?.name ?? "Buster"} />
            <div className="text-sm text-slate-body">
              <p className="font-semibold text-brand-dark">
                {dog?.name ?? "Buster"}, {dog?.age ?? "2 yrs"}
              </p>
              <p>Saturday, 24th November · 08:00</p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/ticket"
              className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            >
              View Match
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
