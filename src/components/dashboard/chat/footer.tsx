import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import {
  HiOutlineArrowRightCircle,
  HiOutlineFaceSmile,
  HiOutlineMicrophone,
  HiOutlinePaperClip,
} from "react-icons/hi2";

type footerProps = {};

const Footer: React.FC<footerProps> = () => {
  const [value, setValue] = React.useState("");
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
      }}>
      <IconButton
        aria-label="Icons"
        colorScheme={"red"}
        icon={<HiOutlineFaceSmile />}
        fontSize="3xl"
        variant="ghost"
        isRound
      />
      <IconButton
        aria-label="Icons"
        colorScheme={"red"}
        icon={<HiOutlinePaperClip />}
        fontSize="3xl"
        variant="ghost"
        isRound
      />
      <Input
        placeholder="Type a message"
        variant="filled"
        size="lg"
        bg={"gray.900"}
        w={"full"}
        h={"auto"}
        onChange={(e) => setValue(e.target.value)}
        minH={"3rem"}
        color={"white"}
        _placeholder={{
          color: "red.300",
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
        colorScheme={"red"}
        transition="all 0.2s"
        icon={
          value.length > 0 ? (
            <HiOutlineArrowRightCircle />
          ) : (
            <HiOutlineMicrophone />
          )
        }
        fontSize="3xl"
        variant="ghost"
        isRound
      />
    </Flex>
  );
};
export default Footer;
