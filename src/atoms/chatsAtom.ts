import { DocumentData, Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface chatsAtom extends DocumentData {
  message: string;
  reciverName: string;
  reciverPhotoURL: string;
  reciverUID: string;
  senderName: string;
  senderPhotoURL: string;
  senderUID: string;
  timestamp: Timestamp;
}

const defaultFollowingState: chatsAtom[] = [];

export const chatsAtom = atom<chatsAtom[]>({
  key: "chatsAtom",
  default: defaultFollowingState,
});
