import { atom } from "recoil";

export interface searchQueryAtom {
  query: string;
  state: boolean;
  loading: boolean;
}

export const searchQueryAtom = atom<searchQueryAtom>({
  key: "searchQueryAtom",
  default: {
    query: "",
    state: false,
    loading: false,
  },
});
