  import React, { useState } from "react";
import styles from "./ResultContainer.module.css";
import { useGlobalContext } from "@/context/context";
import { fromWei, AbiItem } from "web3-utils";
import Abi from "@/utils/abi";

import { v4 as uuidv4 } from "uuid";
import { Button } from "antd";

const ResultContainer = () => {
  const { data, answers, account } = useGlobalContext();
  const [balance, setBalance] = useState("");
  const Web3 = require("web3");
  const web3 = new Web3(window.ethereum);
    
  web3.eth
    .subscribe("newBlockHeaders", (error:any, result:any) => {
      if (error) {
        console.error(`Error subscribing to new blocks: ${error}`);
      }
    })
    .on("data", async (blockHeader:any) => {
      const QUIZTokenAddress = process.env.TOKEN_ADDRESS_VAR;
      const web3 = new Web3(window.ethereum);
      const tokenContract = new web3.eth.Contract(Abi as AbiItem[], QUIZTokenAddress);
  
      tokenContract.methods
        .balanceOf(account)
        .call()
        .then((balance:any) => {
          setBalance(fromWei(balance, "ether"));
        })
        .catch((error:any) => {
          console.error(error);
        });
    })
    .on("error", (error:any) => {
      console.error(`Error processing new block: ${error}`);
    });

  const getReward = () => {
    const QUIZTokenAddress = process.env.TOKEN_ADDRESS_VAR;
    const web3 = new Web3(window.ethereum);
    const QUIZTokenContract = new web3.eth.Contract(Abi as AbiItem[], QUIZTokenAddress);

    const surveyId = 1;
    const answerIds = Object.keys(answers!).map(function (k) {
      return answers![k];
    });
    const gasLimit = 200000;
    const options = {
      from: account,
      gas: gasLimit,
    };

    QUIZTokenContract.methods
      .submit(surveyId, answerIds)
      .send(options)
      .on("transactionHash", function (hash:any) {
        console.log("Transaction hash: " + hash);
      })
      .on("receipt", function (receipt:any) {
        console.log("Transaction receipt: ", receipt);
        if (receipt.status == false) {
          console.error("Transaction failed with status: " + receipt.status);
        }
      })
      .on("error", function (error:any) {
        console.error("Transaction error: " + error.message);
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.container__title}>Selected answers:</h2>

      <ul className={styles.container__ul}>
        {Object.entries(answers!).map(([key, value]) => {
          const question = data?.questions[key].text;
          const answer = data?.questions[key].options[value].text;
          return <li key={uuidv4()}>{`${question}: ${answer}`}</li>;
        })}
      </ul>

      <p className={styles.container__balance}>Balance: {balance} QUIZ</p>
      <Button
        onClick={getReward}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          width: "200px",
          fontFamily: "Rubik, sans-serif",
        }}
      >
        Send and get reward!
      </Button>
    </div>
  );
};

export default ResultContainer;
