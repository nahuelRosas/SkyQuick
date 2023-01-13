import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

const SearchBar: React.FC = () => {
  return (
    <Flex
      alignItems="center"
      m={5}
      justifyContent="space-between"
      gap={5}
      flexDir={"row"}>
      <InputGroup>
        <Input
          placeholder="Search"
          bg={"gray.900"}
          color={"gray.50"}
          borderRadius="full"
          _placeholder={{ color: "red.300" }}
        />
        <InputRightElement>
          <IconButton
            colorScheme={"red"}
            aria-label="search"
            icon={<HiOutlineSearch />}
            fontSize="2xl"
            variant="ghost"
            isRound
          />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};
export default SearchBar;
