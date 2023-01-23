import { Flex } from '@chakra-ui/react';
import { DocumentData } from 'firebase/firestore';
import React from 'react';

import useRecoveryData from '../../../../hooks/useRecoveryData';
import ContactOnFriends from './ContactOnFriends';

const Friends = () => {
  const { recoverData } = useRecoveryData();
  const Friends = recoverData("friends") as DocumentData[];
  return (
    <Flex w={"100%"}>
      {Friends?.map(
        (Friends: DocumentData, key: React.Key | null | undefined) => {
          return <ContactOnFriends key={key} hit={Friends} />;
        }
      )}
    </Flex>
  );
};
export default Friends;
