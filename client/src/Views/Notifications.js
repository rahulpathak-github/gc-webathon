import Alert from "@mui/material/Alert";
import { Container, Stack } from "@mui/material";
import AuthContext from "../Context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Notifications = (props) => {
  const { authenticated, currentUser } = useContext(AuthContext);
  // let notifications = [];
  let check = true;

  const notificationCategory = (value) => {
    // if (value.category === "post") ;
    // else if (value.category === "user") ;
    // else ;
    if (value.category === "user")
      return <Link to={`/profile/${value.categoryId}`}> value.body </Link>;
  };

  return (
    <Container sx={{ mt: "100px" }}>
      <Stack spacing="10px">
        {authenticated &&
          currentUser.notifications.map((e) => (
            <Alert variant="outlined" severity={e.hasRead}>
              {notificationCategory(e)}
            </Alert>
          ))}
        <Alert severity="warning">
          {" "}
          {/* for sample */}
          This is a success alert — check it out!
        </Alert>
      </Stack>
    </Container>
  );
};

export default Notifications;
