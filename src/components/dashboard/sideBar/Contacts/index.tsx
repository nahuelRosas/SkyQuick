import { Flex } from "@chakra-ui/react";
import algoliasearch from "algoliasearch/lite";
import React from "react";
import { InstantSearch } from "react-instantsearch-dom";
import { useRecoilValue } from "recoil";

import { searchQueryAtom } from "../../../../atoms/searchQueryAtom";
import Following from "./friends";
import InfiniteHits from "./InfiniteHits";
import Loading from "./Loading";
import SearchBox from "./SearchBox";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCHKEY as string
);
const Contacts = ({ onCloseDrawer }: { onCloseDrawer?: any }) => {
  const { query, state, loading } = useRecoilValue(searchQueryAtom);
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
        {state && query.length > 0 && !loading && <InfiniteHits />}
        {loading && <Loading />}
        {state && query.length === 0 && (
          <Following onCloseDrawer={onCloseDrawer} />
        )}
      </InstantSearch>
    </Flex>
  );
};
export default Contacts;
