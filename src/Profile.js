import React, { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

export default function Profile() {
  const userContext = useContext(UserContext);

  return (
    <div>
      {userContext.user && !userContext.message
        ? "You're logged in and can edit your profile."
        : "You're not logged in."}
    </div>
  );
}
