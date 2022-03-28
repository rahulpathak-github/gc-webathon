import { Box, Typography, Grid } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ManIcon from "@mui/icons-material/Man";
import CakeIcon from "@mui/icons-material/Cake";

// handle, email, number of followers, dob, gender

function UserDescription() {
  return (
    <Box
      position="relative"
      top={"-100px"}
      //   display="flex"
      alignItems="center"
      marginLeft="20px"
      flexWrap="wrap"
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Typography variant="h6">{"Hrithik Roshan"}</Typography>
        </Grid>
        <Grid item xs={6}>
          <item>
            <AlternateEmailIcon /> {"hrithik@gmail.com"}
          </item>
        </Grid>
        <Grid item xs={6}>
          <item>
            <ManIcon /> {"Gender"}
          </item>
        </Grid>
        <Grid item xs={6}>
          <item>
            <CakeIcon /> {"DOB"}
          </item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserDescription;
