import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/aacl/site-header";
import {
  Heart,
  Stethoscope,
  GraduationCap,
  Calendar,
  MapPin,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Animal Anti-Cruelty League (AACL) — South Africa" },
      {
        name: "description",
        content:
          "Shelters, clinics and community events across South Africa. Pick your region to see what's happening near you.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Restored Navigation Bar */}
      <SiteHeader />

      {/* 1. Hero Section */}
      <section className="relative px-4 pt-4 pb-12 md:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] shadow-xl relative aspect-16/10 md:aspect-21/9 min-h-[480px] flex items-center justify-center">
          <img
            src="/hero-dog.jpg"
            alt="Rescue dog looking up lovingly at handler"
            className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=1600";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-3xl px-6 text-center text-white">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
              Every animal deserves a champion
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-normal text-white/95 sm:text-base leading-relaxed">
              Shelters, clinics and community events across South Africa. Pick your region to see what's happening near you.
            </p>

            <div className="mt-8 flex items-center justify-center">
              <Link
                to="/cape-town"
                className="inline-flex items-center justify-center rounded-xl bg-[#006837] px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#00542c] active:scale-95"
              >
                View Cape Town Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Impact Stats Strip */}
      <section className="border-y border-slate-100 bg-[#fafdfb] py-12 px-4 md:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center md:grid-cols-4">
          <div>
            <p className="text-3xl font-black text-[#006837] md:text-4xl">70+</p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Years of Welfare
            </p>
          </div>
          <div>
            <p className="text-3xl font-black text-[#006837] md:text-4xl">15,000+</p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Patients Treated Annually
            </p>
          </div>
          <div>
            <p className="text-3xl font-black text-[#006837] md:text-4xl">4,200+</p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Sterilisations / Year
            </p>
          </div>
          <div>
            <p className="text-3xl font-black text-[#006837] md:text-4xl">100%</p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Donation Driven
            </p>
          </div>
        </div>
      </section>

      {/* 3. Core Pillars / About AACL */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#006837]">
              What We Do
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#173e21] sm:text-3xl">
              Protecting and Caring Since 1956
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              As an independent non-profit animal welfare organisation, the Animal Anti-Cruelty League provides subsidised veterinary healthcare, rescue shelter, and community education to protect animals from neglect and abuse.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/80 bg-[#f9fbf9] p-6 shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf7ee] text-[#006837] mb-4">
                <Stethoscope className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Hospital & Mobile Clinics</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Subsidised veterinary hospitals and mobile units serving lower-income communities with preventative medicine, emergency treatment, and vaccinations.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-[#f9fbf9] p-6 shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf7ee] text-[#006837] mb-4">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Shelter & Rehoming</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Safe haven for abandoned, lost, and surrendered dogs and cats. Every animal is vaccinated, dewormed, sterilised, and microchipped before adoption.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-[#f9fbf9] p-6 shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf7ee] text-[#006837] mb-4">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Humane Education</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                School and outreach programmes that teach empathy, primary health care, and responsible pet ownership to build lifelong respect for animals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Paws in the Park Callout Card */}
      <section className="py-6 px-4 md:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#eaf7ee] border border-[#60be77]/30 p-8 md:p-10 relative overflow-hidden">
          <div className="max-w-xl relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#006837] shadow-xs">
              <Calendar className="h-3.5 w-3.5" /> Upcoming Cape Town Event
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#173e21] sm:text-3xl">
              Paws in the Park 2026
            </h2>
            <p className="mt-2 text-xs md:text-sm text-slate-600 leading-relaxed">
              Step out with our shelter dogs at Jack Muller District Park! Whether you walk, jog, or volunteer, your participation directly supports rescue care.
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-700">
              <MapPin className="h-3.5 w-3.5 text-[#006837]" />
              <span>Jack Muller District Park, Bellville</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-[#006837] px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#00542c] transition-all"
              >
                <span>Register for Event</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/cape-town"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all"
              >
                <span>Cape Town Hub</span>
              </Link>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-[#60be77]/20 blur-3xl pointer-events-none"
          />
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-10 px-4 md:px-8 text-xs text-slate-500">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <p className="font-bold text-slate-800 text-sm">
              Animal Anti-Cruelty League (AACL)
            </p>
            <p>Non-Profit Organisation • Dedicated to the prevention of cruelty to animals</p>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-[#006837]" />
              021 534 6426
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-[#006837]" />
              info@aacl-ct.co.za
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}