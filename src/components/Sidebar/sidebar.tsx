import { Avatar, Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";

import { logos } from "../../utils/logos";
import BlockIcons from "./blockIcons";
import SearchBar from "./searchBar";
import Chats from "./chats";

const Sidebar: React.FC = () => {
  return (
    <Box
      bg={useColorModeValue("blackAlpha.200", "blackAlpha.700")}
      borderRight="4px"
      borderRightColor={useColorModeValue("blackAlpha.400", "gray.700")}
      w={{ base: "full", md: "25%" }}
      pos="fixed"
      h="full"
      overflow={"auto"}>
      <Flex
        alignItems="center"
        m={5}
        justifyContent="space-between"
        gap={5}
        flexDir={"row"}>
        <Avatar
          borderRadius="full"
          boxSize="4rem"
          src={useColorModeValue(logos.dark, logos.light)}
        />
        <BlockIcons />
      </Flex>
      <SearchBar />
      <Chats />
    </Box>
  );
};
export default Sidebar;
