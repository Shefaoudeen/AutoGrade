import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen text-white">
      <Header />
      <div
        className="flex flex-1 justify-center items-center bg-gradient-to-tr from-black
    via-green-900
    to-black animated-background"
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
