import React, { useState, useEffect } from 'react';
import styles from './StarSky.module.css';

interface Star {
  id: number;
  opacity: number;
  top: number;
  left: number;
  size: number;
}

const StarSky: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const createStar = () => {
      const star: Star = {
        id: Math.random(),
        opacity: 0,
        size: Math.random() * 2 + 1,
        top: Math.random() * window.innerHeight,
        left: Math.random() * window.innerWidth,
      };

      setStars((prevStars) => [...prevStars, star]);

      setTimeout(() => {
        fadeOutStar(star.id);
      }, 2000);
    };

    const fadeOutStar = (id: number) => {
      setStars((prevStars) =>
        prevStars.map((star) =>
          star.id === id ? { ...star, opacity: 0 } : star
        )
      );

      setTimeout(() => {
        removeStar(id);
      }, 2000);
    };

    const removeStar = (id: number) => {
      setStars((prevStars) => prevStars.filter((star) => star.id !== id));
    };

    const interval = setInterval(createStar, Math.random() * 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      {stars.map((star) => (
        <div
          key={star.id}
          className={styles.star}
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default StarSky;
