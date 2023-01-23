import { User } from "firebase/auth";
import { collection } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";

export const recoverRefCollection = (
  AuthState: User | null | undefined,
  type: "Following" | "Chats"
) => {
  if (!AuthState || !AuthState.uid) return null;
  return collection(firestore, "users", AuthState.uid, type.toLowerCase());
};
