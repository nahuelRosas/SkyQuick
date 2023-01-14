import { Avatar, Flex } from '@chakra-ui/react';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { sessionAtom } from '../../../authentication/atomsAuth/sessionAtom';
import BlockIcons from './blockIcons';

const index = () => {
  const { user } = useRecoilValue(sessionAtom);

  return (
    <Flex
      alignItems="center"
      m={5}
      justifyContent="space-between"
      gap={5}
      flexDir={"row"}>
      <Avatar borderRadius="full" boxSize="3rem" src={user?.photoURL} />
      <BlockIcons />
    </Flex>
  );
};
export default index;
