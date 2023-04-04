import React, { useEffect, useState } from "react";
import styles from "./QuizContainer.module.css";
import { surveyDataType } from "../../utils/types";
import { FlippableCard } from "@/components";

const QuizContainer = () => {
  const [data, setData] = useState<surveyDataType | null>(null);
  const [actualQuestion, setActualQuestion] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/hello");
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, []);

  const handlePrev = () => {
    if (actualQuestion > 0) setActualQuestion((prev) => prev - 1);
  };

  const handleNext = () => {
    if (actualQuestion < data?.questions.length! - 1)
      setActualQuestion((prev) => prev + 1);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.container__title}>{data?.title}</h2>
      <FlippableCard
        questions={data?.questions!}
        actualQuestion={actualQuestion}
      />
      <div className={styles.container__controls}>
        {/* add disabled class for buttons */}
        <button onClick={handlePrev}>Prev</button>
        <span>{`${actualQuestion + 1} / ${data?.questions.length}`}</span>
        <button onClick={handleNext}>Next</button>
      </div>

{/* add a check for all options to have 1 selected answer */}
      {/* {actualQuestion === data?.questions.length! - 1 && (
        <button>Finish</button>
      )} */}
    </div>
  );
};

export default QuizContainer;

// Agregar toogle al login para jugar con o sin timer.