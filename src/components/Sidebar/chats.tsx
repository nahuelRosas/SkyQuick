import React from "react";
import {
  Container,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  useColorModeValue,
  Flex,
  Heading,
  Button,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Textarea,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  StackDivider,
  SimpleGrid,
  Center,
  useBreakpointValue,
  useColorMode,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  GridItem,
  Avatar,
  HStack,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { chatDefault } from "../../utils/chatDefault";
type chatsProps = {
  PhotoURL?: string;
  Name?: string;
  lastMessage?: string;
  time?: string;
};

const Chats: React.FC<chatsProps> = ({ PhotoURL, Name, lastMessage, time }) => {
  const _Message = lastMessage ? lastMessage : chatDefault.lastMessage;
  const Message =
    _Message.length > 50 ? _Message.slice(0, 50) + "..." : _Message;

  const _Name = Name ? Name : chatDefault.Name;
  const Name_ = _Name.length > 20 ? _Name.slice(0, 20) + "..." : _Name;


  return (
    <Grid
      bg={useColorModeValue("gray.200", "gray.900")}
      templateColumns="1fr 6fr 1fr"
      gap={4}
      p={5}
      w={"100%"}
      h={"auto"}>
      <Avatar
        borderRadius="full"
        boxSize="4rem"
        src={PhotoURL ? PhotoURL : chatDefault.PhotoURL}
      />
      <Flex
        alignItems="left"
        justifyContent="left"
        flexDir={"column"}
        w={"full"}>
        <Text
          fontSize={"xl"}
          fontWeight={"bold"}
          color={useColorModeValue("gray.700", "gray.200")}>
          {Name_}
        </Text>
        <Text
          fontSize={"md"}
          fontWeight={"normal"}
          color={useColorModeValue("gray.700", "gray.200")}>
          {Message}
        </Text>
      </Flex>
      <Text
        fontSize={"md"}
        fontWeight={"normal"}
        color={useColorModeValue("gray.700", "gray.200")}>
        {time ? time : "18/12/2022"}
      </Text>
    </Grid>
  );
};
export default Chats;
