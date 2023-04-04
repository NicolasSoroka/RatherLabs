import { useState, useEffect } from "react";
import Web3 from "web3";
import abi from "../utils/abi";

const MainPage = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [networkId, setNetworkId] = useState<number | null>(null);

  useEffect(() => {
    const connectWallet = async () => {
      const web3 = new Web3(window.ethereum);
      if (typeof window.ethereum !== "undefined") {
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

  const getBalance = () => {
    const tokenAddress = "0x437eF217203452317C3C955Cf282b1eE5F6aaF72"; // replace with your token address
    // const tokenAbi = abi; // replace with your token ABI
    // const userAddress = account; // replace with the address you want to retrieve the balance for

    const web3 = new Web3(window.ethereum);
    const tokenContract = new web3.eth.Contract(abi, tokenAddress);

    tokenContract.methods
      .balanceOf(account)
      .call()
      .then((balance) => {
        console.log(
          `The balance of the user at address ${account} is ${balance}`
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getReward = () => {
    const QUIZTokenAddress = "0x437eF217203452317C3C955Cf282b1eE5F6aaF72"; //QUIZ TOKEN
    // const userAddress = '0x7a397874F74B5f221895139d939AE0158D6e6f31';

    const web3 = new Web3(window.ethereum);
    const QUIZTokenContract = new web3.eth.Contract(abi, QUIZTokenAddress);

    // QUIZTokenContract.methods.submit(1, [0,0,0]).call().then(res => console.log(res));
    const surveyId = 1; // example survey ID
    const answerIds = [1, 2, 3]; // example array of answer IDs
    console.log(QUIZTokenContract.methods);
    const gasLimit = 100000; // example gas limit
    const options = {
      from: "0x7a397874F74B5f221895139d939AE0158D6e6f31",
      gas: gasLimit,
    };

    QUIZTokenContract.methods
      .submit(surveyId, answerIds).send(options)
      .on('transactionHash', function(hash){
          console.log("Transaction hash: " + hash);
      })
      .on('receipt', function(receipt){
          console.log("Transaction receipt: ", receipt);
          if (receipt.status == false) {
              console.error("Transaction failed with status: " + receipt.status);
          }
      })
      .on('error', function(error){
          console.error("Transaction error: " + error.message);
      });
    }

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
      <button onClick={getBalance}>get Balance</button>

      <button onClick={getReward}>get Reward</button>
    </div>
  );
};

export default MainPage;
