import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';

export default function PayForAccess() {
  const [next, setNext] = useState(false);
  // const [user, setUser] = useState(false);

  const getCurrentUser = async () => {
    const user = await fetch('/users/current', {}).then(async (res) => {
      const j = await res.json();
      return j;
    });
    return user;
  };

  const currentUser = useContext(UserContext);

  return (
    <div>
      Logged In:{' '}
      {!currentUser || currentUser.message === 'not logged in' ? 'No One' : currentUser.username}{' '}
      <br></br>
      <button
        onClick={() => {
          fetch('/pay', { method: 'POST' }).then((res) => {
            // if (res.status === 201) {
            //   getCurrentUser().then((user) => {
            //     setUser(user);
            //     setNext(true);
            //   });
            // }
            setNext(true);
          });
        }}
      >
        Pay For Access
      </button>
      {next && <Redirect to="/paid_for_content" />}
    </div>
  );
}
