import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
  return (
    <Center w="100vw" mt={"4rem"} position="relative" top="0" left="0">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="cyan.400"
        size="xl"
      />
    </Center>
  );
};
export default Loading;
