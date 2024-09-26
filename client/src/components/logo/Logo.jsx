import React from "react";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to={"/feed"}>
      <img src="/images/friends.png" alt="logo" width={"80px"} />
    </Link>
  );
};
