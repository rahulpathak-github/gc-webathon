import { Box, Grid, Typography, IconButton } from "@mui/material";
import CoverProfileX from "../Components/CoverProfileX";
// import
const Profile = (props) => {
  return (
    <Box>
      {/* <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item> */}
      {/* <Typography variant="h6">Profile</Typography> */}
      <CoverProfileX />
      {/* rest part */}
      {/* </Grid> */}
      {/* </Grid>
      </Box>
      <Box height="92vh" sx={{ overflowY: "scroll" }}></Box> */}
    </Box>
  );
};

export default Profile;
