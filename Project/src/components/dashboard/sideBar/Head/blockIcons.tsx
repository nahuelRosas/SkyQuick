import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { HiOutlineDotsVertical } from 'react-icons/hi';

import { auth } from '../../../../firebase/clientApp';

type blockIconsProps = {};

const BlockIcons: React.FC<blockIconsProps> = () => {
  const [signOut] = useSignOut(auth);
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
          icon={<HiOutlineDotsVertical />}
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
          <MenuItem
            _hover={{ bg: "black" }}
            bg="black"
            onClick={() => {
              signOut();
            }}>
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
export default BlockIcons;
