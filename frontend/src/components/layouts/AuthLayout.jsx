import React from "react";
import blueImage from "../../assets/login-tumb.jpg";
import loginImage from "../../assets/login.svg";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* left side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 z-10 bg-white relative">
        {children}
      </div>
      {/* right side */}
      <div className="hidden md:block relative w-1/2">
        {/* blue image */}
        <img
          src={blueImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* image */}
        <img
          src={loginImage}
          alt=""
          className="absolute inset-0 w-full h-full object-contain z-10 p-8"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
