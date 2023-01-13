import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

import InputAuth from "./components/InputAuth";
import { useAuthValidate } from "./components/useAuthValidate";

const Create: React.FC = () => {
  const {
    changeModalState,
    onSubmitForm,
    onChangeForm,
    onChangeShow,
    returnValueForm,
    returnErrorStateAsString,
    returnErrorStateAsBoolean,
    returnShow,
    returnLoadingState,
    returnStatusButton,
    returnErrorBlocking,
  } = useAuthValidate("create");
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

      <InputAuth
        returnErrorStateBoolean={returnErrorStateAsBoolean}
        returnErrorState={returnErrorStateAsString}
        returnValueForm={returnValueForm}
        onChangeForm={onChangeForm}
        onChangeShow={onChangeShow}
        returnShow={returnShow}
        isDisabled={returnErrorBlocking()}
        type="password"
      />

      <InputAuth
        returnErrorStateBoolean={returnErrorStateAsBoolean}
        returnErrorState={returnErrorStateAsString}
        returnValueForm={returnValueForm}
        onChangeForm={onChangeForm}
        onChangeShow={onChangeShow}
        returnShow={returnShow}
        isDisabled={returnErrorBlocking()}
        type="confirmPassword"
      />

      <Text
        fontSize="sm"
        textAlign={"center"}
        color="red.400"
        fontWeight={700}
        mb={4}
        display={returnErrorStateAsBoolean("otherErrors") ? "block" : "none"}>
        {`${returnErrorStateAsString("otherErrors")}`}
      </Text>

      <Button
        width="100%"
        type="submit"
        colorScheme="cyan"
        variant="solid"
        isLoading={returnLoadingState()}
        isDisabled={returnStatusButton()}
        mb={4}>
        SIGN UP
      </Button>

      <Flex align="center" mt={2} justify="center" color={"gray.400"}>
        <Text>Already have an account?</Text>
        <Text
          ml={1}
          color={"cyan.300"}
          cursor="pointer"
          fontWeight="bold"
          onClick={() => changeModalState("login")}>
          Log In
        </Text>
      </Flex>
    </form>
  );
};
export default Create;
