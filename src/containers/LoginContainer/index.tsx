import { LoginButton, RatherLogo } from "@/components";
import React from "react";
import styles from './LoginContainer.module.css';

const LoginContainer = () => {
  const handleClick = () => {
    console.log("test");
  };

  React.useEffect(() => {
    const data = 'test';

    fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
  }, [])

  return (
    <div className={styles.container}>
      <RatherLogo />
      <LoginButton text={"Login with Metamask"} onClick={handleClick} />
    </div>
  );
};

export default LoginContainer;
