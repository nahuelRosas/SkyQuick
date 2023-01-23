import { atom } from 'recoil';

export interface authModalAtom {
  type: "login" | "signUp" | "resetPassword";
}

const defaultModalState: authModalAtom = {
  type: "login",
};

export const authModalAtom = atom<authModalAtom>({
  key: "authModalAtom",
  default: defaultModalState,
});
