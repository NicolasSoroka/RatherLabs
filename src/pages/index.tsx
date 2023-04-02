import Head from "next/head";
import React from "react";
import styles from "../styles/MainPage.module.css";
import LoginContainer from "@/containers/LoginContainer";
import { StarSky } from "@/components";

const MainPage = () => {

  return (
    <>
      <Head>
        <title>Rather Labs - Nicolas Soroka</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <StarSky />
        <LoginContainer/>
      </div>
    </>
  );
};

export default MainPage;
