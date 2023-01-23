import {
  Flex,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React from "react";
import {
  HiOutlineSearch,
  HiOutlineVideoCamera,
  HiOutlineDotsVertical,
} from "react-icons/hi";
import { useRecoilState, useRecoilValue } from "recoil";
import { principalChatAtom } from "../../../atoms/principalChatAtom";
import { chatDefault } from "../../../utils/chatDefault";

const Head = () => {
  const { displayName, email, photoURL, uid } =
    useRecoilValue(principalChatAtom);

  return (
    <Flex
      bg={"blackAlpha.900"}
      alignItems="center"
      justifyContent="space-between"
      gap={4}
      p={5}
      w={"100%"}
      h={"auto"}
      _hover={{
        bg: "gray.900",
      }}>
      <Avatar
        borderRadius="full"
        boxSize="4rem"
        cursor="pointer"
        src={photoURL ? photoURL : undefined}>
        {/* <AvatarBadge
          boxSize="0.9em"
          bg={_isOnline ? "green.500" : "gray.500"}
        /> */}
      </Avatar>

      <Flex
        alignItems="left"
        justifyContent="left"
        flexDir={"column"}
        w={"full"}
        cursor="pointer">
        <Text fontSize={"xl"} fontWeight={"bold"} color={"gray.200"}>
          {displayName}
        </Text>
      </Flex>
    </Flex>
  );
};
export default Head;
