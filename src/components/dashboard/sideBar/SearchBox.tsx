import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { HiOutlineSearch, HiX } from "react-icons/hi";

const SearchBoxUI = ({
  currentRefinement,
  isSearchStalled,
  refine,
}: {
  currentRefinement: string;
  isSearchStalled: boolean;
  refine: Function;
}) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      flexDir={"row"}
      w={"95%"}>
      <InputGroup>
        <Input
          placeholder="Search..."
          bg={"gray.900"}
          color={"gray.300"}
          borderRadius="full"
          value={currentRefinement}
          onChange={(event) => refine(event.currentTarget.value)}
          _placeholder={{ color: "gray.500" }}
        />
        <InputRightElement>
          <IconButton
            colorScheme={"cyan"}
            aria-label="search"
            icon={currentRefinement.length > 0 ? <HiX /> : <HiOutlineSearch />}
            onClick={() => {
              if (currentRefinement.length > 0) return refine("");
            }}
            _active={{ bg: "transparent" }}
            _focus={{ bg: "transparent" }}
            _hover={{ bg: "transparent" }}
            fontSize="2xl"
            variant="ghost"
            isRound
          />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

const SearchBox = connectSearchBox(SearchBoxUI);
export default SearchBox;
