import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Dog = {
  id: string;
  name: string;
  age: string;
  breed: string;
  traits: string[];
};

export const DOGS: Dog[] = [
  { id: "buster", name: "Buster", age: "2 yrs", breed: "Collie Cross - High Energy", traits: ["Loves Jogging", "Good with Kids"] },
  { id: "nala", name: "Nala", age: "4 yrs", breed: "Staffie Mix - Medium Energy", traits: ["Calm on Lead", "Loves Water"] },
  { id: "pip", name: "Pip", age: "1 yr", breed: "Jack Russell - High Energy", traits: ["Loves Jogging", "Very Playful"] },
  { id: "mabel", name: "Mabel", age: "6 yrs", breed: "Labrador - Low Energy", traits: ["Gentle Walker", "Good with Kids"] },
];

export type Pace = "Casual Walker" | "Avid Jogger";

type FlowState = {
  name: string;
  email: string;
  phone: string;
  pace: Pace;
  matchedDog: Dog | null;
};

type FlowContextValue = FlowState & {
  update: (patch: Partial<FlowState>) => void;
};

const defaultState: FlowState = {
  name: "",
  email: "",
  phone: "",
  pace: "Casual Walker",
  matchedDog: null,
};

const FlowContext = createContext<FlowContextValue | null>(null);

export function FlowProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FlowState>(defaultState);
  const value = useMemo(
    () => ({
      ...state,
      update: (patch: Partial<FlowState>) => setState((prev) => ({ ...prev, ...patch })),
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