import React from "react";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

const Layout = (props) => {
  return (
    <>
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
