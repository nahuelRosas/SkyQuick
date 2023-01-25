import {
  Avatar,
  Button,
  Center,
  Flex,
  Grid,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HiUser, HiUserAdd, HiUserRemove } from "react-icons/hi";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { principalChatAtom } from "../../../../atoms/principalChatAtom";
import useRecoveryData from "../../../../hooks/useRecoveryData";

const ContactOnSearch = ({
  hit,
}: {
  hit: {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
    about: string;
  };
}) => {
  const setChat = useSetRecoilState(principalChatAtom);
  const [isFriend, setIsFriend] = useState(false);
  const [sentRequestFriends, setSentRequestFriends] = useState(false);
  const { friendsValidate, friends, checkIfItsMe } = useRecoveryData();

  const {
    loadingRequestFriends,
    sendRequestFriends,
    sentRequestFriendsValidate,
    cancelRequestFriends,
  } = friends;

  useEffect(() => {
    friendsValidate(hit.uid).then((res) => setIsFriend(res));
    sentRequestFriendsValidate(hit.uid).then((res) =>
      setSentRequestFriends(res)
    );
  }, [friendsValidate, hit.uid, sentRequestFriendsValidate]);

  const isMe = checkIfItsMe(hit.uid);
  if (isMe) return null;

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
            about: hit.about,
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
      <Center>
        <IconButton
          alignSelf="flex-end"
          colorScheme="cyan"
          display={sentRequestFriends || isFriend ? "none" : "inline-flex"}
          variant={"outline"}
          isLoading={loadingRequestFriends}
          w={"100%"}
          onClick={() => {
            if (!isFriend) {
              sendRequestFriends({
                displayName: hit.displayName,
                email: hit.email,
                photoURL: hit.photoURL,
                uid: hit.uid,
                about: hit.about,
              });
              return;
            }
          }}
          _hover={{
            bg: "cyan.900",
            color: "gray.200",
            borderColor: "cyan.900",
          }}
          aria-label={"Add Friend"}
          icon={<HiUserAdd />}
          fontSize={"2xl"}
        />
        <IconButton
          alignSelf="flex-end"
          colorScheme="red"
          aria-label="Remove Friend"
          display={sentRequestFriends && !isFriend ? "inline-flex" : "none"}
          variant={"outline"}
          isLoading={loadingRequestFriends}
          w={"100%"}
          onClick={() => {
            if (!isFriend) {
              cancelRequestFriends({
                displayName: hit.displayName,
                email: hit.email,
                photoURL: hit.photoURL,
                uid: hit.uid,
                about: hit.about,
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
          }}
          icon={<HiUserRemove />}
          fontSize={"2xl"}
        />
        <IconButton
          alignSelf="flex-end"
          colorScheme="green"
          aria-label="isFriend"
          display={isFriend ? "inline-flex" : "none"}
          variant={"solid"}
          isLoading={loadingRequestFriends}
          w={"100%"}
          _hover={{
            bg: "green.900",
            color: "gray.200",
            borderColor: "green.900",
          }}
          _active={{
            bg: "green.900",
            color: "gray.200",
            borderColor: "green.900",
          }}
          icon={<HiUser />}
          fontSize={"2xl"}
        />
      </Center>
    </Grid>
  );
};

export default ContactOnSearch;
