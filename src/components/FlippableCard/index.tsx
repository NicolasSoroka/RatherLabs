import styles from "./FlippableCard.module.css";
import { CSSTransition } from "react-transition-group";
import { FC, useEffect, useRef, useState } from "react";
import { questionType } from "../../utils/types";
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';

type FlippableCardType = {
  actualQuestion: number;
  questions: questionType[];
};

type ListItemType = {
  item: string;
  onClick: () => void;
  selected: string | boolean;
};

const ListItem: FC<ListItemType> = ({ item, selected, onClick }) => {
  return (
    <li onClick={onClick} className={selected ? `${styles.selected}` : ''}>
      {item}
    </li>
  );
};

const FlippableCard: FC<FlippableCardType> = ({
  questions,
  actualQuestion,
}) => {
  const [showFront, setShowFront] = useState(false);
  const [actualView, setActualView] = useState(0);
  const firstUpdate = useRef(true);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>();

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setActualView(actualQuestion);
    setShowFront((v) => !v);
  }, [actualQuestion]);

  const handleItemClick = (item: string) => {
    setSelectedAnswer(item === selectedAnswer ? null : item);
  };

  return (

    // cambiar los values de string por la posicion del array.
    <div className={styles.container}>
      <CSSTransition in={showFront} timeout={300} classNames="flip">
        <div className={styles.container__content}>
          {questions && (
            <>
              <div className={styles.container__content__image}>
                <Image src={questions[actualView].image} alt="image" fill />
              </div>
              <h2 className={styles.container__content__title}>
                {questions[actualView].text}
              </h2>
              <ul className={styles.container__content__options}>
                {questions[actualView].options.map((item) => (
                  <ListItem
                    key={uuidv4()}
                    item={item.text}
                    selected={item.text === selectedAnswer}
                    onClick={() => handleItemClick(item.text)}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      </CSSTransition>
    </div>
  );
};

export default FlippableCard;
