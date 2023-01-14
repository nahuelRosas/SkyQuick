import { Avatar, Flex, Grid, Text } from "@chakra-ui/react";

const Contact = ({
  hit,
}: {
  hit: {
    displayName: string;
    email: string;
    photoURL: string;
  };
}) => {
  return (
    <Grid
      cursor={"pointer"}
      bg={"gray.900"}
      templateColumns="1fr 6fr 1fr"
      gap={4}
      p={5}
      w={"100%"}
      h={"auto"}
      textAlign={"left"}
      alignItems={"center"}
      justifyContent={"center"}
      _hover={{ bg: "gray.800" }}>
      <Avatar borderRadius="full" boxSize="3rem" src={hit.photoURL} />
      <Flex
        alignItems="left"
        justifyContent="left"
        flexDir={"column"}
        w={"full"}>
        <Text fontSize={"xl"} fontWeight={"bold"} color={"gray.400"}>
          {hit.displayName}
        </Text>
        <Text fontSize={"md"} fontWeight={"normal"} color={"gray.500"}>
          {hit.email}
        </Text>
      </Flex>
    </Grid>
  );
};

export default Contact;
