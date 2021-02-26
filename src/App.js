import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Login";
import Profile from "./Profile";

const currentUser = async () => {
  const user = await fetch("/users/current", {}).then(async (res) => {
    const j = await res.json();
    return j;
  });
  return user;
};
export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    currentUser().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={user}>
          <Switch>
            <Route path="/paid_for_content">
              <Profile />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}
