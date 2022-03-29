import { Route, Switch } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Feed from "./Views/Feed";
import Profile from "./Views/Profile";
import Layout from "./Components/Layout";
import Notifications from "./Views/Notifications";
import Auth from "./Views/Auth";
import AuthContext from "./Context/AuthContext";
import DynamicProfile from "./Views/DynamicProfile";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkAuthentication = () => {
    if (!localStorage.getItem("jwt")) {
      setLoading(false);
      return;
    }
    axios
      .get("http://localhost:5000/api/auth/isLoggedIn", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        setCurrentUser(res.data.data.user);
        setAuthenticated(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const updateAuthData = (isAuthenticated, user) => {
    setCurrentUser(user);
    setAuthenticated(isAuthenticated);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: authenticated,
        currentUser: currentUser,
        updateAuthData: updateAuthData,
      }}
    >
      <Switch>
        <Route exact path="/">
          <Layout>{!loading ? <Feed /> : null}</Layout>
        </Route>
        <Route exact path="/profile">
          <Layout>{!loading ? <Profile /> : null}</Layout>
        </Route>
        <Route exact path="/profile/:id">
          <Layout>{!loading ? <DynamicProfile /> : null}</Layout>
        </Route>
        <Route exact path="/notifications">
          <Layout>{!loading ? <Notifications /> : null}</Layout>
        </Route>
        <Route exact path="/auth">
          {/* <Layout> */}
          {!loading ? <Auth /> : null}
          {/* </Layout> */}
        </Route>
      </Switch>
    </AuthContext.Provider>
  );
};

export default App;
