import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/aacl/site-header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AACL — Animal Anti-Cruelty League South Africa" },
      {
        name: "description",
        content:
          "Choose your AACL region to find local shelter events, adoptions and community walks near you.",
      },
      { property: "og:title", content: "AACL — Animal Anti-Cruelty League South Africa" },
      {
        property: "og:description",
        content: "Choose your AACL region to find local shelter events and community walks.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <section className="relative aspect-video w-full overflow-hidden rounded-lg bg-placeholder">
          <div className="absolute inset-0 grid place-items-center px-6 text-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-slate-body md:text-5xl">
                Every animal deserves a champion
              </h1>
              <p className="mt-4 text-base text-slate-body md:text-lg">
                Shelters, clinics and community events across South Africa. Pick your region to
                see what&apos;s happening near you.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-10 flex justify-center">
          <Link
            to="/cape-town"
            className="rounded-md bg-brand px-8 py-3.5 text-base font-semibold text-brand-foreground transition-opacity hover:opacity-90"
          >
            View Cape Town Events
          </Link>
        </div>
      </main>
    </div>
  );
}
