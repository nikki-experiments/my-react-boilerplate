import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface GlobalNavProps {}

const GlobalNav: FunctionComponent<GlobalNavProps> = () => {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="calendar">Adventure Calendar</Link>
      <Link to="list">Adventure List</Link>
    </nav>
  );
};

export default GlobalNav;
