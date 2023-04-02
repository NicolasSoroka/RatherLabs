import { Balance } from "@/components";
import { useState, useEffect } from "react";
import Web3 from "web3";

function MyComponent() {
  const [account, setAccount] = useState<string | null>(null);
  const [networkId, setNetworkId] = useState<number | null>(null);

  useEffect(() => {
    const connectWallet = async () => {
      if (typeof window.ethereum !== "undefined") {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access
          await window.ethereum.enable();
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);

          // Check if the user is connected to the Goerli network
          const chainId = await web3.eth.getChainId();
          setNetworkId(chainId);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("Metamask not detected");
      }
    };
    connectWallet();
  }, []);

  const connectToGoerli = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {account ? (
        <p>
          Connected with account {account} on network {networkId}
        </p>
      ) : (
        <p>Not connected</p>
      )}
      {networkId !== 5 && (
        <button onClick={connectToGoerli}>Connect to Goerli Network</button>
      )}
      <Balance />
    </div>
  );
}

export default MyComponent;

