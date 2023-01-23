import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import React from "react";
import { HiUserGroup } from "react-icons/hi";

import useRecoveryData from "../../../../../hooks/useRecoveryData";
import User from "./user";

const FollowRequest = () => {
  const { recoverData } = useRecoveryData();
  const requestFriends = recoverData("recivedRequestFriends") as DocumentData[];

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      gap={1}
      flexDir={"row"}>
      <Menu
        isLazy
        placement="bottom-end"
        closeOnSelect={false}
        autoSelect={false}
        matchWidth={false}
        gutter={0}
        closeOnBlur={true}>
        <MenuButton
          as={IconButton}
          aria-label="Menu"
          colorScheme={"cyan"}
          icon={
            <>
              <HiUserGroup />
              <Text
                mb={5}
                color={"black"}
                fontSize={"xs"}
                bg={"cyan.500"}
                borderRadius={"full"}
                w={4}
                h={4}
                alignItems={"center"}
                justifyContent={"center"}>
                {requestFriends?.length}
              </Text>
            </>
          }
          fontSize="2xl"
          variant="ghost"
          isRound
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
        />
        <MenuList
          bg="black"
          color="white"
          border="2px solid #2D3748"
          boxShadow="none"
          _focus={{ boxShadow: "none" }}
          _active={{ boxShadow: "none" }}
          _hover={{ boxShadow: "none" }}>
          {requestFriends?.map((user, key) => (
            <User key={key} user={user} />
          ))}
          {requestFriends.length === 0 && (
            <Text color="white" fontSize="lg" textAlign="center" p={5}>
              You don't have any follow request
            </Text>
          )}
        </MenuList>
      </Menu>
    </Flex>
  );
};
export default FollowRequest;
