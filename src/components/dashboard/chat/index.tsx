import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";

import { currentChatAtom } from "../../../atoms/currentChat";

type indexProps = {
  PhotoURL?: string;
  Name?: string;
  time?: string;
  isOnline?: boolean;
};

const Index: React.FC<indexProps> = ({ PhotoURL, Name, time, isOnline }) => {
  const [chat, setChat] = useRecoilState(currentChatAtom);

  return (
    <Flex bg={"gray.900"} h="full" w="full" flexDir="column" overflow={"auto"}>
      {/* <Head />
      <Body />
      <Footer /> */}
    </Flex>
  );
};
export default Index;
