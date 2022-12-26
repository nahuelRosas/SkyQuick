import {
  useColorModeValue,
  Flex,
  Avatar,
  Text,
  Box,
  AvatarBadge,
  Grid,
} from "@chakra-ui/react";
import React from "react";
import { chatDefault } from "../../utils/chatDefault";
import { IconButton } from "@chakra-ui/react";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { HiOutlineDotsVertical, HiOutlineSearch } from "react-icons/hi";
import Head from "./head";
import Body from "./body";
import Footer from "./footer";

type indexProps = {
  PhotoURL?: string;
  Name?: string;
  time?: string;
  isOnline?: boolean;
};

const Index: React.FC<indexProps> = ({ PhotoURL, Name, time, isOnline }) => {
  return (
    <Flex bg={"gray.900"} h="full" w="full" flexDir="column" overflow={"auto"}>
      <Head />
      <Body />
      <Footer />
    </Flex>
  );
};
export default Index;
