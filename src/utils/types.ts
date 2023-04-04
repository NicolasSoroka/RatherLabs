export type surveyDataType = {
  title: string;
  image: string;
  questions: questionType[];
};

export type questionType = {
  text: string;
  image: string;
  lifetimeSeconds: number;
  options: optionType[];
};

type optionType = {
  text: string;
};
