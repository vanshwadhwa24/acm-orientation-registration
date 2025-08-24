import React from "react";
import logo_ACM from "../assets/logo_ACM_Footer.png";

const Navbar = () => {
  return (
    <nav className="bg-[#D3F3FF] dark:bg-[#1e1c1c] shadow-[0_0_10px_#808080] dark:shadow-[0_0_30px_#000000] border-b border-gray-200 dark:border-[#1e1c1c] relative z-50 transition-colors duration-300">
      <div className="flex justify-center items-center h-16">
        <img
          src={logo_ACM}
          alt="ACM Logo"
          className="h-11 w-auto cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default Navbar;
