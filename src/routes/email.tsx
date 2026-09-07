import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Mail,
  Search,
  ExternalLink,
  Calendar,
  Clock,
  MapPin,
  Archive,
  Trash2,
  Star,
  Globe,
} from "lucide-react";
import { useFlow } from "@/lib/flow";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "AACL Cape Town (View Match) — Mail" },
      {
        name: "description",
        content: "Confirmation email and dog match details for Paws in the Park 2026.",
      },
    ],
  }),
  component: EmailPage,
});

const SPONSORS = [
  { name: "Hill's Pet Nutrition", file: "/sponsor-hills.png", short: "Hill's" },
  { name: "Rogz", file: "/sponsor-rogz.png", short: "Rogz" },
  { name: "Absolute Pets", file: "/sponsor-absolute-pets.png", short: "Absolute Pets" },
  { name: "Canon", file: "/sponsor-canon.png", short: "Canon" },
];

function EmailPage() {
  const flow = useFlow() as any;
  const handlerName = flow?.fullName || flow?.name || "Sarah";
  const firstName = handlerName.trim().split(/\s+/)[0] || "Sarah";

  const matchedDog = {
    name: "Buster",
    age: "2 yrs",
    breed: "Collie Cross",
    image: "/dog-buster.jpg",
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800">
      {/* Top Webmail Bar */}
      <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b border-slate-200/80 bg-white px-4 md:px-8 shadow-xs">
        <div className="flex w-full max-w-6xl items-center gap-6">
          <Link
            to="/inbox"
            className="flex items-center gap-2.5 text-lg font-bold text-[#0d6832] transition-opacity hover:opacity-85"
          >
            <Mail className="h-5 w-5 stroke-[2.5]" />
            <span>Mail</span>
          </Link>

          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              readOnly
              value="from:events@aacl.co.za"
              className="h-10 w-full rounded-full border border-slate-200 bg-slate-100/70 pl-10 pr-4 text-xs text-slate-600 focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* Main Mail Container */}
      <main className="mx-auto max-w-4xl px-4 py-6 md:py-8">
        {/* Mail Toolbar / Back Navigation */}
        <div className="mb-4 flex items-center justify-between">
          <Link
            to="/inbox"
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-xs transition-all hover:border-[#60be77]/40 hover:bg-slate-50 hover:text-[#0d6832]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Mailbox</span>
          </Link>

          <div className="flex items-center gap-1 text-slate-400">
            <button
              type="button"
              title="Star message"
              className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-slate-200/60 hover:text-amber-500"
            >
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            </button>
            <button
              type="button"
              title="Archive"
              className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-slate-200/60 hover:text-slate-600"
            >
              <Archive className="h-4 w-4" />
            </button>
            <button
              type="button"
              title="Delete"
              className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-slate-200/60 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Opened Email Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          {/* Subject & View Ticket Action */}
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="rounded-md bg-[#0d6832]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#0d6832]">
                  Paws in the Park 2026
                </span>
              </div>
              <h1 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                AACL Cape Town (View Match)
              </h1>
            </div>

            <Link
              to="/ticket"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs transition-all hover:border-[#60be77]/40 hover:bg-slate-50 hover:text-[#0d6832]"
            >
              <span>Open Official Ticket</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Sender Details & Timestamp */}
          <div className="mt-6 flex items-center justify-between border-b border-slate-100 pb-5">
            <Link
              to="/"
              className="group flex items-center gap-3 transition-opacity hover:opacity-90"
              title="Visit AACL Cape Town Website"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#0d6832]/20 bg-[#0d6832] shadow-xs">
                <img
                  src="/favicon.png?v=5"
                  alt="AACL"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.innerHTML =
                      '<span class="text-xs font-bold text-white tracking-wider">AACL</span>';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-slate-900 group-hover:text-[#0d6832] transition-colors">
                    AACL Cape Town
                  </p>
                  <span className="text-xs text-slate-400">&lt;events@aacl.co.za&gt;</span>
                </div>
                <p className="text-xs text-slate-500">to {firstName.toLowerCase()}@example.co.za</p>
              </div>
            </Link>

            <span className="text-xs text-slate-400">10:04 (Just now)</span>
          </div>

          {/* Email Body Content */}
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700">
            <p>
              Hi {firstName}, thank you for registering for <strong>Paws in the Park 2026</strong> at Jack Muller District Park, Bellville. Your registration is confirmed and our behaviour team has reviewed your shortlist against your walking preference.
            </p>

            <p>
              We're delighted to pair you with <strong>{matchedDog.name} ({matchedDog.breed})</strong> on the day. Tap below to view your match and event ticket.
            </p>

            {/* Quick Match Preview Box */}
            <div className="my-6 rounded-2xl border border-slate-200 bg-[#f3faf5]/60 p-4 transition-all hover:border-[#60be77]/40 sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={matchedDog.image}
                    alt={matchedDog.name}
                    className="h-16 w-16 rounded-2xl border border-[#0d6832]/20 object-cover object-top shadow-xs"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {matchedDog.name}, {matchedDog.age}
                    </h3>
                    <p className="text-xs font-medium text-slate-500">{matchedDog.breed}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 text-xs text-slate-600">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-slate-400" /> Saturday, 24th Nov
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3 text-slate-400" /> 08:00
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400" /> Jack Muller Park
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/ticket"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0d6832] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#0a5227] active:scale-95"
                >
                  <span>View Match</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Official Sponsors Banner */}
          <div className="mt-8 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-5 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Official Event Sponsors
            </p>

            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-6">
              {SPONSORS.map((sponsor) => (
                <div key={sponsor.name} className="flex h-7 items-center justify-center">
                  <img
                    src={sponsor.file}
                    alt={sponsor.name}
                    className="max-h-6 max-w-[85px] object-contain opacity-75 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      if (parent && !parent.querySelector(".email-fallback-logo")) {
                        const span = document.createElement("span");
                        span.className = "email-fallback-logo text-xs font-bold text-slate-600 tracking-tight";
                        span.innerText = sponsor.short;
                        parent.appendChild(span);
                      }
                    }}
                  />
                </div>
              ))}
            </div>

            <p className="mt-4 border-t border-slate-200/60 pt-3 text-xs leading-relaxed text-slate-500">
              Special thanks to <strong>Hill's</strong> for providing post-walk nourishment, <strong>Rogz</strong> for outfitting our leash station, <strong>Absolute Pets</strong> for welcome treat bags, and <strong>Canon</strong> for capturing finish-line pup portraits.
            </p>
          </div>

          {/* Official AACL Website Link Sign-off */}
          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-5 text-xs text-slate-500 sm:flex-row">
            <p>© 2026 Animal Anti-Cruelty League Cape Town. NPO 000-562.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-semibold text-[#0d6832] hover:underline"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Visit Official AACL Website</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}