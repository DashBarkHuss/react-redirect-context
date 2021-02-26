import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Login";
import Profile from "./Profile";

const currentUser = async () => {
  const user = await fetch("/users/current", {}).then(async (res) => {
    const userJson = await res.json();
    return userJson;
  });
  return user;
};
export default function App() {
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh) {
      currentUser().then((user) => {
        setUser(user);
        setRefresh(false);
      });
    }
  }, [refresh]);

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={user}>
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <Login setRefresh={setRefresh} />
            </Route>
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}
