import { Box, Typography, Grid } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import FemaleIcon from "@mui/icons-material/Female";
import CakeIcon from "@mui/icons-material/Cake";
import AuthContext from "../Context/AuthContext";
import { useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";

// handle, email, number of followers, dob, gender\

function UserDescription() {
  const { authenticated, currentUser } = useContext(AuthContext);

  function UserGenderIcon(UserGender) {
    switch (UserGender) {
      case "F":
        return <FemaleIcon />;
      case "O":
        return <TransgenderIcon />;
      default:
        return <MaleIcon />;
    }
  }

  console.log(currentUser);
  return (
    <>
      {authenticated ? (
        <Box
          position="relative"
          top={"-100px"}
          //   display="flex"
          alignItems="center"
          marginLeft="20px"
          flexWrap="wrap"
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Typography variant="h6">{currentUser.handle}</Typography>
            </Grid>
            <Grid item xs={6}>
              <item>
                <AlternateEmailIcon /> {currentUser.email}
              </item>
            </Grid>
            <Grid item xs={6}>
              <item>
                <UserGenderIcon UserGender={currentUser.gender} />
                {currentUser.gender}{" "}
              </item>
            </Grid>
            <Grid item xs={6}>
              <item>
                <CakeIcon /> {currentUser.dob}
              </item>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default UserDescription;
