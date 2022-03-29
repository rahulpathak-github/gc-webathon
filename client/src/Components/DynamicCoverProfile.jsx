import { Box, Button, Container } from "@mui/material";
import UserDescription from "./UserDescription";
import EditIcon from "@mui/icons-material/Edit";
import UserProfileTabs from "./UserProfileTabs";
import DynamicUserDescription from "./DynamicUserDescription";
import DynamicUserProfileTabs from "./DynamicUserProfileTabs";

function DynamicCoverProfile(user) {
  return (
    <Container disableGutters>
      <img
        width="100%"
        height="250px"
        src={"https://wallpaperaccess.com/full/143763.jpg"}
        alt="background"
      ></img>
      <Box
        sx={{
          position: "relative",
          top: "-50px",
          float: "right",
          paddingX: 2,
        }}
      >
        <Button variant="contained">
          <EditIcon />
        </Button>
      </Box>
      <Box sx={{ position: "relative", top: "-100px", left: "20px" }}>
        <img
          width="150px"
          src={
            "https://pbs.twimg.com/profile_images/1166471091663122433/5ULjGFJS_400x400.jpg"
          }
          style={{ borderRadius: "50%", border: "5px solid white" }}
          alt="profile"
        />
      </Box>
      {/* <DynamicUserDescription {...user} /> */}
      <DynamicUserDescription {...user} />
      <DynamicUserProfileTabs {...user} />{" "}
      {/* changes in feed, followers, following */}
    </Container>
  );
}

export default DynamicCoverProfile;
