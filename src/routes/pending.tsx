import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/pending")({
  head: () => ({
    meta: [
      { title: "Reviewing Matches — AACL Cape Town" },
      {
        name: "description",
        content:
          "Our behaviour team is reviewing your Paws in the Park shortlist and pairing you with the right shelter dog.",
      },
      { property: "og:title", content: "Reviewing Matches — AACL Cape Town" },
      {
        property: "og:description",
        content: "Our behaviour team is checking your shortlist against your pace.",
      },
    ],
  }),
  component: Pending,
});

function Pending() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/inbox" }), 4000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="grid min-h-screen place-items-center bg-brand-dark/10 px-6">
      <div className="w-full max-w-sm rounded-xl border border-hairline bg-white p-12 text-center shadow-xl">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-hairline border-t-brand" />
        <h1 className="mt-6 text-xl font-bold text-brand-dark">Reviewing Matches...</h1>
      </div>
    </div>
  );
}
