import React, { useEffect, useState } from "react";
import styles from "./LineWithWords.module.css";

const DELAY = -0.4; // Delay of subtitles
const PIXELS_WIDTH = 180; // Width multiplier
const FONT_SIZE = 19

export default function LineWithWords({
  originalDelay,
  dialogue,
  seeking,
  time,
  position,
  duration,
  isPaused,
}) {
  const width = duration * PIXELS_WIDTH;
  const [delay, setDelay] = useState(0);

  const reset_animation = () => {
    let el = document.getElementsByClassName(styles.container)[0];
    if (el) {
      el.classList.remove(styles.container);
      setTimeout(function () {
        el.classList.add(styles.container);
      }, 1);
      setDelay(-1 * position + DELAY);
    }
  };
  useEffect(() => {
    reset_animation();
  }, [isPaused, seeking]);

  return (
    <div
      style={{
        width: width,
        animationDuration:
          duration +
          (originalDelay === undefined ? -0.2 : parseFloat(originalDelay)) +
          "s",
        animationPlayState: isPaused ? "paused" : "running",
        animationDelay: delay + "s",
      }}
      className={styles.container}
      id="animated"
    >
      {dialogue.map((el, idx) => {
        let margin = idx % 2 === 0;
        const elContainerWidth = (time[idx][1] - time[idx][0]) * PIXELS_WIDTH
        const elTextWidth = el.length * 10 // 11.5 is average width of letter of font-size 19

        let fontSize = FONT_SIZE
        if (elContainerWidth < elTextWidth) {
            let diff = elTextWidth - elContainerWidth
            diff = diff > 120 ? 120 : diff;
            fontSize = FONT_SIZE - Math.round(diff / 20)
        }
        return (
          <div
            style={{
              left: (time[idx][0] / ( (duration - DELAY) / 100 ) ) + '%',
              width: ( (time[idx][1] - time[idx][0]) / ((duration - DELAY) / 100)) + '%',
              marginTop: margin && "1em",
              fontSize: fontSize + 'px',
            }}
            className={styles.dialogue}
            key={time[idx]}
          >
            {el.split('').map(letter =>
              <div className={styles.letterContainer}>
                {letter}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
