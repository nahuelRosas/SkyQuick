import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";

import { authModalAtom } from "../../atoms/authModalAtom";
import Create from "./create";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./resetPassword";
import Sign from "./sign";

const Auth: React.FC = () => {
  const { type } = useRecoilValue(authModalAtom);

  return (
    <Flex
      bg="gray.800"
      color="white"
      w="100%"
      h="100%"
      align="center"
      justify="center"
      direction="column"
      borderRadius={8}
      boxShadow="lg"
      display="flex">
      <Flex direction={"column"} align="center" justify="center" w={"95%"}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          {type === "login" && "Login"}
          {type === "signUp" && "Sign Up"}
          {type === "resetPassword" && "Reset Password"}
        </Text>
        {type !== "resetPassword" && (
          <>
            <OAuthButtons />
            <Text fontSize="lg" fontWeight="bold" m={4}>
              Or
            </Text>
          </>
        )}
        {type === "login" && <Sign />}
        {type === "signUp" && <Create />}
        {type === "resetPassword" && <ResetPassword />}
      </Flex>
    </Flex>
  );
};
export default Auth;
