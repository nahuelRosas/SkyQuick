import { useToast } from "@chakra-ui/react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

import { followingAtom } from "../atoms/followingAtom";
import { principalChatAtom } from "../atoms/principalChatAtom";
import { sessionAtom } from "../atoms/sessionAtom";
import { auth, firestore } from "../firebase/clientApp";
import { RecoverChats } from "./functions/recoverChats";
import { RecoverFollowing } from "./functions/recoverFollowing";
import { RecoverUserData } from "./functions/recoverUserData";

const useRecoveryData = () => {
  const [AuthState] = useAuthState(auth);
  const toast = useToast();

  const RootRecovery = () => {
    RecoverUserData(AuthState);
    RecoverFollowing(AuthState);
    RecoverChats(AuthState);
  };

  const sessionData = useRecoilValue(sessionAtom);

  const recoverData = (type: "UserPhoto") => {
    switch (type) {
      case "UserPhoto":
        return sessionData.user?.photoURL;
      default:
        return undefined;
    }
  };

  const Following = useRecoilValue(followingAtom);
  const followingValidate = async (uid: string) => {
    if (Following.findIndex((following) => following.uid === uid) > -1) {
      return true;
    }
    return false;
  };

  const followUser = async (User: {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
  }) => {
    if (!AuthState) return;
    const docRef = doc(
      firestore,
      "users",
      AuthState.uid,
      "following",
      User.uid
    );
    await setDoc(docRef, {
      uid: User.uid,
      displayName: User.displayName,
      email: User.email,
      photoURL: User.photoURL,
    })
      .then(() => {
        toast({
          title: "Contact added",
          description: "You can now chat with this contact",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error: { message: any }) => {
        toast({
          title: "Error adding contact",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const userChat = useRecoilValue(principalChatAtom);

  const sentMessage = async (message: string) => {
    if (!AuthState || !message.length) return;
    const idMessage = nanoid();
    const docRef = doc(firestore, "users", AuthState.uid, "chats", idMessage);
    await setDoc(
      docRef,
      {
        reciverUID: userChat.uid,
        senderUID: AuthState.uid,
        reciverName: userChat.displayName,
        senderName: AuthState.displayName,
        reciverPhotoURL: userChat.photoURL,
        senderPhotoURL: AuthState.photoURL,
        message: message,
        timestamp: serverTimestamp(),
      },
      { merge: true }
    ).catch((error: { message: string }) => {
      toast({
        title: "Error sending message",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  return {
    RootRecovery,
    recoverData,
    followingValidate,
    followUser,
    sentMessage,
  };
};

export default useRecoveryData;
