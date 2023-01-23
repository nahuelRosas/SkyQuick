import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

import InputAuth from "./components/InputAuth";
import { useAuthValidate } from "./components/useAuthValidate";

const Sign: React.FC = () => {
  const {
    changeModalState,
    onSubmitForm,
    onChangeForm,
    returnValueForm,
    returnErrorStateAsString,
    returnErrorStateAsBoolean,
    onChangeShow,
    returnShow,
    returnLoadingState,
    returnStatusButton,
    returnErrorBlocking,
  } = useAuthValidate("resetPassword");
  return (
    <form onSubmit={onSubmitForm} style={{ width: "65%" }}>
      <InputAuth
        returnErrorStateBoolean={returnErrorStateAsBoolean}
        returnErrorState={returnErrorStateAsString}
        returnValueForm={returnValueForm}
        onChangeForm={onChangeForm}
        onChangeShow={onChangeShow}
        returnShow={returnShow}
        isDisabled={returnErrorBlocking()}
        type="email"
      />

      <Text
        fontSize="sm"
        textAlign={"center"}
        color="red.400"
        fontWeight={700}
        mb={4}
        display={returnErrorStateAsBoolean("otherErrors") ? "block" : "none"}>
        {`${returnErrorStateAsString(
          "otherErrors"
        )}, wait 5 seconds and try again
        
        `}
      </Text>

      <Button
        width="100%"
        type="submit"
        colorScheme="cyan"
        variant="solid"
        isLoading={returnLoadingState()}
        isDisabled={returnStatusButton()}
        mb={4}>
        Send Reset Link
      </Button>

      <Flex align="center" mt={2} justify="center" color={"gray.400"}>
        <Text>New here?</Text>
        <Text
          ml={1}
          color={"cyan.300"}
          cursor="pointer"
          fontWeight="bold"
          onClick={() => changeModalState("signUp")}>
          Sign Up
        </Text>
      </Flex>
      <Flex align="center" mt={2} justify="center" color={"gray.400"}>
        <Text>Already have an account?</Text>
        <Text
          ml={1}
          color={"cyan.300"}
          cursor="pointer"
          fontWeight="bold"
          onClick={() => changeModalState("login")}>
          Sign In
        </Text>
      </Flex>
    </form>
  );
};
export default Sign;
