import Head from "next/head";
import React from "react";
import styles from "../styles/MainPage.module.css";
import { StarSky } from "@/components";
import { LoginContainer, QuizContainer } from "@/containers";

const MainPage = () => {

  return (
    <>
      <Head>
        <title>Rather Labs - Nicolas Soroka</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <StarSky />
        {/* <LoginContainer/> */}
        <QuizContainer/>
        {/* <FlippableCard/> */}
      </div>
    </>
  );
};

export default MainPage;
