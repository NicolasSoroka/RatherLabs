import { QuizContainer, ResultContainer } from "@/containers";
import { useGlobalContext } from "@/context/context";
import React from "react";

const QuizPage = () => {
  const { quizFinished } = useGlobalContext();

  return (
    <>
      {!quizFinished && <QuizContainer />}
      {quizFinished && <ResultContainer />}
    </>
  );
};

export default QuizPage;
