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
import { chatDefault } from "../../utils/chatDefault";

type HeadProps = {
  PhotoURL?: string;
  Name?: string;
  time?: string;
  isOnline?: boolean;
};

const Head: React.FC<HeadProps> = ({ PhotoURL, Name, time, isOnline }) => {
  const _Name = Name ? Name : chatDefault.Name;
  const Name_ = _Name.length > 20 ? _Name.slice(0, 20) + "..." : _Name;

  const _isOnline = isOnline ? isOnline : chatDefault.isOnline;

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
        src={PhotoURL ? PhotoURL : chatDefault.PhotoURL}>
        <AvatarBadge
          boxSize="0.9em"
          bg={_isOnline ? "green.500" : "gray.500"}
        />
      </Avatar>
      <Flex
        alignItems="left"
        justifyContent="left"
        flexDir={"column"}
        w={"full"}
        cursor="pointer">
        <Text fontSize={"xl"} fontWeight={"bold"} color={"gray.200"}>
          {Name_}
        </Text>
        <Text mt={2} fontSize={"md"} fontWeight={"normal"} color={"gray.200"}>
          {time ? time : "Click here for Contact Info"}
        </Text>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="right"
        flexDir={"row"}
        w={"full"}
        cursor="pointer"
        gap={4}>
        <IconButton
          aria-label="Search"
          icon={<HiOutlineSearch />}
          fontSize={"2xl"}
          colorScheme="red"
          color={"red.400"}
          variant="ghost"
          isRound
        />
        <IconButton
          aria-label="Call Segun"
          icon={<HiOutlineVideoCamera />}
          fontSize={"2xl"}
          colorScheme="red"
          variant="ghost"
          isRound
        />
        <IconButton
          aria-label="Menu"
          icon={<HiOutlineDotsVertical />}
          fontSize={"2xl"}
          colorScheme="red"
          variant="ghost"
          isRound
        />
      </Flex>
    </Flex>
  );
};
export default Head;
