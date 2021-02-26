import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

export default function PayForAccess() {
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
          fetch("/pay", { method: "POST" }).then((res) => {
            if (res.status === 201) setNext(true);
          });
        }}
      >
        Pay For Access
      </button>
      {next && <Redirect to="/paid_for_content" />}
    </div>
  );
}
