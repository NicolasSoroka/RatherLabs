import { useState, useEffect } from "react";
import Web3 from "web3";

const QUIZ_TOKEN_ADDRESS = "0x437eF217203452317C3C955Cf282b1eE5F6aaF72";

function Balance() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const connectWallet = async () => {
      if (typeof window.ethereum !== "undefined") {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access
          await window.ethereum.enable();
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);

          // Get the $QUIZ token balance for the current account
          const quizTokenContract = new web3.eth.Contract(
            [
              {
                constant: true,
                inputs: [{ name: "_owner", type: "address" }],
                name: "balanceOf",
                outputs: [{ name: "balance", type: "uint256" }],
                payable: false,
                type: "function",
              },
              {
                constant: true,
                inputs: [],
                name: "decimals",
                outputs: [{ name: "", type: "uint8" }],
                payable: false,
                type: "function",
              },
              {
                constant: true,
                inputs: [],
                name: "symbol",
                outputs: [{ name: "", type: "string" }],
                payable: false,
                type: "function",
              },
            ],
            QUIZ_TOKEN_ADDRESS
          );
          const balance = await quizTokenContract.methods
            .balanceOf(account)
            .call();
          setBalance(balance);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("Metamask not detected");
      }
    };
    connectWallet();
  }, []);

  return (
    <div>
      {account ? (
        <p>
          Connected with account {account}. $QUIZ balance: {balance} tokens
        </p>
      ) : (
        <p>Not connected</p>
      )}
    </div>
  );
}

export default Balance;
