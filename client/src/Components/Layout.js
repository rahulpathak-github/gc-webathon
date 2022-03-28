import React from "react";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import DrawerAppBar from "./DawerAppBar";

const drawerWidth = 250;

const Layout = (props) => {
  return (
    <>
      <DrawerAppBar drawerWidth={drawerWidth} />
      <Container
        fluid
        disableGutters
        sx={{
          marginTop: "50px",
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        {props.children}
      </Container>
    </>
  );
};

export default Layout;
