import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { HiCheck, HiX } from "react-icons/hi";

const ErrorLens = ({
  ErrorRegex,
}: {
  ErrorRegex: {
    [key: string]: {
      title: string;
      status: boolean;
    };
  };
}) => {
  return (
    <Flex direction="column" align="center" justify="center" w="100%" h="auto">
      {Object.keys(ErrorRegex).map((key: string, index) => {
        return (
          <Flex key={index} align="center" justify="center" w="100%" h="auto">
            <Text
              fontSize="xl"
              color={
                ErrorRegex[key as keyof typeof ErrorRegex].status
                  ? "green.400"
                  : "red.400"
              }>
              {ErrorRegex[key as keyof typeof ErrorRegex].status ? (
                <HiCheck />
              ) : (
                <HiX />
              )}
            </Text>
            <Text fontSize="md" ml={2} color="gray.400">
              {ErrorRegex[key as keyof typeof ErrorRegex].title}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
};
export default ErrorLens;
