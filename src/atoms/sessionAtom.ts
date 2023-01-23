import { DocumentData } from "firebase/firestore";
import { atom } from "recoil";

export interface sessionAtom extends DocumentData {
  user: {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    createdAt: Date;
    updatedAt: Date;
    emailVerified: boolean;
    providerData: DocumentData[];
    friends: DocumentData[];
    recivedRequestFriends: DocumentData[];
    sentRequestFriends: DocumentData[];
    about: string;
  } | null;
}

const defaultSessionState: sessionAtom = {
  user: null,
};

export const sessionAtom = atom<sessionAtom>({
  key: "sessionAtom",
  default: defaultSessionState,
});
