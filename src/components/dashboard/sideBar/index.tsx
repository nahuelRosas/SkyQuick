import { Box } from "@chakra-ui/react";
import React from "react";

import Contacts from "./Contacts";
import Head from "./Head";

const Sidebar: React.FC = () => {
  return (
    <Box
      bg={"blackAlpha.900"}
      borderRight="4px"
      borderRightColor={"red.300"}
      h="full"
      overflow={"auto"}>
      <Head />
      <Contacts />
    </Box>
  );
};
export default Sidebar;
