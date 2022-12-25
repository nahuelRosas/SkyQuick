import { Flex, IconButton, Input, InputGroup, InputRightElement, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

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
          bg={useColorModeValue("blackAlpha.200", "gray.900")}
          color={useColorModeValue("blackAlpha.700", "gray.50")}
          borderRadius="full"
          _placeholder={{ color: "gray.150" }}
        />
        <InputRightElement>
          <IconButton
            aria-label="search"
            icon={<HiOutlineSearch />}
            variant="ghost"
            isRound
          />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};
export default SearchBar;
