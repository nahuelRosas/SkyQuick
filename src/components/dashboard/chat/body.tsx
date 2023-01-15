import { Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { chatState } from "../../../atoms/chatState";
import { sessionAtom } from "../../authentication/atomsAuth/sessionAtom";

type bodyProps = {};

const Body: React.FC<bodyProps> = () => {
  const { user } = useRecoilValue(sessionAtom);
  const userChat = useRecoilValue(chatState);

  
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
