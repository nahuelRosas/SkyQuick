import { Container, Grid, Image } from "@chakra-ui/react";
import React from "react";

import Auth from "../components/authentication/AuthUI";
import { logos } from "../utils/logos";

const Authenticate: React.FC = () => {
  return (
    <Container maxW="100%" h="100vh" bg={"blackAlpha.900"}>
      <Container maxW="95%" h="100vh" bg={"blackAlpha.400"} minH="100vh">
        <Grid
          templateColumns={{ base: "1fr", md: "25% 75%" }}
          gap={5}
          h="100vh">
          <Image
            src={logos.light}
            alt="SkyQuick Logo"
            w="100%"
            h="100%"
            objectFit="contain"
          />
          <Auth />
        </Grid>
      </Container>
    </Container>
  );
};
export default Authenticate;
