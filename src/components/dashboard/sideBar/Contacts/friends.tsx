import { Flex } from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import React from "react";

import useRecoveryData from "../../../../hooks/useRecoveryData";
import ContactOnFriends from "./ContactOnFriends";

const Friends = ({ onCloseDrawer }: { onCloseDrawer?: any }) => {
  const { recoverData } = useRecoveryData();
  const Friends = recoverData("friends") as DocumentData[];
  return (
    <Flex
      w={"100%"}
      h={"auto"}
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      gap={4}
      p={5}
      overflow={"auto"}>
      {Friends?.map(
        (Friends: DocumentData, key: React.Key | null | undefined) => {
          return (
            <ContactOnFriends
              key={key}
              hit={Friends}
              onCloseDrawer={onCloseDrawer}
            />
          );
        }
      )}
    </Flex>
  );
};
export default Friends;
