import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineMenu } from "react-icons/hi";

import Contacts from "./Contacts";
import Head from "./Head";

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
          right={10}
          top={8}
          icon={<HiOutlineMenu />}
          fontSize="3xl"
          _active={{
            bg: "cyan.900",
            color: "gray.200",
          }}
          _hover={{
            bg: "cyan.900",
            color: "gray.200",
          }}
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
              <Contacts onCloseDrawer={onCloseDrawer} />
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
