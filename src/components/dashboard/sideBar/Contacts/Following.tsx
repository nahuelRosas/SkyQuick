import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";

import { followingAtom } from "../../../../atoms/followingAtom";
import ContactOnFollowing from "./ContactOnFollowing";

const Following = () => {
  const users = useRecoilValue(followingAtom);

  return (
    <Flex w={"100%"}>
      {users?.map((following, key) => {
        return <ContactOnFollowing key={key} hit={following} />;
      })}
    </Flex>
  );
};
export default Following;
