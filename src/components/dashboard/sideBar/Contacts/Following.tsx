import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { sessionAtom } from "../../../authentication/atomsAuth/sessionAtom";
import ContactOnFollowing from "./ContactOnFollowing";

const Following = () => {
  const { user } = useRecoilValue(sessionAtom);

  return (
    <Flex w={"100%"}>
      {user?.following.map((following, key) => {
        return <ContactOnFollowing key={key} hit={following} />;
      })}
    </Flex>
  );
};
export default Following;
