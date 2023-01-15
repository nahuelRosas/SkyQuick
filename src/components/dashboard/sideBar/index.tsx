import { Box } from "@chakra-ui/react";
import React from "react";

import Contacts from "./Contacts";
import Head from "./Head";

const Sidebar: React.FC = () => {
  return (
    <Box
      bg={"blackAlpha.900"}
      borderRight="4px"
      borderRightColor={"cyan.300"}
      w={"100%"}
      overflow={"auto"}>
      <Head />
      <Contacts />
    </Box>
  );
};
export default Sidebar;
