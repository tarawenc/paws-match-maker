import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Mail, Search, Star } from "lucide-react";
import { firstName, useFlow } from "@/lib/flow";

export const Route = createFileRoute("/inbox")({
  head: () => ({
    meta: [
      { title: "Inbox — Your AACL Match Email" },
      {
        name: "description",
        content:
          "A mock inbox showing the AACL Cape Town email with your Paws in the Park dog match.",
      },
      { property: "og:title", content: "Inbox — Your AACL Match Email" },
      {
        property: "og:description",
        content: "Open the AACL Cape Town email to view your match.",
      },
    ],
  }),
  component: Inbox,
});

const OTHER_MAIL = [
  { from: "Jack Muller Parks", subject: "Weekend park notice", time: "09:12" },
  { from: "Woolworths", subject: "Your order is on the way", time: "Mon" },
  { from: "Book Club", subject: "November pick — vote now", time: "Sun" },
  { from: "City of Cape Town", subject: "Municipal statement available", time: "Sat" },
];

function Inbox() {
  const navigate = useNavigate();
  const flow = useFlow();

  return (
    <div className="min-h-screen bg-page">
      <div className="flex h-16 items-center gap-6 border-b border-hairline bg-white px-6">
        <span className="flex items-center gap-2 text-lg font-semibold text-slate-body">
          <Mail className="h-5 w-5 text-brand" /> Mail
        </span>
        <div className="flex max-w-xl flex-1 items-center gap-2 rounded-full bg-placeholder px-4 py-2 text-sm text-slate-body/70">
          <Search className="h-4 w-4" /> Search mail
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="overflow-hidden rounded-lg border border-hairline bg-white">
          <button
            type="button"
            onClick={() => navigate({ to: "/email" })}
            className="flex w-full items-center gap-4 border-l-4 border-brand bg-mint/50 px-5 py-4 text-left transition-colors hover:bg-mint"
          >
            <Star className="h-4 w-4 text-brand" />
            <span className="w-52 shrink-0 text-sm font-bold text-brand-dark">AACL Cape Town</span>
            <span className="flex-1 truncate text-sm font-bold text-brand-dark">
              AACL Cape Town (View Match)
              <span className="ml-2 font-normal text-slate-body">
                — Great news, {firstName(flow.name)}, your pairing is approved.
              </span>
            </span>
            <span className="text-xs font-semibold text-brand-dark">10:04</span>
          </button>

          {OTHER_MAIL.map((m) => (
            <div
              key={m.from}
              className="flex items-center gap-4 border-t border-hairline px-5 py-4"
            >
              <Star className="h-4 w-4 text-hairline" />
              <span className="w-52 shrink-0 text-sm text-slate-body">{m.from}</span>
              <span className="flex-1 truncate text-sm text-slate-body/80">{m.subject}</span>
              <span className="text-xs text-slate-body/70">{m.time}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
