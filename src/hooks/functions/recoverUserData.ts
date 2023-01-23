import { useToast } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useEffect } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useSetRecoilState } from "recoil";

import { sessionAtom } from "../../atoms/sessionAtom";
import { recoverRefUser } from "./recoverRefDocUser";

export const RecoverUserData = (AuthState: User | null | undefined) => {
  const setSessionState = useSetRecoilState(sessionAtom);
  const [Data, Loading, Error] = useDocumentData(recoverRefUser(AuthState));
  const toast = useToast();
  useEffect(() => {
    if (Data && !Loading) {
      setSessionState({
        user: {
          uid: Data.uid,
          email: Data.email,
          displayName: Data.displayName,
          photoURL: Data.photoURL,
          emailVerified: Data.emailVerified,
          createdAt: Data.createdAt,
          providerData: Data.providerData,
          updatedAt: Data.updatedAt,
          friends: Data.friends,
          recivedRequestFriends: Data.recivedRequestFriends,
          sentRequestFriends: Data.sentRequestFriends,
          about: Data.about,
        },
      });
    }
    if (Error) {
      toast({
        title: "Error",
        description: "Error recovering user data",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [Data, Loading, Error]);
};
