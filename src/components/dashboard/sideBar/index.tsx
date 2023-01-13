import { Avatar, Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";

import { logos } from "../../../utils/logos";
import BlockIcons from "./blockIcons";
import SearchBar from "./searchBar";
import Chats from "./chats";

const Sidebar: React.FC = () => {
  return (
    <Box
      bg={"blackAlpha.900"}
      borderRight="4px"
      borderRightColor={"red.300"}
      h="full"
      overflow={"auto"}>
      <Flex
        alignItems="center"
        m={5}
        justifyContent="space-between"
        gap={5}
        flexDir={"row"}>
        <Avatar borderRadius="full" boxSize="4rem" src={logos.light} />
        <BlockIcons />
      </Flex>
      <SearchBar />
      <Chats />
    </Box>
  );
};
export default Sidebar;
