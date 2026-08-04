import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteHeader } from "@/components/aacl/site-header";

export const Route = createFileRoute("/pending")({
  head: () => ({
    meta: [
      { title: "Reviewing Your Matches — AACL Cape Town" },
      {
        name: "description",
        content:
          "Our behaviour team is reviewing your Paws in the Park profile and pairing you with the right shelter dog.",
      },
      { property: "og:title", content: "Reviewing Your Matches — AACL Cape Town" },
      {
        property: "og:description",
        content: "Our behaviour team is checking your profile against your chosen dog.",
      },
    ],
  }),
  component: Pending,
});

function Pending() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/inbox" }), 3000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-page">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-md rounded-lg border border-hairline bg-white p-10 text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-hairline border-t-brand" />
          <h1 className="mt-6 text-2xl font-bold text-brand-dark">Reviewing your matches...</h1>
          <p className="mt-3 text-sm text-slate-body">
            Our behaviour team is reviewing your profile and pace preference against your chosen
            dog. You&apos;ll get an email as soon as the pairing is approved.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <Link
              to="/"
              className="rounded-md bg-placeholder px-5 py-2.5 text-sm font-medium text-slate-body transition-colors hover:opacity-90"
            >
              Return to Homepage
            </Link>
            <Link to="/inbox" className="text-xs font-medium text-brand underline">
              Skip ahead to your inbox
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}