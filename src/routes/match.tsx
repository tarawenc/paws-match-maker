import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useFlow } from "@/lib/flow";

export const Route = createFileRoute("/match")({
  head: () => ({
    meta: [
      { title: "Find Your Buddy — AACL Cape Town" },
      {
        name: "description",
        content: "Step 3 of 3: Match with a shelter dog for Paws in the Park 2026.",
      },
    ],
  }),
  component: MatchPage,
});

interface Dog {
  id: string;
  name: string;
  age: string;
  breed: string;
  image: string;
  objectPosition: string;
  tags: string[];
  bio: string;
}

const FALLBACK_DOG: Dog = {
  id: "barnaby",
  name: "Barnaby",
  age: "1 yr",
  breed: "Jack Russell Terrier Mix",
  image: "/dog-barnaby.jpg",
  objectPosition: "object-[center_20%]",
  tags: ["High Energy", "Playful", "Good with Kids"],
  bio: "Full of boundless energy and ready to sprint around the park!",
};

const DOGS: Dog[] = [
  FALLBACK_DOG,
  {
    id: "buster",
    name: "Buster",
    age: "2 yrs",
    breed: "Collie Cross",
    image: "/dog-buster.jpg",
    objectPosition: "object-top",
    tags: ["High Energy", "Loves Jogging", "Good with Kids"],
    bio: "Friendly, spirited, and always up for an adventurous trail walk!",
  },
  {
    id: "daisy",
    name: "Daisy",
    age: "3 yrs",
    breed: "Labrador Retriever Cross",
    image: "/dog-daisy.jpg",
    objectPosition: "object-[center_60%]",
    tags: ["Affectionate", "Gentle", "Loves Fetch"],
    bio: "A sweet, happy companion who loves rolling in the grass and making friends.",
  },
  {
    id: "luna",
    name: "Luna",
    age: "4 yrs",
    breed: "Cross Breed",
    image: "/dog-luna.jpg",
    objectPosition: "object-center",
    tags: ["Calm", "Easy Walker", "Great Listener"],
    bio: "A calm soul who loves relaxed strolls and plenty of ear scratches.",
  },
];

function MatchPage() {
  const navigate = useNavigate();
  const flowContext = useFlow() as Record<string, any>;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [shortlist, setShortlist] = useState<Dog[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const totalDogs = DOGS.length;
  const currentDog: Dog = DOGS[currentIndex] ?? FALLBACK_DOG;

  const handlePass = () => {
    if (currentIndex + 1 < totalDogs) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleHeart = () => {
    if (!shortlist.some((d) => d.id === currentDog.id)) {
      setShortlist((prev) => [...prev, currentDog]);
    }

    if (currentIndex + 1 < totalDogs) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRemoveFromShortlist = (dogId: string) => {
    setShortlist((prev) => prev.filter((d) => d.id !== dogId));
  };

  const handleSubmitShortlist = () => {
    try {
      const selected: Dog[] = shortlist.length > 0 ? shortlist : [DOGS[1] ?? FALLBACK_DOG];

      if (flowContext && typeof flowContext["updateFlowData"] === "function") {
        flowContext["updateFlowData"]({
          shortlist: selected.map((d) => ({
            id: d.id,
            name: d.name,
            breed: d.breed,
          })),
          selectedDog: selected[0],
        });
      } else if (flowContext && typeof flowContext["setFlow"] === "function") {
        flowContext["setFlow"]((prev: any) => ({
          ...prev,
          shortlist: selected,
          selectedDog: selected[0],
        }));
      }
    } catch {
      // Fallback
    }

    navigate({ to: "/checkout" });
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setShortlist([]);
    setIsFinished(false);
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
            to="/pace"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-xs transition-all hover:border-[#60be77]/40 hover:bg-white hover:text-[#2d633b]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Pace</span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#60be77]/20 bg-white/80 px-3 py-1 text-xs font-medium text-[#2d633b] shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-[#60be77] ring-4 ring-[#60be77]/20" />
            <span>Step 3 of 3</span>
          </div>
        </div>

        {!isFinished ? (
          <>
            <div className="relative z-10 my-7 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-[#173e21] md:text-3xl">
                Find your buddy
              </h1>
              <p className="mt-1.5 text-sm text-slate-600">
                Pass on a pup or tap the heart to shortlist. Dog {currentIndex + 1} of {totalDogs}.
              </p>
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-md items-center justify-center px-6">
              {/* Pass Button */}
              <button
                type="button"
                onClick={handlePass}
                aria-label="Pass dog"
                className="absolute left-0 z-20 flex h-13 w-13 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-lg transition-all hover:scale-105 hover:text-red-500 active:scale-95"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Dog Profile Card */}
              <div className="w-full overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl transition-all">
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                  <img
                    src={currentDog.image}
                    alt={currentDog.name}
                    className={`h-full w-full object-cover transition-transform duration-300 ${currentDog.objectPosition}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

                  <div className="absolute bottom-3 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#1e582d] shadow-xs backdrop-blur-xs">
                    {currentDog.breed}
                  </div>
                </div>

                <div className="p-6 pt-5">
                  <div className="flex items-baseline justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                      {currentDog.name}
                    </h2>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                      {currentDog.age}
                    </span>
                  </div>

                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {currentDog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-[#60be77]/15 px-2.5 py-1 text-xs font-semibold text-[#1e582d]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-slate-600">
                    {currentDog.bio}
                  </p>
                </div>
              </div>

              {/* Heart Button */}
              <button
                type="button"
                onClick={handleHeart}
                aria-label="Add dog to shortlist"
                className="absolute right-0 z-20 flex h-13 w-13 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-[#60be77] shadow-lg transition-all hover:scale-105 hover:bg-[#60be77] hover:text-white active:scale-95"
              >
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </>
        ) : (
          /* Shortlist Review Section */
          <div className="relative z-10 my-4">
            <div className="text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-xs border border-[#60be77]/20">
                🐾
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#173e21]">
                Your Shortlist
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {shortlist.length > 0
                  ? `You selected ${shortlist.length} dog${shortlist.length > 1 ? "s" : ""}. Proceed to complete registration.`
                  : "You skipped all dogs. Would you like to review them again?"}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {shortlist.map((dog) => (
                <div
                  key={dog.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={dog.image}
                      alt={dog.name}
                      className={`h-12 w-12 rounded-lg object-cover ${dog.objectPosition}`}
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">
                        {dog.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {dog.breed} • {dog.age}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveFromShortlist(dog.id)}
                    className="cursor-pointer text-xs font-semibold text-slate-400 transition-colors hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              {shortlist.length > 0 && (
                <button
                  type="button"
                  onClick={handleSubmitShortlist}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-95 active:scale-[0.99]"
                  style={{ backgroundColor: "#60be77" }}
                >
                  <span>Proceed to Contribution</span>
                  <span aria-hidden="true">→</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleRestart}
                className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
              >
                Review Dogs Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}