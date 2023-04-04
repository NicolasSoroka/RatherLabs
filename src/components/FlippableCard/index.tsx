import styles from './FlippableCard.module.css';
import {CSSTransition} from 'react-transition-group';
import {useState} from 'react'

const FlippableCard = ({}) => {

  const [showFront, setShowFront] = useState(true);
  const [actualView, setActualView] = useState(0);

  const handle = () => {
    setShowFront(( v ) => !v )
  }

  return (
    <div className={styles.container}>
      <CSSTransition
        in={showFront}
        timeout={300}
        classNames='flip'
      >
        <div className={styles.container__content}>
          <div className={styles.container__content__frontSide}>
            {/* render de question[n] */}
          </div>
          <div className={styles.container__content__backSide}>
            {/* render de question[n+1] */}
          </div>
        </div>
      </CSSTransition>
      <button onClick={handle}>test</button>
    </div>
  )
}

export default FlippableCard