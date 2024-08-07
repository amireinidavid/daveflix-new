import React from "react";
import NavBar from "./NavBar/NavBar";
import Fotter from "./Fotter/Fotter";
import MobileFooter from "./Fotter/MObileFooter";

function Layout({ children }) {
  return (
    <>
      <div className="bg-main text-white">
        <NavBar />
        {children}
        <Fotter />
        {/* mobile fotter */}
        <MobileFooter />
      </div>
    </>
  );
}

export default Layout;
