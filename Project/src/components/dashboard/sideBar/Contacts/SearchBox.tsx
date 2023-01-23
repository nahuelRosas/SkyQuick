import { Flex, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { HiOutlineSearch, HiX } from 'react-icons/hi';
import { connectSearchBox } from 'react-instantsearch-dom';
import { useSetRecoilState } from 'recoil';

import { searchQueryAtom } from '../../../../atoms/searchQueryAtom';

const SearchBoxUI = ({ refine }: { refine: Function }) => {
  const [query, setQuery] = useState("");
  const setValue = useSetRecoilState(searchQueryAtom);
  useEffect(() => {
    setValue({ query: query, state: false, loading: true });
    const timeOutId = setTimeout(() => {
      refine(query);
      setValue({ query: query, state: true, loading: false });
      return;
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [query]);

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      flexDir={"row"}
      w={"100%"}>
      <InputGroup>
        <Input
          placeholder="Search..."
          bg={"gray.900"}
          color={"gray.300"}
          borderRadius="full"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          _placeholder={{ color: "gray.500" }}
        />
        <InputRightElement>
          <IconButton
            colorScheme={"cyan"}
            aria-label="search"
            icon={query.length > 0 ? <HiX /> : <HiOutlineSearch />}
            onClick={() => {
              if (query.length > 0) {
                setValue({ query: "", state: false, loading: false });
                setQuery("");
                return;
              }
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
