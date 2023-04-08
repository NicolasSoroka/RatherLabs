import React, { useRef, useState } from "react";
import styles from "./QuizContainer.module.css";
import { useGlobalContext } from "@/context/context";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { ProgressBar } from "@/components";

const QuizContainer = () => {
  const {
    data,
    answers,
    setAnswers,
    currentQuestion,
    setCurrentQuestion,
    setQuizFinished,
  } = useGlobalContext();
  const [selectedItem, setSelectedItem] = useState();

  const handleAnswerClick = (item, index) => {
    setSelectedItem(item.text === selectedItem ? null : item.text);
    setAnswers({ ...answers, [currentQuestion]: index });
    handleAnimationEnd();
  };

  const handleAnimationEnd = () => {
    if (currentQuestion < data?.questions.length! - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className={styles.container}>
      {data?.questions[currentQuestion].text && (
        <h2 className={styles.container__question}>
          {data?.questions[currentQuestion].text}
        </h2>
      )}

      {data?.questions[currentQuestion].image && (
        <div className={styles.container__image}>
          <Image
            src={data?.questions[currentQuestion].image}
            fill
            alt="question image"
          />
          <ProgressBar
            key={uuidv4()}
            onAnimationEnd={handleAnimationEnd}
            initialValue={100}
            animationDuration={data?.questions[currentQuestion].lifetimeSeconds}
          />
        </div>
      )}

      <ul className={styles.container__ul}>
        {data?.questions[currentQuestion].options &&
          data?.questions[currentQuestion].options.map((item, index) => (
            <li
              key={uuidv4()}
              className={item.text === selectedItem ? styles.selected : ""}
              onClick={() => handleAnswerClick(item, index)}
            >
              {item.text}
            </li>
          ))}
      </ul>

      <p className={styles.container__total}>
        {`${currentQuestion + 1} / ${data?.questions.length}`}
      </p>
    </div>
  );
};

export default QuizContainer;
