import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useFlow } from "@/lib/flow";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Event Registration — AACL Cape Town" },
      {
        name: "description",
        content: "Step 1 of 3: Enter your contact details to register for Paws in the Park 2026.",
      },
    ],
  }),
  component: RegisterPage,
});

const DEMO_USER = {
  fullName: "Sarah Jenkins",
  email: "sarah@example.co.za",
  cellphone: "082 555 1234",
};

function RegisterPage() {
  const navigate = useNavigate();
  const flowContext = useFlow() as any;

  const [fullName, setFullName] = useState(
    flowContext?.flowData?.fullName || flowContext?.fullName || flowContext?.name || DEMO_USER.fullName
  );
  const [email, setEmail] = useState(
    flowContext?.flowData?.email || flowContext?.email || DEMO_USER.email
  );
  const [cellphone, setCellphone] = useState(
    flowContext?.flowData?.cellphone || flowContext?.cellphone || flowContext?.phone || DEMO_USER.cellphone
  );
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const isValid = fullName.trim() !== "" && email.trim() !== "" && cellphone.trim() !== "";

  const handleProceed = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setHasSubmitted(true);

    if (!isValid) return;

    try {
      if (flowContext?.updateFlowData) {
        flowContext.updateFlowData({
          name: fullName,
          fullName,
          email,
          phone: cellphone,
          cellphone,
        });
      }
    } catch (err) {
      console.warn("Flow context update failed, continuing navigation anyway:", err);
    }

    navigate({ to: "/pace" });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-transparent px-4 py-12">
      {/* Outer Shell: Pale mint-cream container */}
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-[#60be77]/25 p-6 shadow-xl md:p-10"
        style={{ backgroundColor: "#f3faf5" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#60be77]/15 blur-2xl"
        />

        {/* Top Navigation Bar */}
        <div className="relative z-10 flex items-center justify-between">
          <Link
            to="/cape-town"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-xs transition-all hover:border-[#60be77]/40 hover:bg-white hover:text-[#2d633b]"
          >
            <span className="transition-transform group-hover:-translate-x-0.5" aria-hidden="true">
              ←
            </span>
            Back to Events
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#60be77]/20 bg-white/80 px-3 py-1 text-xs font-medium text-[#2d633b] shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-[#60be77] ring-4 ring-[#60be77]/20" />
            <span>Step 1 of 3</span>
          </div>
        </div>

        {/* Title Header */}
        <div className="relative z-10 my-7 text-center">
          <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#60be77] shadow-xs border border-[#60be77]/20">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#173e21] md:text-3xl">
            Event Registration
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">
            Let's start with your contact details so we can reserve your spot.
          </p>
        </div>

        {/* Form Card */}
        <div className="relative z-10 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">
          <form onSubmit={handleProceed} className="space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Sarah Jenkins"
                className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-[#60be77] focus:bg-white focus:outline-none focus:ring-3 focus:ring-[#60be77]/15"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah@example.co.za"
                className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-[#60be77] focus:bg-white focus:outline-none focus:ring-3 focus:ring-[#60be77]/15"
              />
            </div>

            <div>
              <label
                htmlFor="cellphone"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Cellphone Number
              </label>
              <input
                id="cellphone"
                name="cellphone"
                type="tel"
                value={cellphone}
                onChange={(e) => setCellphone(e.target.value)}
                placeholder="082 555 1234"
                className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-[#60be77] focus:bg-white focus:outline-none focus:ring-3 focus:ring-[#60be77]/15"
              />
            </div>

            {hasSubmitted && !isValid && (
              <div className="rounded-lg bg-red-50 p-3 text-xs font-medium text-red-600">
                Please fill in all three fields to proceed.
              </div>
            )}

            <div className="flex items-center justify-between pt-3">
              <Link
                to="/cape-town"
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl px-7 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-95 active:scale-[0.99] cursor-pointer"
                style={{ backgroundColor: "#60be77" }}
              >
                <span>Continue to Pace</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}