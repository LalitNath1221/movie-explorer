import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import LoginModal from "../components/LoginModal";

const Layout = () => {
  const { showLoginModal } = useSelector((state) => state.auth);

  return (
    <>
      {showLoginModal && <LoginModal />}
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
