import { Flex, Text } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import React from "react";
import { GetTime } from "../getTime";

type senderProps = {
  message: string;
  timestamp: Timestamp;
};

const sender: React.FC<senderProps> = (Data) => {
  return (
    <Flex
      color="white"
      bg={"cyan.900"}
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
        {GetTime(Data.timestamp)}
      </Text>
    </Flex>
  );
};
export default sender;
