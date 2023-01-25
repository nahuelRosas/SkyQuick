import {
  Center,
  Container,
  Flex,
  Grid,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import Chat from "./chat";
import Sidebar from "./sideBar";

const Dashboard = () => {
  return (
    <Container maxW="100%" h="100vh" bg={"blackAlpha.900"}>
      <Container
        bg={"blackAlpha.100"}
        maxW="100%"
        alignSelf="center"
        h="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column">
        <Grid
          w={"100%"}
          templateColumns={useBreakpointValue({
            base: "1fr",
            md: "2fr 3fr",
            xl: "1fr 4fr",
          })}
          h="100vh">
          <Sidebar />
          <Chat />
        </Grid>
      </Container>
    </Container>
  );
};
export default Dashboard;
