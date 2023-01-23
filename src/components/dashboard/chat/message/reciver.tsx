import { Flex, Text } from "@chakra-ui/react";
import React from "react";

type reciverProps = {
  message: string;
};

const reciver: React.FC<reciverProps> = (Data) => {
  return (
    <Flex
      color="white"
      fontWeight={"bold"}
      bg={"red.800"}
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
        {/* {GetTime(Data.timestamp)} */}
      </Text>
    </Flex>
  );
};
export default reciver;
