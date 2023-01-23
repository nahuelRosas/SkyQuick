import { Avatar, Flex, Grid, IconButton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HiUser, HiUserAdd } from "react-icons/hi";
import { useSetRecoilState } from "recoil";

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
  const { friendsValidate, sendRequestFollow, checkIfItsMe } =
    useRecoveryData();

  if (checkIfItsMe(hit.uid)) return <></>;

  const setChat = useSetRecoilState(principalChatAtom);
  const [isfriends, setIsfriends] = useState(false);

  useEffect(() => {
    friendsValidate(hit.uid).then((res) => setIsfriends(res));
  }, [friendsValidate, hit.uid]);

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
          icon={!isfriends ? <HiUserAdd /> : <HiUser />}
          colorScheme="cyan"
          variant={isfriends ? "solid" : "outline"}
          onClick={() => {
            if (!isfriends) {
              sendRequestFollow(hit);
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
