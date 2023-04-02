import { LoginButton, RatherLogo } from "@/components";
import React from "react";
import styles from './LoginContainer.module.css';

const LoginContainer = () => {
  const handleClick = () => {
    console.log("test");
  };

  return (
    <div className={styles.container}>
      <RatherLogo />
      <LoginButton text={"Login with Metamask"} onClick={handleClick} />
    </div>
  );
};

export default LoginContainer;
