import React from "react";
import { Outlet, Link } from "react-router-dom";
import GlobalNav from "./GlobalNav";

const Layout = () => {
  return (
    <header>
      <h1>Adventure + List</h1>
      <GlobalNav />
      <main>
        <Outlet />
      </main>
    </header>
  );
};

export default Layout;
