import { Flex, IconButton, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { HiOutlineArrowRightCircle, HiOutlineFaceSmile } from 'react-icons/hi2';

import useRecoveryData from '../../../hooks/useRecoveryData';

const Footer = () => {
  const [input, setInput] = useState("");

  const { sentMessage } = useRecoveryData();
  return (
    <Flex
      bg={"blackAlpha.900"}
      alignItems="center"
      justifyContent="space-between"
      gap={4}
      p={5}
      w={"100%"}
      h={"auto"}
      _hover={{
        bg: "blackAlpha.800",
      }}
      _active={{
        bg: "blackAlpha.800",
      }}
      _focus={{
        bg: "blackAlpha.800",
      }}
      onSubmit={
        input.length > 0
          ? () => {
              sentMessage(input);
              setInput("");
            }
          : () => {}
      }>
      <IconButton
        aria-label="Icons"
        colorScheme={"cyan"}
        icon={<HiOutlineFaceSmile />}
        fontSize="3xl"
        variant="ghost"
        isRound
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
      />

      <Input
        placeholder="Type a message"
        variant="filled"
        size="lg"
        bg={"gray.900"}
        w={"full"}
        h={"auto"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        minH={"3rem"}
        color={"white"}
        _placeholder={{
          color: "cyan.300",
        }}
        _hover={{
          bg: "gray.900",
        }}
        _active={{
          bg: "gray.900",
        }}
        _focus={{
          bg: "gray.800",
        }}
      />
      <IconButton
        aria-label="Icons"
        colorScheme={"cyan"}
        transition="all 0.2s"
        icon={<HiOutlineArrowRightCircle />}
        disabled={input.length > 0 ? false : true}
        color={input.length > 0 ? "cyan.400" : "gray.500"}
        fontSize="3xl"
        onClick={
          input.length > 0
            ? () => {
                sentMessage(input);
                setInput("");
              }
            : () => {}
        }
        variant="ghost"
        isRound
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
      />
    </Flex>
  );
};
export default Footer;
