import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

export default function Login(props) {
  const [next, setNext] = useState(false);

  const { user, setUser, getUser } = useContext(UserContext);

  return (
    <div>
      Logged In:{" "}
      {!user || user.message === "not logged in" ? "No One" : user.username}{" "}
      <br></br>
      <button
        onClick={() => {
          fetch("/login", { method: "POST" }).then(async (res) => {
            if (res.status === 201) {
              setUser(await getUser());
              setNext(true);
            }
          });
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          fetch("/logout", { method: "DELETE" }).then(async (res) => {
            if (res.status === 201) {
              setUser(await getUser());
            }
          });
        }}
      >
        Logout
      </button>
      {next && <Redirect to="/profile" />}
    </div>
  );
}
