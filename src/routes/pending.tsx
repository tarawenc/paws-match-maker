import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useFlow } from "@/lib/flow";

export const Route = createFileRoute("/pending")({
  head: () => ({
    meta: [
      { title: "Registration Received — AACL Cape Town" },
      {
        name: "description",
        content: "Registration details and match review for Paws in the Park 2026.",
      },
    ],
  }),
  component: PendingPage,
});

function PendingPage() {
  const navigate = useNavigate();
  const { flowData } = useFlow();

  const recipientEmail = flowData?.email || "sarah@example.co.za";
  const recipientName = flowData?.fullName || "Sarah Jenkins";

  const handleOpenInbox = () => {
    navigate({ to: "/inbox" });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-transparent px-4 py-12">
      {/* Pale Green Outer Container */}
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-[#60be77]/25 p-6 shadow-xl md:p-10"
        style={{ backgroundColor: "#f3faf5" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#60be77]/15 blur-2xl"
        />

        {/* Top Bar */}
        <div className="relative z-10 flex items-center justify-between">
          <Link
            to="/match"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-xs transition-all hover:border-[#60be77]/40 hover:bg-white hover:text-[#2d633b]"
          >
            <span
              className="transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            >
              ←
            </span>
            Back to Match
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#60be77]/20 bg-white/80 px-3 py-1 text-xs font-medium text-[#2d633b] shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-[#60be77]" />
            <span>Registration Submitted</span>
          </div>
        </div>

        {/* Header */}
        <div className="relative z-10 my-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm border border-[#60be77]/20">
            🐾
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#173e21] md:text-3xl">
            You're All Set!
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Our paw experts will review and confirm your pawfect match for <strong>Paws in the Park 2026</strong>. You will receive an email shortly to confirm your match!
          </p>
        </div>

        {/* Confirmation Details Card */}
        <div className="relative z-10 min-h-[380px] flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">
          {/* Review Notice Card */}
          <div className="rounded-xl border border-[#60be77]/25 bg-[#f3faf5]/70 p-4">
            <div className="flex items-start gap-3">
              <span className="text-lg">⏳</span>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#1e582d]">
                  Matching In Progress
                </h2>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  We balance activity levels, trail experience, and dog personalities to ensure every walker and rescue pup has an unforgettable day together.
                </p>
              </div>
            </div>
          </div>

          {/* Registration Summary List */}
          <div className="my-6 space-y-3.5 divide-y divide-slate-100 text-xs text-slate-600">
            <div className="flex justify-between pt-2">
              <span className="text-slate-400">Participant</span>
              <span className="font-semibold text-slate-800">{recipientName}</span>
            </div>
            <div className="flex justify-between pt-3.5">
              <span className="text-slate-400">Confirmation Sent To</span>
              <span className="font-semibold text-slate-800">{recipientEmail}</span>
            </div>
            <div className="flex justify-between pt-3.5">
              <span className="text-slate-400">Event</span>
              <span className="font-semibold text-slate-800">Paws in the Park 2026</span>
            </div>
            <div className="flex justify-between pt-3.5">
              <span className="text-slate-400">Review Status</span>
              <span className="font-semibold text-[#1e582d]">Pending Paw Expert Review</span>
            </div>
          </div>

          {/* Button routed to your existing inbox */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleOpenInbox}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-95 active:scale-[0.99]"
              style={{ backgroundColor: "#60be77" }}
            >
              <span>Open Mailbox</span>
              <span aria-hidden="true">📬</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}