import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

export default function Login() {
  const [next, setNext] = useState(false);

  const currentUser = useContext(UserContext);

  return (
    <div>
      Logged In:{" "}
      {!currentUser || currentUser.message === "not logged in"
        ? "No One"
        : currentUser.username}{" "}
      <br></br>
      <button
        onClick={() => {
          fetch("/login", { method: "POST" }).then((res) => {
            if (res.status === 201) setNext(true);
          });
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          fetch("/logout", { method: "DELETE" });
        }}
      >
        Logout
      </button>
      {next && <Redirect to="/paid_for_content" />}
    </div>
  );
}
