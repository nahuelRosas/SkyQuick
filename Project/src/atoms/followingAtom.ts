import { DocumentData } from 'firebase/firestore';
import { atom } from 'recoil';

export interface followingAtom extends DocumentData {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

const defaultFollowingState: followingAtom[] = [];

export const followingAtom = atom<followingAtom[]>({
  key: "followingAtom",
  default: defaultFollowingState,
});
