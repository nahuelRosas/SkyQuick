import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import ErrorLens from "./errorLens";

const InputAuth = ({
  type,
  onChangeForm,
  returnValueForm,
  returnErrorStateBoolean,
  returnErrorState,
  onChangeShow,
  returnShow,
  isDisabled,
}: {
  type: "email" | "password" | "confirmPassword";
  onChangeForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  returnValueForm: (type: "email" | "password" | "confirmPassword") => string;
  returnErrorStateBoolean: (
    type: "email" | "password" | "confirmPassword"
  ) => boolean;
  returnErrorState: (type: "email" | "password" | "confirmPassword") =>
    | string
    | {
        [key: string]: {
          title: string;
          status: boolean;
        };
      };

  onChangeShow: (type: "password" | "confirmPassword") => void;
  returnShow: (
    type: "email" | "password" | "confirmPassword",
    button?: boolean | undefined
  ) => boolean | undefined;
  isDisabled: boolean;
}) => {
  const errorString = returnErrorState(type) as string;

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      w="100%"
      h="auto"
      gap={2}
      mb={4}>
      <InputGroup>
        {type !== "email" && (
          <InputRightElement>
            <IconButton
              aria-label="Show password"
              icon={returnShow(type, true) ? <ViewIcon /> : <ViewOffIcon />}
              variant="ghost"
              colorScheme="cyan"
              _hover={{
                bg: "transparent",
              }}
              _active={{
                bg: "transparent",
              }}
              _focus={{
                bg: "transparent",
              }}
              onClick={() => onChangeShow(type)}
            />
          </InputRightElement>
        )}
        <Input
          w="100%"
          isDisabled={isDisabled}
          type={returnShow(type) ? "text" : "password"}
          autoComplete={type}
          name={type}
          isInvalid={returnErrorStateBoolean(type)}
          placeholder={`${type[0].toUpperCase()}${type.slice(1)}`}
          value={returnValueForm(type)}
          required
          onChange={onChangeForm}
        />
      </InputGroup>
      <Text
        fontSize="sm"
        textAlign={"center"}
        color="red.400"
        fontWeight={700}
        display={returnErrorStateBoolean(type) ? "block" : "none"}>
        {type !== "password" && errorString}
      </Text>

      {returnValueForm(type).length > 0 && (
        <ErrorLens
          ErrorRegex={
            type === "password"
              ? (returnErrorState(type) as {
                  [key: string]: {
                    title: string;
                    status: boolean;
                  };
                })
              : {}
          }
        />
      )}
    </Flex>
  );
};
export default InputAuth;
