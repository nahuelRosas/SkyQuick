import { DocumentData } from 'firebase/firestore';
import { atom } from 'recoil';

import { persistAtomEffect } from './SSRStateAtom';

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
    following?: DocumentData[];
  };
}

const defaultSessionState: sessionAtom = {
  user: null,
};

export const sessionAtom = atom<sessionAtom>({
  key: "sessionAtom",
  default: defaultSessionState,
  effects_UNSTABLE: [persistAtomEffect],
});
