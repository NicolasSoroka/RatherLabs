import React, { useState } from "react";
import { Button } from "antd";
import MetamaskIcon from "../../../public/metamask.svg";
import Image from "next/image";

interface LoginButtonProps {
  text: string;
  onClick: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ text, onClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading((prev) => !prev);
    setTimeout(()=> {
      setIsLoading(prev => !prev)
    }, 2000)
    onClick();
  };

  return (
    <Button
      onClick={handleClick}
      loading={isLoading}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: '10px',
        width: "200px",
        height: '40px',
        fontFamily: 'Rubik, sans-serif',
      }}
      icon={
        <Image src={MetamaskIcon} alt="Metamask icon" width={25} height={25} />
      }
    >
      {text}
    </Button>
  );
};

export default LoginButton;
