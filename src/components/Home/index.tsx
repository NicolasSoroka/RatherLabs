import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Image from "next/image";
import { useGlobalContext } from "@/context/context";
import Web3 from "web3";
import abi from "@/utils/abi";
import { fromWei } from "web3-utils";
import Link from "next/link";

const Home = () => {
  const { data, account } = useGlobalContext();
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const tokenAddress = "0x437eF217203452317C3C955Cf282b1eE5F6aaF72";
    const web3 = new Web3(window.ethereum);
    const tokenContract = new web3.eth.Contract(abi, tokenAddress);

    tokenContract.methods
      .balanceOf(account)
      .call()
      .then((balance) => {
        setBalance(fromWei(balance, "ether"));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.container__title}>{data?.title}</h2>
      <p className={styles.container__balance}>Balance: {balance} QUIZ</p>
      <div className={styles.container__image}>
        {data?.image && <Image src={data?.image} alt="image" fill />}
      </div>
      <Link href="/quiz" className={styles.container__button}>
        <button>Start</button>
      </Link>
    </div>
  );
};

export default Home;
