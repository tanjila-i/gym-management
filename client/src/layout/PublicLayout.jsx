import React from "react";
import { Link, Outlet } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import AboutPage from "../pages/public/AboutPage";
import Navbar from "../components/Navbar";

const PublicLayout = ({ onOpenTrial }) => {
  return (
    <>
      <Navbar onOpenTrial={onOpenTrial} />
      <main>
        <Outlet /> {/* Child routes will render here */}
      </main>
    </>
  );
};

export default PublicLayout;
