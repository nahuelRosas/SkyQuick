import { Container, Grid } from "@chakra-ui/react";
import React from "react";
import Chat from "./chat";
import Sidebar from "./sideBar";

type DashboardProps = {};

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <Container maxW="100%" h="100vh" bg={"blackAlpha.900"}>
      <Container maxW="95%" h="100vh" bg={"blackAlpha.100"} minH="100vh">
        <Grid templateColumns={"auto 75%"} h="100vh">
          <Sidebar />
          <Chat />
        </Grid>
      </Container>
    </Container>
  );
};
export default Dashboard;
