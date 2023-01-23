import { atom } from "recoil";

export interface principalChatAtom {
  uid: string | null;
  displayName: string;
  email: string;
  photoURL: string;
}

export const principalChatAtom = atom<principalChatAtom>({
  key: "principalChatAtom",
  default: {
    uid: null,
    displayName: "",
    email: "",
    photoURL: "",
  },
});
