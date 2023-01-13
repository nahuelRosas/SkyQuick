import React from "react";
import { Spinner, Container, Center } from "@chakra-ui/react";
type indexProps = {};

const index: React.FC<indexProps> = () => {
  return (
    <Center
      h="100vh"
      w="100vw"
      bg="gray.800"
      position="absolute"
      top="0"
      left="0">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="red.400"
        size="xl"
      />
    </Center>
  );
};
export default index;
