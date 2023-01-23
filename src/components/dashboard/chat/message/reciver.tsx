import { Flex, Text, Avatar } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import React from "react";
import { GetTime } from "../getTime";

type reciverProps = {
  message: string;
  timestamp: Timestamp;
};

const reciver: React.FC<reciverProps> = (Data) => {
  return (
    <Flex
      color="white"
      bg={"red.900"}
      p={4}
      borderRadius={10}
      w={"auto"}
      direction="column"
      maxW={"50%"}
      alignSelf={"flex-start"}>
      <Text fontSize={"lg"} color={"white"} alignSelf={"flex-start"}>
        {Data.message}
      </Text>
      <Text fontSize={"xs"} color={"gray.400"} alignSelf={"flex-end"}>
        {GetTime(Data.timestamp)}
      </Text>
    </Flex>
  );
};
export default reciver;
