import React, { useState, useEffect } from "react";
import "./style.css";

import { Col, Row, Flex } from "antd";
import Clock from "../clock";
import Logo from "../logo";

const gameDuration = 20;

const ChooseAnswer = ({
  correctAnswer,
  question,
  answers,
  currentQuestionIndex,
  totalQuestion,
  onPass,
  onFail,
  onOverTime,
}) => {
  const [time, setTime] = useState(gameDuration);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer

  useEffect(() => {
    setTime(gameDuration);
    setSelectedAnswer(null);
  }, [question, answers]);

  const checkAnswer = (userAnswer) => {
    if (selectedAnswer) {
      return;
    }
    setSelectedAnswer(userAnswer);
    if (userAnswer !== correctAnswer) {
      setTimeout(() => {
        onFail();
      }, 2000);
    } else {
      setTimeout(() => {
        onPass();
      }, 2000);
    }
  };

  return (
    <div className="choose-answer">
      <Row>
        <Col span={24}>
          <div className="choose-answer-title">
            <Logo />
            <div>
              <Clock
                time={time}
                onCountDown={setTime}
                onStop={() => {
                  console.log("Time over!");
                  onFail && onFail();
                }}
              />
            </div>
          </div>
          <div className="choose-answer-count">
            <Flex
              gap={20}
              align="center"
              justify="space-between"
              style={{ marginBottom: "10px" }}
            >
              <div className="choose-answer-count-question">
                <span>
                  Câu {currentQuestionIndex + 1}/{totalQuestion}
                </span>
              </div>
            </Flex>
          </div>
        </Col>
        <Col span={24}>
          <div className="choose-answer-question">
            <Flex
              gap={20}
              align="center"
              justify="space-between"
              style={{ marginBottom: "10px" }}
            >
              <span>{question}</span>
            </Flex>
          </div>
        </Col>
        <Col span={24}>
          <div className="choose-answer-answer">
            {answers?.map((answer) => {
              return (
                <button
                  key={answer}
                  onClick={() => checkAnswer(answer)}
                  type="button"
                  className={
                    selectedAnswer === answer
                      ? answer === correctAnswer
                        ? "choose-answer-rightanswer"
                        : "choose-answer-falseanswer"
                      : !!selectedAnswer
                      ? "choose-answer-answer-button-disable"
                      : "choose-answer-answer-button"
                  }
                >
                  {answer}
                </button>
              );
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ChooseAnswer;
// import React, { useState, useEffect } from "react";
// import "./style.css";

// import { Col, Row, Flex } from "antd";
// import Clock from "../clock";

// const gameDuration = 2000;

// const ChooseAnswer = ({
//   correctAnswer,
//   question,
//   answers,
//   currentQuestionIndex,
//   totalQuestion,
//   onPass,
//   onFail,
//   onOverTime,
// }) => {
//   const [time, setTime] = useState(gameDuration);
//   const [isTrueAnswer, setIsTrueAnswer] = useState(null);

//   useEffect(() => {
//     setTime(gameDuration);
//   }, [question, answers]);

//   const checkAnswer = (userAnswer) => {
//     if (userAnswer !== correctAnswer) {
//       setIsTrueAnswer(false);
//       setTimeout(() => {
//         onFail();
//       }, 1000);
//     } else {
//       setIsTrueAnswer(true);
//       setTimeout(() => {
//         onPass();
//       }, 1000);
//     }
//   };

//   return (
//     <div className="choose-answer">
//       <Row>
//         <Col span={24}>
//           <div className="choose-answer-count">
//             <Flex
//               gap={20}
//               align="center"
//               justify="space-between"
//               style={{ marginBottom: "10px" }}
//             >
//               <div className="choose-answer-count-question">
//                 <span>
//                   Câu {currentQuestionIndex + 1}/{totalQuestion}
//                 </span>
//               </div>
//               <Clock
//                 time={time}
//                 onCountDown={setTime}
//                 onStop={() => {
//                   console.log("Time over!");
//                   onFail && onFail();
//                 }}
//               />
//             </Flex>
//           </div>
//         </Col>
//         <Col span={24}>
//           <div className="choose-answer-question">
//             <Flex
//               gap={20}
//               align="center"
//               justify="space-between"
//               style={{ marginBottom: "10px" }}
//             >
//               <span>{question}</span>
//             </Flex>
//           </div>
//         </Col>
//         <Col span={24}>
//           <div className="choose-answer-answer">
//             {answers?.map((answer) => (
//               <button
//                 key={answer}
//                 onClick={() => {
//                   checkAnswer(answer);
//                   console.log(`Đáp án bạn chọn: ${answer}`);
//                 }}
//                 type="button"
//                 className="choose-answer-answer-button"
//               >
//                 {answer}
//               </button>
//             ))}
//           </div>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default ChooseAnswer;
