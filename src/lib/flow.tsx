import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Dog = {
  id: string;
  name: string;
  age: string;
  breed: string;
  traits?: string[];
  image?: string;
  objectPosition?: string;
  tags?: string[];
  bio?: string;
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

export type Pace = "Walking" | "Jogger" | "Neither" | "walking" | "jogger" | "neither" | string;

export interface FlowState {
  name: string;
  fullName?: string;
  email: string;
  phone: string;
  cellphone?: string;
  pace: Pace;
  shortlist: Dog[];
  selectedDog?: Dog | null;
  [key: string]: any;
}

export interface FlowContextValue extends FlowState {
  flowData: FlowState;
  fullName?: string;
  cellphone?: string;
  update: (patch: Partial<FlowState>) => void;
  updateFlowData: (patch: Partial<FlowState>) => void;
  setFlow: React.Dispatch<React.SetStateAction<FlowState>>;
  shortlistDog: (dog: Dog) => void;
}

const defaultState: FlowState = {
  name: "",
  fullName: "",
  email: "",
  phone: "",
  cellphone: "",
  pace: "Walking",
  shortlist: [],
  selectedDog: null,
};

const FlowContext = createContext<FlowContextValue | null>(null);

export function FlowProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FlowState>(defaultState);

  const value = useMemo<FlowContextValue>(() => {
    const update = (patch: Partial<FlowState>) =>
      setState((prev) => ({ ...prev, ...patch }));

    return {
      ...state,
      fullName: state.fullName || state.name,
      cellphone: state.cellphone || state.phone,
      flowData: state,
      update,
      updateFlowData: update,
      setFlow: setState,
      shortlistDog: (dog: Dog) =>
        setState((prev) =>
          prev.shortlist.some((d) => d.id === dog.id)
            ? prev
            : { ...prev, shortlist: [...prev.shortlist, dog] },
        ),
    };
  }, [state]);

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