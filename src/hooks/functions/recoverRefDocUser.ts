import { User } from "firebase/auth";
import { doc } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";

export const recoverRefUser = (AuthState: User | null | undefined) => {
  if (AuthState && AuthState.uid) return doc(firestore, "users", AuthState.uid);
  return null;
};
