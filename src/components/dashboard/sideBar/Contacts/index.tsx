import { Flex } from "@chakra-ui/react";
import algoliasearch from "algoliasearch/lite";
import React from "react";
import { Hits, InstantSearch } from "react-instantsearch-dom";
import { useRecoilValue } from "recoil";

import { searchQueryState } from "../../../../atoms/searchQueryState";
import Contact from "./Contact";
import InfiniteHits from "./InfiniteHits";
import Loading from "./Loading";
import SearchBox from "./SearchBox";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCHKEY
);
const Contacts = () => {
  const { query, state, loading } = useRecoilValue(searchQueryState);

  return (
    <Flex
      direction="column"
      gap={4}
      alignItems={"center"}
      overflowX={"hidden"}
      w={"100%"}
      p={4}>
      <InstantSearch searchClient={searchClient} indexName={"prod_Users"}>
        <SearchBox />
        {state && query.length > 0 && <InfiniteHits />}
        {loading && <Loading />}
      </InstantSearch>
    </Flex>
  );
};
export default Contacts;
