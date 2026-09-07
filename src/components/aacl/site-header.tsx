import { Link } from "@tanstack/react-router";

export function SiteHeader({ confirmed = false }: { confirmed?: boolean }) {
  return (
    <header className="border-b border-hairline bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-6">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/aacl-logo.png" 
            alt="AACL Logo" 
            className="h-10 w-auto object-contain" 
          />
          <span className="hidden text-sm font-semibold tracking-tight text-brand-dark sm:inline">
            Animal Anti-Cruelty League
          </span>
        </Link>

        {/* Informational nav links with Donate placed after Volunteer */}
        <nav className="hidden flex-1 items-center gap-6 md:flex" aria-label="Main">
          {["About", "Adopt", "Volunteer", "Donate"].map((item) => (
            <span
              key={item}
              className="cursor-default text-sm font-medium text-slate-body hover:text-brand transition-colors"
            >
              {item}
            </span>
          ))}
        </nav>

        {/* Action cluster focused on Events */}
        <div className="ml-auto flex items-center gap-3">
          {confirmed ? (
            <span className="text-sm font-bold text-brand">Match Confirmed!</span>
          ) : null}

          {/* Primary CTA */}
          <Link
            to="/cape-town"
            className="rounded-md bg-brand px-4 py-1.5 text-sm font-semibold text-brand-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            Events
          </Link>

          {/* Region selector */}
          <button
            type="button"
            className="rounded-md border border-brand px-3 py-1.5 text-sm font-medium text-brand transition-colors hover:bg-mint"
          >
            📍 Region: Cape Town ▼
          </button>
        </div>
      </div>
    </header>
  );
}
