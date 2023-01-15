import {
  Avatar,
  Flex,
  Grid,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import { HiUser, HiUserAdd } from "react-icons/hi";
import { useSetRecoilState, useRecoilValue } from "recoil";

import { chatState } from "../../../../atoms/chatState";
import { firestore } from "../../../../firebase/clientApp";
import { sessionAtom } from "../../../authentication/atomsAuth/sessionAtom";
import { useState, useEffect } from "react";

const ContactOnSearch = ({
  hit,
}: {
  hit: {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
  };
}) => {
  const setChat = useSetRecoilState(chatState);
  const { user } = useRecoilValue(sessionAtom);
  const toast = useToast();
  const addContact = async () => {
    const docRef = doc(firestore, "users", user.uid, "following", hit.uid);
    await setDoc(docRef, {
      uid: hit.uid,
      displayName: hit.displayName,
      email: hit.email,
      photoURL: hit.photoURL,
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
      .catch((error) => {
        toast({
          title: "Error adding contact",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (
      user.following.findIndex((following) => following.uid === hit.uid) > -1
    ) {
      setIsFollowing(true);
    }
  }, [user.following]);

  return (
    <Grid
      cursor={"pointer"}
      bg={"gray.800"}
      w={"100%"}
      h={"auto"}
      maxH={"6rem"}
      templateColumns={"auto auto"}
      justifyContent={"center"}
      alignItems={"center"}
      _hover={{ bg: "gray.800" }}
      gap={2}
      p={2}>
      <Flex
        textAlign={"left"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={"row"}
        w={"100%"}
        h={"auto"}
        bg={"transpatent"}
        gap={2}
        overflow={"hidden"}
        onClick={() =>
          setChat({
            uid: hit.uid,
            displayName: hit.displayName,
            email: hit.email,
            photoURL: hit.photoURL,
          })
        }>
        <Avatar
          left={0}
          h={"auto"}
          ml={2}
          borderRadius="full"
          boxSize="3.5rem"
          src={hit.photoURL}
        />
        <Flex
          alignItems="left"
          justifyContent="left"
          flexDir={"column"}
          overflow={"hidden"}
          w={"100%"}>
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            color={"gray.400"}
            textOverflow={"ellipsis"}
            noOfLines={1}
            overflow={"hidden"}>
            {hit.displayName}
          </Text>
          <Text
            fontSize={"md"}
            fontWeight={"normal"}
            color={"gray.500"}
            textOverflow={"ellipsis"}
            noOfLines={1}
            overflow={"hidden"}>
            {hit.email}
          </Text>
        </Flex>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDir={"column"}
        right={0}
        h={"auto"}>
        <IconButton
          aria-label="Call Segun"
          size="sm"
          fontSize={"2xl"}
          icon={!isFollowing ? <HiUserAdd /> : <HiUser />}
          colorScheme="cyan"
          variant={isFollowing ? "solid" : "outline"}
          onClick={() => {
            if (!isFollowing) {
              addContact();
              return;
            }
          }}
          _hover={{ bg: "cyan.500", color: "black" }}
          _active={{ bg: "cyan.500", color: "black" }}
          _focus={{ bg: "cyan.500", color: "black" }}
        />
      </Flex>
    </Grid>
  );
};

export default ContactOnSearch;
