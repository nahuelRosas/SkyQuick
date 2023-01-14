import { atom } from "recoil";

export interface searchQueryState {
  query: string;
  state: boolean;
  loading: boolean;
}

export const searchQueryState = atom<searchQueryState>({
  key: "searchQueryState",
  default: {
    query: "",
    state: false,
    loading: false,
  },
});
