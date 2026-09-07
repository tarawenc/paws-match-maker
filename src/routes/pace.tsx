import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useFlow } from "@/lib/flow";

export const Route = createFileRoute("/pace")({
  head: () => ({
    meta: [
      { title: "What's Your Pace? — Paws in the Park 2026" },
      {
        name: "description",
        content: "Select your preferred walking or jogging pace for dog matching.",
      },
    ],
  }),
  component: PacePage,
});

const PACE_OPTIONS = [
  {
    id: "walking",
    label: "Walking",
    description: "A relaxed 2km stroll with plenty of sniff breaks.",
    icon: "🦮",
  },
  {
    id: "jogger",
    label: "Jogger",
    description: "A steady 5km run with a high-energy buddy.",
    icon: "🏃",
  },
  {
    id: "neither",
    label: "Neither",
    description: "I'd rather help at the stands and meet the dogs.",
    icon: "🎪",
  },
];

function PacePage() {
  const navigate = useNavigate();
  const flowContext = useFlow() as Record<string, any>;
  const [selectedPace, setSelectedPace] = useState<string>("walking");

  const handleProceed = () => {
    try {
      if (flowContext && typeof flowContext["updateFlowData"] === "function") {
        flowContext["updateFlowData"]({ pace: selectedPace });
      }
    } catch {
      // Fallback
    }

    navigate({ to: "/match" });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-transparent px-4 py-12">
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
            to="/register"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-xs transition-all hover:border-[#60be77]/40 hover:bg-white hover:text-[#2d633b]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Details</span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#60be77]/20 bg-white/80 px-3 py-1 text-xs font-medium text-[#2d633b] shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-[#60be77] ring-4 ring-[#60be77]/20" />
            <span>Step 2 of 3</span>
          </div>
        </div>

        {/* Header */}
        <div className="relative z-10 my-7 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#173e21] md:text-3xl">
            What's your pace?
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">
            This helps our behaviour team pair you with the perfect companion.
          </p>
        </div>

        {/* Options List */}
        <div className="relative z-10 space-y-4">
          <div className="space-y-3">
            {PACE_OPTIONS.map((option) => {
              const isSelected = selectedPace === option.id;
              return (
                <div
                  key={option.id}
                  onClick={() => setSelectedPace(option.id)}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                    isSelected
                      ? "border-[#60be77] bg-white ring-2 ring-[#60be77]/30 shadow-sm"
                      : "border-slate-200/90 bg-white/80 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl">{option.icon}</span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">
                        {option.label}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {option.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                      isSelected
                        ? "border-[#60be77] bg-[#60be77] text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={handleProceed}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-95 active:scale-[0.99]"
              style={{ backgroundColor: "#60be77" }}
            >
              <span>Continue to Dog Matching</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}