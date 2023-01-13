import { Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";

type bodyProps = {};

const Body: React.FC<bodyProps> = () => {
  return (
    <Flex
      bg={"blackAlpha.100"}
      alignItems="center"
      justifyContent="space-between"
      gap={4}
      p={5}
      w={"100%"}
      h={"100%"}></Flex>
  );
};
export default Body;
