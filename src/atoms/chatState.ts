import { atom } from "recoil";

export interface chatState {
  uid: string | null;
  displayName: string;
  email: string;
  photoURL: string;
}

export const chatState = atom<chatState>({
  key: "chatState",
  default: {
    uid: null,
    displayName: "",
    email: "",
    photoURL: "",
  },
});
