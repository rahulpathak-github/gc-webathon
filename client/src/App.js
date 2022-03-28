import { Route, Switch } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import Feed from "./Views/Feed";
import Profile from "./Views/Profile";
import Layout from "./Components/Layout";

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Layout>
          <Feed />
        </Layout>
      </Route>
      <Route exact path="/profile">
        <Layout>
          <Profile />
        </Layout>
      </Route>
    </Switch>
  );
};

export default App;
