import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";

import { chatsAtom } from "../../../atoms/chatsAtom";
import MessageComponent from "./message";

const Body = () => {
  const messages = useRecoilValue(chatsAtom);

  const scrollToBottom = () => {
    const element = document.getElementById("chat");
    element?.scrollTo(0, element.scrollHeight);
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      gap={4}
      direction="column-reverse"
      w={"100%"}
      overflowY={"hidden"}
      h={"100%"}>
      <Flex
        id="chat"
        direction="column"
        w={"100%"}
        h={"auto"}
        overflowX={"hidden"}
        gap={4}
        p={5}>
        {messages?.map((data, key) => (
          <MessageComponent key={key} Data={data} />
        ))}
      </Flex>
    </Flex>
  );
};
export default Body;
