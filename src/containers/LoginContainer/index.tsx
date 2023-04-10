import { LoginButton, RatherLogo } from "@/components";
import React, { useEffect } from "react";
import styles from "./LoginContainer.module.css";
import { useGlobalContext } from "@/context/context";
import Web3 from "web3";

const LoginContainer = () => {
  const { account, networkId, setAccount, setNetworkId } = useGlobalContext();

  const connectWallet = async () => {
    const web3 = new Web3(window.ethereum);
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const chainId = await web3.eth.getChainId();
        setNetworkId(chainId);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Metamask not detected");
    }
  };

  const connectToGoerli = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });

      const web3 = new Web3(window.ethereum);
      const chainId = await web3.eth.getChainId();
      setNetworkId(chainId);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    connectWallet();
    connectToGoerli();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <RatherLogo />
      {account === null && (
        <LoginButton
          onClick={connectWallet}
          text={"Login with Metamask"}
          logo={true}
          delay={0.7}
        />
      )}
      {networkId !== 5 && account !== null && (
        <LoginButton
          onClick={connectToGoerli}
          text={"Connect to Goerli Network"}
          logo={false}
          delay={0}
        />
      )}
    </div>
  );
};

export default LoginContainer;
