import { Center, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { principalChatAtom } from "../../../atoms/principalChatAtom";
import { logos } from "../../../utils/logos";

import Body from "./body";
import Footer from "./footer";
import Head from "./head";

const Index = () => {
  const { uid } = useRecoilValue(principalChatAtom);

  return (
    <Flex bg={"gray.900"} h="full" w="100%" flexDir="column" overflow={"auto"}>
      {uid && (
        <>
          <Head />
          <Body />
          <Footer />
        </>
      )}
      {!uid && (
        <Center
          bg={"blackAlpha.100"}
          alignItems="center"
          justifyContent="center"
          gap={4}
          h={"100%"}
          p={5}>
          <Image
            src={logos.light}
            alt="SkyQuick Logo"
            w="50%"
            h="50%"
            objectFit="contain"
          />
        </Center>
      )}
    </Flex>
  );
};
export default Index;
