import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { principalChatAtom } from "../../../atoms/principalChatAtom";
import useRecoveryData from "../../../hooks/useRecoveryData";

const Head = () => {
  const { displayName, email, photoURL, uid, about } =
    useRecoilValue(principalChatAtom);

  const { deleteFriend } = useRecoveryData();

  const setChat = useSetRecoilState(principalChatAtom);

  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();

  const {
    isOpen: isOpenAlertDialog,
    onOpen: onOpenAlertDialog,
    onClose: onCloseAlertDialog,
  } = useDisclosure();

  return (
    <Flex
      bg={"blackAlpha.900"}
      alignItems="center"
      justifyContent="space-between"
      gap={4}
      p={5}
      w={"100%"}
      h={"auto"}
      onClick={onOpenDrawer}
      _hover={{
        bg: "gray.900",
      }}>
      <>
        <Drawer
          isOpen={isOpenDrawer}
          placement="right"
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
                mb={5}>
                <Avatar
                  borderRadius="full"
                  boxSize="10rem"
                  cursor="pointer"
                  src={photoURL ? photoURL : undefined}
                />
                <Text fontSize={"xl"} fontWeight={"bold"} color={"gray.200"}>
                  {displayName}
                </Text>
                <Text fontSize={"lg"} fontWeight={"light"} color={"gray.200"}>
                  {email}
                </Text>
                <Text fontSize={"lg"} fontWeight={"light"} color={"gray.200"}>
                  UID: {uid}
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
                <Text fontSize={"lg"} fontWeight={"light"} color={"gray.200"}>
                  {about}
                </Text>
              </Flex>
              <Button
                alignSelf="flex-end"
                colorScheme="red"
                variant={"outline"}
                w={"100%"}
                _hover={{
                  bg: "red.900",
                  color: "gray.200",
                  borderColor: "red.900",
                }}
                onClick={() => onOpenAlertDialog()}>
                Delete
              </Button>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <AlertDialog
          isOpen={isOpenAlertDialog}
          leastDestructiveRef={React.useRef(null)}
          onClose={onCloseAlertDialog}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader
                fontSize="lg"
                fontWeight="bold"
                bg={"blackAlpha.900"}
                color={"gray.200"}>
                Delete Friend
              </AlertDialogHeader>

              <AlertDialogBody bg={"blackAlpha.900"} color={"gray.200"}>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter bg={"blackAlpha.900"} color={"gray.200"}>
                <Button
                  ref={React.useRef(null)}
                  onClick={onCloseAlertDialog}
                  color={"black"}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    deleteFriend({
                      uid,
                      displayName,
                      email,
                      photoURL,
                      about,
                    });
                    onCloseAlertDialog();
                    setChat({
                      uid: null,
                      displayName: "",
                      email: "",
                      photoURL: "",
                      about: "",
                    });
                  }}
                  ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
      <Avatar
        borderRadius="full"
        boxSize="4rem"
        cursor="pointer"
        src={photoURL ? photoURL : undefined}
      />

      <Flex
        alignItems="left"
        justifyContent="left"
        flexDir={"column"}
        w={"full"}
        cursor="pointer">
        <Text fontSize={"xl"} fontWeight={"bold"} color={"gray.200"}>
          {displayName}
        </Text>
      </Flex>
    </Flex>
  );
};
export default Head;
