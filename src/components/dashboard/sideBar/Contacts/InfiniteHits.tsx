import { Button, Flex } from "@chakra-ui/react";
import { connectInfiniteHits } from "react-instantsearch-dom";
import Contact from "./Contact";

const InfiniteHits = ({
  hits,
  hasPrevious,
  refinePrevious,
  hasMore,
  refineNext,
}) => {
  return (
    <Flex direction={"column"}>
      <Button
        onClick={refinePrevious}
        disabled={!hasPrevious}
        display={hasPrevious ? "block" : "none"}
        colorScheme={"cyan"}
        variant={"outline"}
        _hover={{ bg: "gray.800" }}
        _active={{ bg: "transparent" }}
        _focus={{ bg: "transparent" }}
        mb={5}
        mt={5}>
        Show Previous
      </Button>

      {hits.map(
        (
          hit: { displayName: string; email: string; photoURL: string },
          key: string | number
        ) => (
          <Contact key={key} hit={hit} />
        )
      )}

      <Button
        onClick={refineNext}
        disabled={!hasMore}
        display={hasMore ? "block" : "none"}
        colorScheme={"cyan"}
        variant={"outline"}
        _hover={{ bg: "gray.800" }}
        _active={{ bg: "transparent" }}
        _focus={{ bg: "transparent" }}
        mb={5}
        mt={5}>
        Show More
      </Button>
    </Flex>
  );
};

const CustomInfiniteHits = connectInfiniteHits(InfiniteHits);
export default CustomInfiniteHits;
