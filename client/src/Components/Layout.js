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
          width: "100%",
        }}
      >
        {props.children}
      </Container>
    </>
  );
};

export default Layout;
