import { Outlet } from "react-router-dom";
import React from 'react'
const Layout = () => {
  return (
    <>
      <h2>Nested Layout</h2>
      <Outlet />
    </>
  );
};

export default Layout;
