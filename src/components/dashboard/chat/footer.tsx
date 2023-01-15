import { Flex, IconButton, Input } from "@chakra-ui/react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import {
  HiOutlineArrowRightCircle,
  HiOutlineFaceSmile,
  HiOutlineMicrophone,
  HiOutlinePaperClip,
} from "react-icons/hi2";
import { useRecoilValue } from "recoil";

import { chatState } from "../../../atoms/chatState";
import { firestore } from "../../../firebase/clientApp";
import { sessionAtom } from "../../authentication/atomsAuth/sessionAtom";

const Footer = () => {
  const [input, setInput] = useState("");
  const { user } = useRecoilValue(sessionAtom);
  const userChat = useRecoilValue(chatState);

  const sendMessage = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const idMessage = nanoid();
    const docRef = doc(firestore, `users/${user.uid}/chats/${idMessage}`);
    await setDoc(
      docRef,
      {
        reciverUID: userChat.uid,
        message: input,
        timestamp: serverTimestamp(),
        reciverPhotoURL: userChat.photoURL,
        reciverName: userChat.displayName,
        senderUID: user.uid,
        senderPhotoURL: user.photoURL,
        senderName: user.displayName,
      },
      { merge: true }
    )
      .then(() => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    setInput("");
  };

  return (
    <Flex
      bg={"blackAlpha.900"}
      alignItems="center"
      justifyContent="space-between"
      gap={4}
      borderRadius={"xl"}
      p={5}
      w={"100%"}
      h={"auto"}
      _hover={{
        bg: "blackAlpha.800",
      }}
      _active={{
        bg: "blackAlpha.800",
      }}
      _focus={{
        bg: "blackAlpha.800",
      }}
      onSubmit={sendMessage}>
      <IconButton
        aria-label="Icons"
        colorScheme={"cyan"}
        icon={<HiOutlineFaceSmile />}
        fontSize="3xl"
        variant="ghost"
        isRound
      />
      <IconButton
        aria-label="Icons"
        colorScheme={"cyan"}
        icon={<HiOutlinePaperClip />}
        fontSize="3xl"
        variant="ghost"
        isRound
      />
      <Input
        placeholder="Type a message"
        variant="filled"
        size="lg"
        bg={"gray.900"}
        w={"full"}
        h={"auto"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        minH={"3rem"}
        color={"white"}
        _placeholder={{
          color: "cyan.300",
        }}
        _hover={{
          bg: "gray.900",
        }}
        _active={{
          bg: "gray.900",
        }}
        _focus={{
          bg: "gray.800",
        }}
      />
      <IconButton
        aria-label="Icons"
        colorScheme={"cyan"}
        transition="all 0.2s"
        icon={
          input.length > 0 ? (
            <HiOutlineArrowRightCircle />
          ) : (
            <HiOutlineMicrophone />
          )
        }
        onClick={sendMessage}
        fontSize="3xl"
        variant="ghost"
        isRound
      />
    </Flex>
  );
};
export default Footer;
