import { useToast } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSetRecoilState } from "recoil";

import { followingAtom } from "../../atoms/followingAtom";
import { recoverRefCollection } from "./recoverRefCollection";

export const RecoverFollowing = (AuthState: User | null | undefined) => {
  const setFollowingState = useSetRecoilState(followingAtom);

  const [Data, Loading, Error] = useCollectionData(
    recoverRefCollection(AuthState, "Following")
  );
  const toast = useToast();

  useEffect(() => {
    if (Data && !Loading) {
      setFollowingState(
        Data.map((doc) => {
          return {
            uid: doc.uid,
            email: doc.email,
            displayName: doc.displayName,
            photoURL: doc.photoURL,
          };
        })
      );
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
