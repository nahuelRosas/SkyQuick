import { Flex } from '@chakra-ui/react';
import React from 'react';

import useRecoveryData from '../../../../hooks/useRecoveryData';
import BlockIcons from './blockIcons';
import FriendRequest from './friendsRequest';
import OwnProfile from './ownProfile';

const index = () => {
  const { recoverData } = useRecoveryData();

  return (
    <Flex
      alignItems="center"
      m={5}
      justifyContent="space-between"
      gap={5}
      flexDir={"row"}>
      <OwnProfile />
      <Flex
        alignItems="center"
        justifyContent="space-between"
        gap={3}
        flexDir={"row"}>
        <FriendRequest />
        <BlockIcons />
      </Flex>
    </Flex>
  );
};
export default index;
