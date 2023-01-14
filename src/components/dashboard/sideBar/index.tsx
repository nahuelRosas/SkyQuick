import { Avatar, Box, Flex, Grid, Text } from "@chakra-ui/react";
import algoliasearch from "algoliasearch/lite";
import React from "react";
import { Hits, InstantSearch } from "react-instantsearch-dom";
import { useRecoilValue } from "recoil";

import { sessionAtom } from "../../authentication/atomsAuth/sessionAtom";
import BlockIcons from "./blockIcons";
import HitsComponent from "./HitsComponent";
import SearchBox from "./SearchBox";

const Sidebar: React.FC = () => {
  const { user } = useRecoilValue(sessionAtom);
  const searchClient = algoliasearch(
    "5CYQ8ZVRBS",
    "2cddb4410d40e8074a5ade6394fec72a"
  );

  return (
    <Box
      bg={"blackAlpha.900"}
      borderRight="4px"
      borderRightColor={"red.300"}
      h="full"
      overflow={"auto"}>
      <Flex
        alignItems="center"
        m={5}
        justifyContent="space-between"
        gap={5}
        flexDir={"row"}>
        <Avatar borderRadius="full" boxSize="3rem" src={user?.photoURL} />
        <BlockIcons />
      </Flex>
      <Flex direction="column" gap={4} alignItems={"center"}>
        <InstantSearch searchClient={searchClient} indexName={"prod_Users"}>
          <SearchBox />
          <Hits hitComponent={HitsComponent} />
        </InstantSearch>
      </Flex>
    </Box>
  );
};
export default Sidebar;
