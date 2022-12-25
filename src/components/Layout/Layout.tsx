import React from "react";
import Sidebar from "../Sidebar/sidebar";
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

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container maxW="100%" bg={useColorModeValue("gray.50", "blackAlpha.700")}>
      <Container
        maxW="95%"
        bg={useColorModeValue("gray.50", "blackAlpha.50")}
        minH="100vh">
        <Sidebar />
        <Flex minH="100vh" bg={useColorModeValue("blackAlpha.200", "gray.900")}>
          {children}
        </Flex>
      </Container>
    </Container>
  );
};

export default Layout;
