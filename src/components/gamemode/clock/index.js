import React, { useState, useEffect } from "react";
import "./style.css";
const Clock = ({ time, onCountDown, onStop }) => {
  const [countTime, setCountTime] = useState(null);

  useEffect(() => {
    let timer = null;
    if (time > 0) {
      timer = setTimeout(() => {
        onCountDown && onCountDown(time - 1);
      }, 1000);
    } else {
      onStop && onStop();
    }

    return () => clearTimeout(timer);
  }, [time]);

  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  return (
    <div className="clock">
      <div className="clock-image">
        <img
          src="https://jthemes.net/themes/html/quizo/version-5/assets/images/clock.png"
          alt="clock"
        ></img>
      </div>
      <div className="clock-count-title">
        <span>Time</span>
      </div>
      <div className="clock-count-rounded">
        <div className="clock-count-rounded-hour">
          <p>00</p>
          <span>HRS</span>
        </div>
        <div className="clock-count-rounded-minute">
          <p>{minutes.toString().padStart(2, "0")}</p>
          <span>MIN</span>
        </div>
        <div className="clock-count-rounded-second">
          <p>{seconds.toString().padStart(2, "0")}</p>
          <span>SEC</span>
        </div>
      </div>
    </div>
  );
};

export default Clock;
