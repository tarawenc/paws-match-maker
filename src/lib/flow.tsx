import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Dog = {
  id: string;
  name: string;
  age: string;
  breed: string;
  traits: string[];
};

export const DOGS: Dog[] = [
  {
    id: "buster",
    name: "Buster",
    age: "2 yrs",
    breed: "Collie Cross",
    traits: ["High Energy", "Loves Jogging", "Good with Kids"],
  },
  {
    id: "luna",
    name: "Luna",
    age: "4 yrs",
    breed: "Staffie Mix",
    traits: ["Medium Energy", "Calm on Lead", "Loves Water"],
  },
  {
    id: "barnaby",
    name: "Barnaby",
    age: "1 yr",
    breed: "Jack Russell",
    traits: ["High Energy", "Very Playful", "Quick Learner"],
  },
  {
    id: "daisy",
    name: "Daisy",
    age: "6 yrs",
    breed: "Labrador",
    traits: ["Low Energy", "Gentle Walker", "Good with Kids"],
  },
];

export type Pace = "Walking" | "Jogger" | "Neither";

type FlowState = {
  name: string;
  email: string;
  phone: string;
  pace: Pace;
  shortlist: Dog[];
};

type FlowContextValue = FlowState & {
  update: (patch: Partial<FlowState>) => void;
  shortlistDog: (dog: Dog) => void;
};

const defaultState: FlowState = {
  name: "",
  email: "",
  phone: "",
  pace: "Walking",
  shortlist: [],
};

const FlowContext = createContext<FlowContextValue | null>(null);

export function FlowProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FlowState>(defaultState);
  const value = useMemo(
    () => ({
      ...state,
      update: (patch: Partial<FlowState>) => setState((prev) => ({ ...prev, ...patch })),
      shortlistDog: (dog: Dog) =>
        setState((prev) =>
          prev.shortlist.some((d) => d.id === dog.id)
            ? prev
            : { ...prev, shortlist: [...prev.shortlist, dog] },
        ),
    }),
    [state],
  );
  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

export function useFlow() {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error("useFlow must be used inside FlowProvider");
  return ctx;
}

export function firstName(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return "Sarah";
  return trimmed.split(/\s+/)[0];
}

export function fullName(name: string) {
  return name.trim() || "Sarah Jenkins";
}
