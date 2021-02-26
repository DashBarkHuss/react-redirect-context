import React, { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

export default function Profile() {
  const currentUser = useContext(UserContext);

  return (
    <div>
      {currentUser && !currentUser.message
        ? "You're logged in and can edit your profile."
        : "You're not logged in."}
    </div>
  );
}
