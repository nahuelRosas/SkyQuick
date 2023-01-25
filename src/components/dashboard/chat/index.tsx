import { Avatar, Button, Center, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { principalChatAtom } from "../../../atoms/principalChatAtom";
import { logos } from "../../../utils/logos";

import Body from "./body";
import Footer from "./footer";
import Head from "./head";
import useRecoveryData from "../../../hooks/useRecoveryData";

const Index = () => {
  const [isFriend, setIsFriend] = useState(false);
  const [sentRequestFriends, setSentRequestFriends] = useState(false);
  const { friendsValidate, friends } = useRecoveryData();
  const { displayName, email, photoURL, uid, about } =
    useRecoilValue(principalChatAtom);

  const {
    loadingRequestFriends,
    sendRequestFriends,
    sentRequestFriendsValidate,
    cancelRequestFriends,
  } = friends;

  useEffect(() => {
    friendsValidate(uid as string).then((res) => setIsFriend(res));
    sentRequestFriendsValidate(uid as string).then((res) =>
      setSentRequestFriends(res)
    );
  }, [friendsValidate, uid, sentRequestFriendsValidate]);

  return (
    <Flex bg={"gray.900"} h="full" w="100%" flexDir="column" overflow={"auto"}>
      {!uid && (
        <Center
          bg={"blackAlpha.100"}
          alignItems="center"
          justifyContent="center"
          gap={4}
          h={"100%"}
          p={5}>
          <Image
            src={logos.light}
            alt="SkyQuick Logo"
            w="50%"
            h="50%"
            objectFit="contain"
          />
        </Center>
      )}

      {uid && isFriend && (
        <>
          <Head />
          <Body />
          <Footer />
        </>
      )}

      {uid && !isFriend && (
        <Center
          bg={"blackAlpha.100"}
          alignItems="center"
          justifyContent="center"
          gap={4}
          h={"100%"}
          flexDirection="column"
          p={5}>
          <Flex
            alignItems="center"
            justifyContent="center"
            gap={4}
            p={5}
            direction="column"
            w={"100%"}
            h={"auto"}
            bg={"blackAlpha.900"}
            mb={5}>
            <Avatar
              borderRadius="full"
              boxSize="20rem"
              cursor="normal"
              src={photoURL ? photoURL : undefined}
            />
            <Text fontSize={"2xl"} fontWeight={"bold"} color={"gray.200"}>
              {displayName}
            </Text>
            <Text fontSize={"md"} fontWeight={"light"} color={"gray.200"}>
              {email}
            </Text>
            <Text fontSize={"md"} fontWeight={"light"} color={"gray.200"}>
              UID: {uid}
            </Text>
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="center"
            gap={4}
            p={5}
            direction="column"
            w={"100%"}
            h={"auto"}
            mb={5}
            bg={"blackAlpha.900"}>
            <Text
              fontSize={"lg"}
              alignSelf="flex-start"
              fontWeight={"bold"}
              color={"gray.200"}>
              About
            </Text>
            <Text fontSize={"lg"} fontWeight={"light"} color={"gray.200"}>
            {about ? about : "This user has not yet added an about."}
            </Text>
          </Flex>
          <Center>
            <Button
              alignSelf="flex-end"
              colorScheme="cyan"
              display={sentRequestFriends || isFriend ? "none" : "inline-flex"}
              variant={"outline"}
              isLoading={loadingRequestFriends}
              w={"100%"}
              onClick={() => {
                if (!isFriend) {
                  sendRequestFriends({
                    displayName,
                    email,
                    photoURL,
                    uid,
                    about,
                  });
                  return;
                }
              }}
              _hover={{
                bg: "cyan.900",
                color: "gray.200",
                borderColor: "cyan.900",
              }}>
              Send Friend Request
            </Button>
            <Button
              alignSelf="flex-end"
              colorScheme="red"
              display={sentRequestFriends && !isFriend ? "inline-flex" : "none"}
              variant={"outline"}
              isLoading={loadingRequestFriends}
              w={"100%"}
              onClick={() => {
                if (!isFriend) {
                  cancelRequestFriends({
                    displayName,
                    email,
                    photoURL,
                    uid,
                    about,
                  });
                  return;
                }
              }}
              _hover={{
                bg: "red.900",
                color: "gray.200",
                borderColor: "red.900",
              }}
              _active={{
                bg: "red.900",
                color: "gray.200",
                borderColor: "red.900",
              }}>
              Cancel Friend Request
            </Button>
          </Center>
          <Flex
            alignItems="center"
            justifyContent="center"
            gap={1}
            p={5}
            direction="column"
            w={"100%"}
            h={"auto"}
            bg={"blackAlpha.900"}
            mt={5}>
            <Text
              fontSize={"md"}
              alignSelf="flex-start"
              fontWeight={"bold"}
              color={"gray.200"}>
              Note:
            </Text>
            <Text
              fontSize={"xs"}
              alignSelf="center"
              fontWeight={"light"}
              color={"gray.200"}>
              You can only send message to your friends, first you need to add
              them as a friend. When your friend accept your request, you will
              be able to send messages to them.
            </Text>
          </Flex>
        </Center>
      )}
    </Flex>
  );
};

export default Index;
