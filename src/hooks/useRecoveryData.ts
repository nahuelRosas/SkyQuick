import { useToast } from "@chakra-ui/react";
import {
  arrayUnion,
  doc,
  DocumentData,
  serverTimestamp,
  setDoc,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

import { principalChatAtom } from "../atoms/principalChatAtom";
import { sessionAtom } from "../atoms/sessionAtom";
import { auth, firestore } from "../firebase/clientApp";
import { RecoverChats } from "./functions/recoverChats";
import { RecoverUserData } from "./functions/recoverUserData";

const useRecoveryData = () => {
  const [AuthState] = useAuthState(auth);
  const toast = useToast();
  const { user } = useRecoilValue(sessionAtom);
  const userChat = useRecoilValue(principalChatAtom);

  const RootRecovery = () => {
    RecoverUserData(AuthState);
    RecoverChats(AuthState);
  };

  const recoverData = (
    type: "UserPhoto" | "recivedRequestFriends" | "friends"
  ) => {
    switch (type) {
      case "UserPhoto":
        return user?.photoURL;
      case "recivedRequestFriends":
        return user?.recivedRequestFriends || [];
      case "friends":
        return user?.friends || [];

      default:
        return undefined;
    }
  };

  const friendsValidate = async (uid: string) => {
    if (!user || !user.friends) return false;
    if (user.friends.findIndex((user) => user.uid === uid) !== -1) {
      return true;
    }
    return false;
  };

  const sendRequestFollow = async (User: {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
    about: string;
  }) => {
    if (!AuthState) return;

    await updateDoc(doc(firestore, "users", AuthState.uid), {
      sentRequestFriends: arrayUnion({
        uid: User.uid,
        displayName: User.displayName,
        email: User.email,
        photoURL: User.photoURL,
        about: User.about,
      }),
    })
      .then(async () => {
        await updateDoc(doc(firestore, "users", User.uid), {
          recivedRequestFriends: arrayUnion({
            uid: AuthState.uid,
            displayName: AuthState.displayName,
            email: AuthState.email,
            photoURL: user?.photoURL,
            about: user?.about,
          }),
        }).then(() => {
          toast({
            title: "Request sent",
            description:
              "You will be able to talk to this user when they accept your request",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        });
      })
      .catch((error: { message: string }) => {
        toast({
          title: "Error sending request",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

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

  const checkIfItsMe = (uid: string) => {
    if (AuthState && AuthState.uid === uid) return true;
    return false;
  };

  const acceptRequest = async (User: DocumentData) => {
    if (!AuthState) return;
    await updateDoc(doc(firestore, "users", AuthState.uid), {
      friends: arrayUnion({
        uid: User.uid,
        displayName: User.displayName,
        email: User.email,
        photoURL: User.photoURL,
        about: User.about,
      }),
      recivedRequestFriends: arrayRemove({
        uid: User.uid,
        displayName: User.displayName,
        email: User.email,
        photoURL: User.photoURL,
        about: User.about,
      }),
    })
      .then(async () => {
        await updateDoc(doc(firestore, "users", User.uid), {
          friends: arrayUnion({
            uid: AuthState.uid,
            displayName: AuthState.displayName,
            email: AuthState.email,
            photoURL: user?.photoURL,
            about: user?.about,
          }),
          sentRequestFriends: arrayRemove({
            uid: AuthState.uid,
            displayName: AuthState.displayName,
            email: AuthState.email,
            photoURL: user?.photoURL,
            about: user?.about,
          }),
        }).then(() => {
          toast({
            title: "Request accepted",
            description: "You can now talk to this user",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        });
      })
      .catch((error: { message: string }) => {
        toast({
          title: "Error accepting request",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const deleteRequest = async (User: DocumentData) => {
    if (!AuthState) return;
    await updateDoc(doc(firestore, "users", AuthState.uid), {
      recivedRequestFriends: arrayRemove({
        uid: User.uid,
        displayName: User.displayName,
        email: User.email,
        photoURL: User.photoURL,
        about: User.about,
      }),
    })
      .then(async () => {
        await updateDoc(doc(firestore, "users", User.uid), {
          sentRequestFriends: arrayRemove({
            uid: AuthState.uid,
            displayName: AuthState.displayName,
            email: AuthState.email,
            photoURL: user?.photoURL,
            about: user?.about,
          }),
        }).then(() => {
          toast({
            title: "Request deleted",
            duration: 3000,
            isClosable: true,
            status: "success",
          });
        });
      })
      .catch((error: { message: string }) => {
        toast({
          title: "Error deleting request",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const deleteFriend = async (User: DocumentData) => {
    if (!AuthState) return;
    await updateDoc(doc(firestore, "users", AuthState.uid), {
      friends: arrayRemove({
        uid: User.uid,
        displayName: User.displayName,
        email: User.email,
        photoURL: User.photoURL,
        about: User.about,
      }),
    })
      .then(async () => {
        await updateDoc(doc(firestore, "users", User.uid), {
          friends: arrayRemove({
            uid: AuthState.uid,
            displayName: AuthState.displayName,
            email: AuthState.email,
            photoURL: user?.photoURL,
            about: user?.about,
          }),
        }).then(() => {
          toast({
            title: "Friend deleted",
            duration: 3000,
            isClosable: true,
            status: "success",
          });
        });
      })
      .catch((error: { message: string }) => {
        toast({
          title: "Error deleting friend",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return {
    deleteRequest,
    acceptRequest,
    RootRecovery,
    recoverData,
    friendsValidate,
    sendRequestFollow,
    sentMessage,
    checkIfItsMe,
    deleteFriend,
  };
};

export default useRecoveryData;
