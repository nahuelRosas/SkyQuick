import { useToast } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSetRecoilState } from "recoil";

import { chatsAtom } from "../../atoms/chatsAtom";
import { recoverRefCollection } from "./recoverRefCollection";

export const RecoverChats = (AuthState: User | null | undefined) => {
  const setChatsState = useSetRecoilState(chatsAtom);

  const [Data, Loading, Error] = useCollectionData(
    recoverRefCollection(AuthState, "Chats")
  );
  const toast = useToast();

  const orderMessage = async (messageData: DocumentData[]) => {
    return messageData.sort((a, b) => a.timestamp - b.timestamp);
  };

  useEffect(() => {
    if (Data && !Loading) {
      orderMessage(Data).then((res) => {
        setChatsState(
          res.map((doc) => {
            return {
              message: doc.message,
              reciverName: doc.reciverName,
              reciverPhotoURL: doc.reciverPhotoURL,
              reciverUID: doc.reciverUID,
              senderName: doc.senderName,
              senderPhotoURL: doc.senderPhotoURL,
              senderUID: doc.senderUID,
              timestamp: doc.timestamp,
            };
          })
        );
      });
    } else if (Error) {
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
