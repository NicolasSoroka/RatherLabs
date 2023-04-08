import React, { useRef, useEffect, useState } from "react";

interface ProgressBarProps {
  initialValue: number;
  animationDuration: number;
  onAnimationEnd: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  initialValue,
  animationDuration,
  onAnimationEnd,
}) => {
  const [progress, setProgress] = useState(initialValue);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      const progressStep = (initialValue / (animationDuration * 1000)) * 10;
      const timerId = setInterval(() => {
        setProgress((prevProgress) => prevProgress - progressStep);
      }, 10);
      setTimeout(() => {
        clearInterval(timerId);
        if (onAnimationEnd) {
          onAnimationEnd();
        }
      }, animationDuration * 1000);
      return () => clearInterval(timerId);
    }
  }, [initialValue, animationDuration, onAnimationEnd]);

  return (
    <div className="progress-bar" ref={progressRef}>
      <div
        className="progress"
        style={{
          borderRadius: "1px",
          position: "relative",
          width: `${progress}%`,
          height: "10px",
          backgroundColor: "white",
        }}
      />
    </div>
  );
};

export default ProgressBar;
