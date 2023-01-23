import { Flex, Text } from "@chakra-ui/react";
import React from "react";

type senderProps = {
  message: string;
};

const sender: React.FC<senderProps> = (Data) => {
  return (
    <Flex
      color="white"
      fontWeight={"bold"}
      bg={"cyan.800"}
      p={4}
      borderRadius={10}
      w={"auto"}
      maxW={"50%"}
      direction="column"
      alignSelf={"flex-end"}>
      <Text fontSize={"lg"} color={"white"} alignSelf={"flex-start"}>
        {Data.message}
      </Text>
      <Text fontSize={"xs"} color={"gray.400"} alignSelf={"flex-end"}>
        {/* {GetTime(Data.timestamp)} */}
      </Text>
    </Flex>
  );
};
export default sender;
