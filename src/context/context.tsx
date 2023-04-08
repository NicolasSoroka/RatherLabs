import { answersType, surveyDataType } from "@/utils/types";
import { createContext, useContext } from "react";

export type ContextProps = {
  account: string | null;
  setAccount: (account: string) => void;
  networkId: number | null;
  setNetworkId: (networkId: number) => void;
  data: surveyDataType | null;
  setData: (data: surveyDataType) => void;
  answers: answersType | null;
  setAnswers: (data: answersType) => void;
  currentQuestion: number;
  setCurrentQuestion: (currentQuestion: number) => void;
  quizFinished: boolean;
  setQuizFinished: (data: boolean) => void;
};

export const AppContext = createContext<ContextProps>({
  data: { title: "", image: "", questions: [] },
  setData: () => {},
  account: null,
  setAccount: () => {},
  networkId: null,
  setNetworkId: () => {},
  answers: {},
  setAnswers: () => {},
  currentQuestion: 0,
  setCurrentQuestion: () => {},
  quizFinished: false,
  setQuizFinished: () => {}
});

export const useGlobalContext = () => useContext(AppContext);
