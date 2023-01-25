import { Button, Flex, Text } from "@chakra-ui/react";
import { connectInfiniteHits } from "react-instantsearch-dom";

import ContactOnSearch from "./ContactOnSearch";

const InfiniteHits = ({
  hits,
  hasPrevious,
  refinePrevious,
  hasMore,
  refineNext,
  onCloseDrawer,
}: {
  hits: {
    displayName: string;
    email: string;
    photoURL: string;
    uid: string;
    about: string;
  }[];
  hasPrevious: boolean;
  refinePrevious: () => void;
  hasMore: boolean;
  refineNext: () => void;
  onCloseDrawer?: any;
}) => {
  if (hits.length === 0)
    return (
      <Flex
        direction={"column"}
        w={"100%"}
        h={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        bg={"gray.800"}
        pt={4}
        pb={4}
        mt={5}
        mb={5}
        boxShadow={"md"}
        _hover={{ bg: "gray.800" }}
        _active={{ bg: "gray.800" }}
        _focus={{ bg: "gray.800" }}
        transition={"all 0.2s ease-in-out"}>
        <Text
          fontSize={"xl"}
          fontWeight={"bold"}
          color={"gray.400"}
          textAlign={"center"}>
          No results found
        </Text>
      </Flex>
    );

  return (
    <Flex direction={"column"} w={"100%"}>
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
          hit: {
            displayName: string;
            email: string;
            photoURL: string;
            uid: string;
            about: string;
          },
          key: string | number
        ) => (
          <ContactOnSearch key={key} hit={hit} />
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
