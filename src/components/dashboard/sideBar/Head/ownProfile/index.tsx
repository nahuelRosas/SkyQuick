import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import React from "react";
import useRecoveryData from "../../../../../hooks/useRecoveryData";
import EditPhotoProfile from "./editPhotoProfile";
import { IconButton } from "@chakra-ui/react";
import { HiPencil } from "react-icons/hi";
import EditAbout from "./editAbout";

const OwnProfile = () => {
  const { recoverData } = useRecoveryData();
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const user = recoverData("userInformation") as DocumentData;

  return (
    <>
      <Avatar
        borderRadius="full"
        boxSize="3rem"
        cursor="pointer"
        onClick={onOpenDrawer}
        src={recoverData("UserPhoto") as string}
      />
      <Drawer
        isOpen={isOpenDrawer}
        placement="left"
        onClose={onCloseDrawer}
        size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color={"gray.200"} bg={"cyan.900"} />
          <DrawerBody bg={"blackAlpha.900"}>
            <Flex
              alignItems="center"
              justifyContent="center"
              gap={4}
              p={5}
              direction="column"
              w={"100%"}
              h={"auto"}
              onClick={onOpenDrawer}
              bg={"blackAlpha.900"}
              mt={5}
              mb={5}>
              <EditPhotoProfile
                isOpen={isOpenModal}
                onOpen={onOpenModal}
                onClose={onCloseModal}
                user={user}
              />
              <Text fontSize={"xl"} fontWeight={"bold"} color={"gray.200"}>
                {user?.displayName}
              </Text>
              <Text fontSize={"lg"} fontWeight={"light"} color={"gray.200"}>
                {user?.email}
              </Text>
              <Text fontSize={"lg"} fontWeight={"light"} color={"gray.200"}>
                UID: {user?.uid}
              </Text>
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="center"
              gap={4}
              p={5}
              direction="column"
              w={"100%"}
              h={"auto"}
              mb={5}
              onClick={onOpenDrawer}
              bg={"blackAlpha.900"}>
              <Text
                fontSize={"lg"}
                alignSelf="flex-start"
                fontWeight={"bold"}
                color={"gray.200"}>
                About
              </Text>
              <EditAbout about={user?.about} />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default OwnProfile;
