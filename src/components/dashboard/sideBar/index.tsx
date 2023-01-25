import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineMenu } from "react-icons/hi";

import Contacts from "./Contacts";
import Head from "./Head";
import user from "./Head/friendsRequest/user";
import EditAbout from "./Head/ownProfile/editAbout";
import EditPhotoProfile from "./Head/ownProfile/editPhotoProfile";

const Sidebar: React.FC = () => {
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();

  if (useBreakpointValue({ base: true, md: false, xl: false })) {
    return (
      <>
        <IconButton
          aria-label="Open Menu"
          colorScheme={"cyan"}
          position="fixed"
          transition="all 0.2s"
          right={8}
          icon={<HiOutlineMenu />}
          fontSize="3xl"
          onClick={() => {
            onOpenDrawer();
          }}
          variant="ghost"
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
              <Head />
              <Contacts />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
  return (
    <Box
      bg={"blackAlpha.900"}
      borderRight="4px"
      borderRightColor={"cyan.300"}
      w={"100%"}
      overflow={"auto"}>
      <Head />
      <Contacts />
    </Box>
  );
};
export default Sidebar;
