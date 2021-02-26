import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PayForAccess from './PayForAccess';
import PaidContent from './PaidContent';

const currentUser = async () => {
  const user = await fetch('/users/current', {}).then(async (res) => {
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
          <div>
            <button
              onClick={() => {
                fetch('/login', {
                  method: 'POST',
                });
              }}
            >
              login
            </button>
          </div>
          <Switch>
            <Route path="/paid_for_content">
              <PaidContent />
            </Route>
            <Route path="/">
              <PayForAccess />
            </Route>
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}
