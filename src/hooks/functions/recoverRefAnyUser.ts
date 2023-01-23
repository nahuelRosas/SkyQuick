import { User } from "firebase/auth";
import { doc } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";

export const recoverRefAnyUser = (
  AuthState: User | null | undefined,
  UID: string
) => {
  if (AuthState && AuthState.uid)
    return doc(firestore, "users", AuthState.uid, "following", UID);
  return null;
};
