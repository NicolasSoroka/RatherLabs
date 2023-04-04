import React, { useEffect, useState } from "react";
import styles from "./QuizContainer.module.css";
import { surveyDataType } from '../../utils/types';
import { FlippableCard } from '@/components'

const QuizContainer = () => {
  const [data, setData] = useState<surveyDataType | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/hello");
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.container__title}>{data?.title}</h2>
      <FlippableCard/>
      <div className={styles.container__controls}>
        <button>anterior</button>
        <span>pos actual</span>
        <button>siguiente</button>
      </div>
    </div>
  );
};

export default QuizContainer;
