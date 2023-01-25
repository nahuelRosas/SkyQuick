import { Container, Grid, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import Chat from "./chat";
import Sidebar from "./sideBar";

const Dashboard = () => {
  return (
    <Container maxW="100%" h="100vh" bg={"blackAlpha.900"}>
      <Container
        maxW={useBreakpointValue({ base: "100%", md: "95%", xl: "95%" })}
        h="100vh"
        bg={"blackAlpha.100"}
        minH="100vh">
        <Grid
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
