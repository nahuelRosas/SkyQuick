import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";

import { useAuthValidate } from "./components/useAuthValidate";

const OAuthButtons: React.FC = () => {
  const { SignWithGoogle } = useAuthValidate("AuthButtons");
  const { error, isLoading, onClick, errorBoolean } = SignWithGoogle;

  return (
    <Flex direction="column" align="center" width={"65%"}>
      <Button
        width="100%"
        colorScheme="green"
        variant="outline"
        isLoading={isLoading()}
        onClick={() => onClick()}
        _hover={{ bg: "green.400", color: "black" }}
        _active={{ bg: "green.400", color: "black" }}
        _focus={{ bg: "green.400", color: "black" }}
        mt={4}
        leftIcon={<FaGoogle />}>
        Continue with Google
      </Button>
      <Text
        fontSize="sm"
        color="red.400"
        fontWeight={700}
        mt={1}
        textAlign="center"
        display={errorBoolean() ? "block" : "none"}>
        {error()}
      </Text>
    </Flex>
  );
};
export default OAuthButtons;
