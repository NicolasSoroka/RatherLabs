import { LoginButton, RatherLogo } from "@/components";
import React from "react";

const LoginContainer = () => {
  const handleClick = () => {
    console.log("test");
  };

  return (
    <>
      <RatherLogo />
      <LoginButton text={"Login with Metamask"} onClick={handleClick} />
    </>
  );
};

export default LoginContainer;
