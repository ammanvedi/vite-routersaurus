import { Outlet } from "react-router-dom";
import React from 'react'
const Layout = () => {
  return (
    <>
      <h1>Root Layout</h1>
      <Outlet />
    </>
  );
};

export default Layout;
