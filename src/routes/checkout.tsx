import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  CreditCard,
  QrCode,
  Banknote,
  ShieldCheck,
  Heart,
  HeartHandshake,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useFlow } from "@/lib/flow";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Event Entry & Support — AACL Cape Town" },
      {
        name: "description",
        content: "Complete your registration contribution for Paws in the Park 2026.",
      },
    ],
  }),
  component: CheckoutPage,
});

const SPONSORS = [
  { name: "Hill's Pet Nutrition", file: "/sponsor-hills.png", short: "Hill's" },
  { name: "Rogz", file: "/sponsor-rogz.png", short: "Rogz" },
  { name: "Absolute Pets", file: "/sponsor-absolute-pets.png", short: "Absolute Pets" },
  { name: "Canon", file: "/sponsor-canon.png", short: "Canon" },
];

function CheckoutPage() {
  const navigate = useNavigate();
  const flow = useFlow() as any;

  const [donationTier, setDonationTier] = useState<number>(80);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "snapscan" | "cash">("card");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const participantName = flow?.fullName || flow?.name || "Sarah Jenkins";
  const isDonating = donationTier > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (typeof flow?.updateFlowData === "function") {
        flow.updateFlowData({
          entryFee: donationTier,
          paymentMethod: isDonating ? paymentMethod : "none",
        });
      } else if (typeof flow?.setFlow === "function") {
        flow.setFlow((prev: any) => ({
          ...prev,
          entryFee: donationTier,
          paymentMethod: isDonating ? paymentMethod : "none",
        }));
      }
    } catch {
      // Flow state fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      navigate({ to: "/pending" });
    }, 500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-transparent px-4 py-12">
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-[#60be77]/25 p-6 shadow-xl md:p-10"
        style={{ backgroundColor: "#f3faf5" }}
      >
        {/* Navigation */}
        <div className="relative z-10 flex items-center justify-between">
          <Link
            to="/match"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-xs transition-all hover:border-[#60be77]/40 hover:bg-white hover:text-[#2d633b]"
          >
            <span className="transition-transform group-hover:-translate-x-0.5" aria-hidden="true">
              ←
            </span>
            Back to Match
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#60be77]/20 bg-white/80 px-3 py-1 text-xs font-medium text-[#2d633b] shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-[#60be77]" />
            <span>Fundraiser Entry</span>
          </div>
        </div>

        {/* Header */}
        <div className="relative z-10 my-7 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm border border-[#60be77]/20">
            🐾
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#173e21] md:text-3xl">
            Event Entry & Support
          </h1>
          <p className="mt-1.5 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            100% of your registration entry supports rescue care and kennel enrichment at AACL Cape Town.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          {/* Contribution Tier Selection */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Registration Pass
            </label>

            {/* Donation Tiers */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { amount: 50, label: "Standard Entry" },
                { amount: 80, label: "Entry + Treat Pack" },
                { amount: 150, label: "Champion Supporter" },
              ].map((tier) => (
                <button
                  type="button"
                  key={tier.amount}
                  onClick={() => setDonationTier(tier.amount)}
                  className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all cursor-pointer ${
                    donationTier === tier.amount
                      ? "border-[#60be77] bg-[#f3faf5] ring-2 ring-[#60be77]/30"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <span className="text-base font-extrabold text-slate-800">
                    R{tier.amount}
                  </span>
                  <span className="mt-1 text-[11px] text-slate-500 leading-tight">
                    {tier.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Free / Skip Option */}
            <button
              type="button"
              onClick={() => setDonationTier(0)}
              className={`w-full rounded-xl border py-2.5 px-4 text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                donationTier === 0
                  ? "border-[#60be77] bg-[#f3faf5] text-[#1e582d] ring-2 ring-[#60be77]/30"
                  : "border-dashed border-slate-300 bg-slate-50/50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <HeartHandshake className="h-4 w-4 text-slate-500" />
              <span>I can't donate at this time (Free Entry)</span>
            </button>

            {/* Sponsor Trust Badge */}
            <div className="mt-3 rounded-xl border border-[#60be77]/20 bg-[#f3faf5]/70 p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#1e582d]">
                <Sparkles className="h-3.5 w-3.5 text-[#60be77]" />
                <span>100% Impact Guarantee</span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                Event costs covered through generous sponsorship by <strong>Hill's</strong>, <strong>Rogz</strong>, <strong>Absolute Pets</strong> &amp; <strong>Canon</strong> — 100% of your registration directly benefits AACL rescue animals.
              </p>
              <div className="mt-2.5 flex items-center justify-center gap-4">
                {SPONSORS.map((sponsor) => (
                  <div key={sponsor.name} className="flex h-5 items-center justify-center">
                    <img
                      src={sponsor.file}
                      alt={sponsor.name}
                      className="max-h-4 max-w-[65px] object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const parent = e.currentTarget.parentElement;
                        if (parent && !parent.querySelector(".checkout-fallback-logo")) {
                          const span = document.createElement("span");
                          span.className = "checkout-fallback-logo text-[10px] font-semibold text-slate-500";
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

          {/* Payment Method Selector & Details */}
          {isDonating ? (
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Payment Method
              </label>

              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border py-3 px-2 text-xs font-semibold transition-all cursor-pointer ${
                    paymentMethod === "card"
                      ? "border-[#60be77] bg-[#f3faf5] text-[#1e582d]"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("snapscan")}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border py-3 px-2 text-xs font-semibold transition-all cursor-pointer ${
                    paymentMethod === "snapscan"
                      ? "border-[#60be77] bg-[#f3faf5] text-[#1e582d]"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <QrCode className="h-4 w-4" />
                  <span>SnapScan</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border py-3 px-2 text-xs font-semibold transition-all cursor-pointer ${
                    paymentMethod === "cash"
                      ? "border-[#60be77] bg-[#f3faf5] text-[#1e582d]"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Banknote className="h-4 w-4" />
                  <span>Cash on Day</span>
                </button>
              </div>

              {/* Simulated Card Details */}
              {paymentMethod === "card" && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      defaultValue={participantName}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-[#60be77] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      defaultValue="•••• •••• •••• 4242"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-mono text-slate-800 focus:border-[#60be77] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        defaultValue="11/27"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-mono text-slate-800 focus:border-[#60be77] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        defaultValue="731"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-mono text-slate-800 focus:border-[#60be77] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Simulated SnapScan Box */}
              {paymentMethod === "snapscan" && (
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-inner">
                    <QrCode className="h-24 w-24 text-slate-700" strokeWidth={1.5} />
                  </div>
                  <p className="mt-2.5 text-xs text-slate-500">
                    Simulated SnapScan QR. Click confirm below to proceed.
                  </p>
                </div>
              )}

              {/* Cash on Day Information */}
              {paymentMethod === "cash" && (
                <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-4 text-xs text-amber-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5 text-amber-950">
                    <span>💵</span> Pay at Check-in Gazebo
                  </p>
                  <p className="text-amber-800 leading-relaxed">
                    Please bring exact cash (<strong>R{donationTier}.00</strong>) to the volunteer registration desk on event morning at Jack Muller District Park.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 text-[#1e582d]">
                  <ShieldCheck className="h-4 w-4" /> Simulated Checkout
                </span>
                <span className="font-bold text-slate-800">Total: R{donationTier}.00</span>
              </div>
            </div>
          ) : (
            /* Free Entry Confirmation Panel */
            <div className="rounded-2xl border border-[#60be77]/30 bg-white p-5 text-center shadow-xs">
              <p className="text-xs font-bold text-[#173e21]">
                Free Event Registration
              </p>
              <p className="mt-1 text-xs text-slate-500">
                No payment or donation needed. We can't wait to see you at Jack Muller District Park!
              </p>
            </div>
          )}

          {/* Dynamic Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-95 active:scale-[0.99] disabled:opacity-50"
            style={{ backgroundColor: "#60be77" }}
          >
            {isSubmitting ? (
              <span>Saving Registration...</span>
            ) : !isDonating ? (
              <>
                <span>Complete Free Registration</span>
                <ArrowRight className="h-4 w-4" />
              </>
            ) : paymentMethod === "cash" ? (
              <>
                <Banknote className="h-4 w-4" />
                <span>Register with Cash on Day (R{donationTier}.00)</span>
              </>
            ) : (
              <>
                <Heart className="h-4 w-4 fill-white" />
                <span>Confirm & Pay R{donationTier}.00</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}