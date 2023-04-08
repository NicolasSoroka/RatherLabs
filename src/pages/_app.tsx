import "@/styles/globals.css";
import "@/styles/flip-transition.css";

import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { AppContext } from "@/context/context";
import { useEffect, useState } from "react";
import { answersType, surveyDataType } from "@/utils/types";

export default function App({ Component, pageProps }: AppProps) {
  const [account, setAccount] = useState<string | null>(null);
  const [networkId, setNetworkId] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<answersType>({});
  const [data, setData] = useState<surveyDataType | null>(null);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/hello");
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <AppContext.Provider
        value={{
          data,
          setData,
          account,
          setAccount,
          networkId,
          setNetworkId,
          answers,
          setAnswers,
          currentQuestion,
          setCurrentQuestion,
          quizFinished,
          setQuizFinished
        }}
      >
        <Component {...pageProps} />
      </AppContext.Provider>
    </Layout>
  );
}
