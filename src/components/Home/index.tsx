import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Image from "next/image";
import { useGlobalContext } from "@/context/context";
import Web3 from "web3";
import Abi from "@/utils/abi";
import { fromWei, AbiItem } from "web3-utils";
import Link from "next/link";
import { motion } from "framer-motion";

const Home = () => {
  const { data, account } = useGlobalContext();
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const tokenAddress = process.env.TOKEN_ADDRESS_VAR;
    const web3 = new Web3(window.ethereum);
    const tokenContract = new web3.eth.Contract(Abi as AbiItem[], tokenAddress);

    tokenContract.methods
      .balanceOf(account)
      .call()
      .then((balance: any) => {
        setBalance(fromWei(balance, "ether"));
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, [account]);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={styles.container__title}>{data?.title}</h2>
      <p className={styles.container__balance}>Balance: {balance} QUIZ</p>
      <div className={styles.container__image}>
        {data?.image && <Image src={data?.image} alt="image" fill />}
      </div>
      <Link href="/quiz" className={styles.container__button}>
        <button>Start</button>
      </Link>
    </motion.div>
  );
};

export default Home;
