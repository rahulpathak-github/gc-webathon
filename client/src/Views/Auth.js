import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import SignupForm from "../Components/SignupForm";
import { useContext, useState } from "react";
import LoginForm from "../Components/LoginForm";
import AuthContext from "../Context/AuthContext";
import { Redirect } from "react-router-dom";

const Auth = (props) => {
  const [authType, setAuthType] = useState(0);
  const { authenticated } = useContext(AuthContext);
  console.log(authenticated);
  const toggleAuthType = () => {
    setAuthType(!authType);
  };
  return (
    <>
      {authenticated === false ? (
        <Dialog open>
          <DialogTitle sx={{ alignSelf: "center" }}>
            {authType ? "Signup" : "Login"}
          </DialogTitle>
          <DialogContent>
            {authType ? (
              <SignupForm toggleAuthType={toggleAuthType} />
            ) : (
              <LoginForm toggleAuthType={toggleAuthType} />
            )}
          </DialogContent>
        </Dialog>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Auth;
