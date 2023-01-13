import { atom } from "recoil";
import { persistAtomEffect } from "./SSRStateAtom";

export interface sessionState {
  state: boolean | undefined;
  timeStarted: number | undefined;
  user: {
    email: string | null;
    name: string | null;
    photoURL: string | null;
  };
}

export const defaultSessionState: sessionState = {
  state: undefined,
  timeStarted: undefined,
  user: {
    email: null,
    name: null,
    photoURL: null,
  },
};

export const sessionState = atom<sessionState>({
  key: "sessionState",
  default: defaultSessionState,
  effects_UNSTABLE: [persistAtomEffect],
});
