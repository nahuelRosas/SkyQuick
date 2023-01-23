import { MenuItem, Flex, Avatar, IconButton, Text } from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import React from "react";
import { HiCheck, HiX } from "react-icons/hi";
import useRecoveryData from "../../../../../hooks/useRecoveryData";

const User = ({ user }: { user: DocumentData }) => {
  const { acceptRequest, deleteRequest } = useRecoveryData();

  return (
    <Flex
      key={user.uid}
      alignItems="center"
      justifyContent="space-between"
      gap={3}
      flexDir={"row"}
      w={"100%"}
      h={"100%"}
      p={4}
      _hover={{ bg: "black" }}
      bg="black"
      color="white">
      <Avatar src={user?.photoURL} />
      <Text
        cursor={"default"}
        fontSize={"lg"}
        fontWeight={"light"}
        _hover={{ bg: "black" }}
        bg="black"
        color="white"
        isTruncated>
        {user.displayName}
      </Text>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        gap={1}
        flexDir={"row"}>
        <IconButton
          aria-label="Accept"
          color={"green.300"}
          icon={<HiCheck />}
          fontSize="2xl"
          variant="ghost"
          onClick={() => acceptRequest(user)}
          isRound
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
        />
        <IconButton
          aria-label="Decline"
          color={"red.300"}
          icon={<HiX />}
          fontSize="2xl"
          variant="ghost"
          isRound
          onClick={() => deleteRequest(user)}
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
        />
      </Flex>
    </Flex>
  );
};
export default User;
