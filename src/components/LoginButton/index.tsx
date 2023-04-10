import React, { useState } from "react";
import { Button } from "antd";
import MetamaskIcon from "../../../public/metamask.svg";
import Image from "next/image";
import { motion } from "framer-motion";

interface LoginButtonProps {
  text: string;
  onClick: () => void;
  logo: boolean;
  delay?: number;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  text,
  onClick,
  logo,
  delay,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading((prev) => !prev);
    setTimeout(() => {
      setIsLoading((prev) => !prev);
    }, 2000);
    onClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <Button
        onClick={handleClick}
        loading={isLoading}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          width: "200px",
          fontFamily: "Rubik, sans-serif",
        }}
        icon={
          logo && (
            <Image
              src={MetamaskIcon}
              alt="Metamask icon"
              width={25}
              height={25}
            />
          )
        }
      >
        {text}
      </Button>
    </motion.div>
  );
};

export default LoginButton;
