import React from "react";
import Box from "@mui/material/Box";
import DrawerAppBar from "./DawerAppBar";
import { Container } from "@mui/material";
import { Fab } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { useState } from "react";
import FormDialog from "./FormDialog";
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
          width: { md: `calc(100% - ${drawerWidth * 2 + 100}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        {props.children}
      </Container>
    </>
  );
};

export default Layout;
