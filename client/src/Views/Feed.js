import {
  Box,
  Grid,
  Typography,
  IconButton,
  Stack,
  Container,
} from "@mui/material";
import Post from "../Components/Post";
const Feed = (props) => {
  return (
    // <Container
    //   sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    // >
    <Box
      width={"95%"}
      sx={{
        display: "flex",
        justifyContent: "center",
        marginX: "auto",
      }}
    >
      <Stack marginTop={"30px"} width={"100%"}>
        <Post />
        <Post />
        <Post />
        <Post />
      </Stack>
    </Box>
    // </Container>
  );
};

export default Feed;
