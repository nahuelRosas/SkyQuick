import { Avatar, Flex, Grid, Text } from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import { useSetRecoilState } from "recoil";

import { principalChatAtom } from "../../../../atoms/principalChatAtom";

const ContactOnFollowing = ({
  hit,
  onCloseDrawer,
}: {
  hit: DocumentData;
  onCloseDrawer?: any;
}) => {
  const setChat = useSetRecoilState(principalChatAtom);

  return (
    <Grid
      cursor={"pointer"}
      bg={"gray.800"}
      w={"100%"}
      h={"auto"}
      templateColumns={"auto auto"}
      justifyContent={"center"}
      alignItems={"center"}
      _hover={{ bg: "gray.800" }}
      gap={2}
      p={2}>
      <Flex
        textAlign={"left"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={"row"}
        w={"100%"}
        h={"auto"}
        bg={"transpatent"}
        gap={5}
        overflow={"hidden"}
        onClick={() => {
          setChat({
            uid: hit.uid,
            displayName: hit.displayName,
            email: hit.email,
            photoURL: hit.photoURL,
            about: hit.about,
          });
          if (onCloseDrawer) onCloseDrawer();
        }}>
        <Avatar
          left={0}
          h={"auto"}
          ml={2}
          borderRadius="full"
          boxSize="3.5rem"
          src={hit.photoURL}
        />
        <Flex
          alignItems="left"
          justifyContent="left"
          flexDir={"column"}
          overflow={"hidden"}
          w={"100%"}>
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            color={"gray.400"}
            textOverflow={"ellipsis"}
            noOfLines={1}
            overflow={"hidden"}>
            {hit.displayName}
          </Text>
          <Text
            fontSize={"md"}
            fontWeight={"normal"}
            color={"gray.500"}
            textOverflow={"ellipsis"}
            noOfLines={1}
            overflow={"hidden"}>
            {hit.email}
          </Text>
        </Flex>
      </Flex>
    </Grid>
  );
};

export default ContactOnFollowing;
