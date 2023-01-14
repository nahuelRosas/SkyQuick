import { atom } from "recoil";

export interface currentChatAtom {
  id: string | null;
  name: string | null;
  type: "group" | "private";
}

const defaultCurrentChatState: currentChatAtom = {
  id: null,
  name: null,
  type: "private",
};

export const currentChatAtom = atom<currentChatAtom>({
  key: "currentChatAtom",
  default: defaultCurrentChatState,
});
