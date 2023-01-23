import { atom } from "recoil";

export interface loadingAtom {
  completed: boolean;
  value: number;
}

export const loadingAtom = atom<loadingAtom>({
  key: "loadingAtom",
  default: {
    completed: false,
    value: 0,
  },
});
