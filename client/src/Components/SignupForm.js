import {
  ButtonGroup,
  Container,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { Box } from "@mui/material";
import { useState, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import axios from "../AxiosInstance";
import Spinner from "./Spinner";

const SignupForm = (props) => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { updateAuthData } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const signupHandler = () => {
    // console.log("skfhakjsfhkajsdh");
    setLoading(true);
    axios
      .post(`api/auth/signup`, {
        handle: username,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("jwt", res.data.jwt);
        updateAuthData(true, res.data.data.user);
        setLoading(false);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
        updateAuthData(false, null);
      });
  };

  return (
    <form>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // paddingX: 2,
          // paddingY: 2,
        }}
      >
        <TextField
          label="Username"
          variant="filled"
          required
          margin="normal"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          variant="filled"
          type="email"
          required
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          required
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            // paddingX: 2,
            // paddingY: 2,
          }}
        >
          {loading === true ? (
            <Spinner />
          ) : (
            <Button size="large" variant="contained" onClick={signupHandler}>
              SignUp
            </Button>
          )}
        </Box>
        <Typography>
          {"Already a member? "}
          <Link href="#" onClick={props.toggleAuthType}>
            Login
          </Link>
        </Typography>
      </Box>
    </form>
  );
};

export default SignupForm;
