import { Outlet } from "react-router-dom";
import React from 'react'
const Layout = () => {
  return (
    <>
      <div>Root Layout</div>
      <Outlet />
    </>
  );
};

export default Layout;
