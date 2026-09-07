import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Printer, QrCode, Scissors, Clock, MapPin, AlertCircle, HeartHandshake, Footprints } from "lucide-react";
import { useFlow } from "@/lib/flow";

export const Route = createFileRoute("/ticket")({
  head: () => ({
    meta: [
      { title: "Official Match Ticket — Paws in the Park 2026" },
      {
        name: "description",
        content: "Printable registration pass and confirmed shelter dog match ticket.",
      },
    ],
  }),
  component: TicketView,
});

const SPONSORS = [
  { name: "Hill's Pet Nutrition", file: "/sponsor-hills.png", short: "Hill's" },
  { name: "Rogz", file: "/sponsor-rogz.png", short: "Rogz" },
  { name: "Absolute Pets", file: "/sponsor-absolute-pets.png", short: "Absolute Pets" },
  { name: "Canon", file: "/sponsor-canon.png", short: "Canon" },
];

function TicketView() {
  const flow = useFlow() as any;

  const handlerName = flow?.fullName || flow?.name || "Sarah Jenkins";
  const pace = flow?.pace || "Jogger";

  const matchedDog = {
    name: "Buster",
    age: "2 yrs",
    breed: "Collie Cross",
    image: "/dog-buster.jpg",
    objectPosition: "object-top",
  };

  const handlePrintOrDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 print:bg-white print:p-0">
      {/* Top Document Bar (Hidden on print) */}
      <header className="mx-auto mb-6 flex max-w-[210mm] items-center justify-between print:hidden">
        <Link
          to="/inbox"
          className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs transition-all hover:border-[#60be77]/40 hover:text-[#2d633b]"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Mailbox</span>
        </Link>

        <button
          type="button"
          onClick={handlePrintOrDownload}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#0d6832] px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#0a5227] active:scale-95"
        >
          <Printer className="h-3.5 w-3.5" />
          <span>Print / Save PDF</span>
        </button>
      </header>

      {/* A4 Sheet Container */}
      <main className="mx-auto flex w-full max-w-[210mm] min-h-[297mm] flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl print:m-0 print:h-[297mm] print:min-h-[297mm] print:w-full print:rounded-none print:border-none print:p-10 print:shadow-none sm:p-12">
        {/* Upper Document Section */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#0d6832]/20 bg-[#0d6832] shadow-xs">
                <img
                  src="/favicon.png?v=5"
                  alt="AACL Cape Town"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.innerHTML =
                      '<span class="text-xs font-bold text-white tracking-wider">AACL</span>';
                  }}
                />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-[#0d6832]">
                  Animal Anti-Cruelty League Cape Town
                </p>
                <p className="text-xs text-slate-400">Official Event Entry Pass & Match Confirmation</p>
              </div>
            </div>
            <div className="text-right">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-mono font-medium text-slate-600">
                PASS-2026-8841
              </span>
            </div>
          </div>

          {/* Hero Banner */}
          <div className="py-6 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#0d6832]">
              IT'S OFFICIAL!
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Keep this upper section for event logistics, and bring the detachable ticket below to check-in.
            </p>
          </div>

          {/* Event Day Logistics Grid */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Event Day Details & Rules
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-[#0d6832] mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Arrival & Schedule</p>
                  <p className="mt-0.5 leading-relaxed text-slate-500">
                    Check-in starts at 07:30. Course briefing at 08:15. Walk kicks off at 08:30 sharp.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-[#0d6832] mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Venue & Parking</p>
                  <p className="mt-0.5 leading-relaxed text-slate-500">
                    Jack Muller District Park, Bellville. Dedicated parking via Frans Conradie Drive.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 text-[#0d6832] mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Shelter Dog Protocol</p>
                  <p className="mt-0.5 leading-relaxed text-slate-500">
                    Leashes and water bowls provided. Please do not feed shelter dogs outside treats.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Guidance Blocks */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs text-slate-600">
            <div className="rounded-xl border border-slate-200/60 bg-white p-3.5">
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <Footprints className="h-4 w-4 text-[#0d6832]" />
                <span>What to Wear & Bring</span>
              </div>
              <p className="mt-1 leading-relaxed text-slate-500">
                Comfortable trail shoes, sun hat, sunscreen, and a refillable water flask. Water points every 1km.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/60 bg-white p-3.5">
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <HeartHandshake className="h-4 w-4 text-[#0d6832]" />
                <span>Adoption & Support Desk</span>
              </div>
              <p className="mt-1 leading-relaxed text-slate-500">
                Fell in love with Buster? Visit the adoption marquee behind the main pavilion after 11:00 to chat with adoptions staff.
              </p>
            </div>
          </div>

          {/* Official Sponsors Bar */}
          <div className="mt-5 rounded-2xl border border-slate-200/70 bg-white px-5 py-3.5 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Proudly Supported By Our 2026 Event Partners
            </p>
            <div className="mt-2.5 flex items-center justify-around gap-4">
              {SPONSORS.map((sponsor) => (
                <div key={sponsor.name} className="flex items-center justify-center h-8 px-2">
                  <img
                    src={sponsor.file}
                    alt={sponsor.name}
                    className="max-h-7 max-w-[90px] object-contain opacity-80 transition-opacity hover:opacity-100"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      if (parent && !parent.querySelector(".fallback-text")) {
                        const span = document.createElement("span");
                        span.className = "fallback-text text-xs font-bold text-slate-600 tracking-tight";
                        span.innerText = sponsor.short;
                        parent.appendChild(span);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lower Detachable Pass */}
        <div className="mt-6">
          {/* Perforation Line */}
          <div className="relative mb-5 flex items-center justify-center">
            <div className="w-full border-t-2 border-dashed border-slate-300" />
            <div className="absolute flex items-center gap-1.5 bg-white px-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <Scissors className="h-3.5 w-3.5" />
              <span>Tear or cut along perforation to present at Gate B</span>
            </div>
          </div>

          {/* Detachable Printable Ticket Box */}
          <div className="relative rounded-3xl border-2 border-dashed border-[#0d6832] bg-[#f3faf5]/35 p-5 sm:p-6">
            <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-r-2 border-dashed border-[#0d6832] bg-white" />
            <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-l-2 border-dashed border-[#0d6832] bg-white" />

            <div className="text-center pb-4 border-b border-dashed border-[#0d6832]/30">
              <span className="rounded-full bg-[#0d6832]/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0d6832]">
                Entry Pass & Buddy Match
              </span>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-[#0d6832]">
                Paws in the Park 2026
              </h3>
              <p className="mt-0.5 text-xs font-medium text-slate-600">
                Saturday, 24th November · Jack Muller District Park, Bellville
              </p>
            </div>

            <div className="mt-5 flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="h-36 w-36 shrink-0 overflow-hidden rounded-2xl border-2 border-[#0d6832]/20 bg-white shadow-sm">
                <img
                  src={matchedDog.image}
                  alt={matchedDog.name}
                  className={`h-full w-full object-cover ${matchedDog.objectPosition}`}
                />
              </div>

              <div className="flex-1 space-y-1.5 text-center sm:text-left sm:pl-2">
                <h4 className="text-2xl font-bold tracking-tight text-[#0d6832]">
                  {matchedDog.name}, {matchedDog.age}
                </h4>
                <p className="text-xs font-medium text-slate-500">{matchedDog.breed}</p>
                <div className="pt-2 space-y-1 text-xs sm:text-sm text-slate-700">
                  <p>
                    <span className="font-bold text-slate-900">Handler:</span> {handlerName}
                  </p>
                  <p>
                    <span className="font-bold text-slate-900">Pace:</span> {pace}
                  </p>
                  <p>
                    <span className="font-bold text-slate-900">Check-in:</span> 07:30 — Gate B
                  </p>
                </div>
              </div>

              <div className="flex h-36 w-36 shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-slate-200 bg-white p-2.5 shadow-sm">
                <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-slate-50 border border-slate-100 p-2">
                  <QrCode className="h-20 w-20 text-slate-800" strokeWidth={1.5} />
                  <span className="mt-1 text-[9px] font-mono tracking-widest text-slate-500 uppercase">
                    Scan At Gate
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}