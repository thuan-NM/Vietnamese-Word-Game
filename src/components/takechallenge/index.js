import React, { useState, useEffect } from "react";
import axios from "axios";

import GameResult from "../gameresult";

import "./style.css";

import ChooseAnswer from "../gamemode/chooseanswer";
import Reorganize from "../gamemode/reorganize";
import HangingMan from "../gamemode/hangingman";

const TakeChallenge = ({ subjectId, challengeType }) => {
  const [questions, setQuestions] = useState([]);
  const [passQuestionCount, setPassQuestionCount] = useState(0);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [pointCount, setPointCount] = useState(0);
  const [isAddingPoint, setIsAddingPoint] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get("https://x21-be.onrender.com/qnas/", {
          params: { subjectId: subjectId, challengeType: challengeType },
        });
        if (response.status == 200) {
          setQuestions(response.data.questions);
        } else {
          console.log("Error fetching");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchQuestion();
  }, []);

  const totalQuestion = questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  // console.log(currentQuestionIndex);
  const onPass = () => {
    console.log("Bạn đã trả lời đúng câu hỏi");
    setIsAddingPoint(true);
    setPassQuestionCount(passQuestionCount + 1);
    if (currentQuestionIndex < totalQuestion - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("Bạn đã hoàn thành game");
      setIsGameOver(true);
    }
  };
  const onFail = () => {
    console.log("Bạn đã trả lời sai");
    if (currentQuestionIndex < totalQuestion - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("Bạn đã hoàn thành game");
      setIsGameOver(true);
    }
  };
  const handlePoint = () => {
    const point = 100;
    if (isAddingPoint) {
      setPointCount(pointCount + point);
    }
  };
  useEffect(() => {
    handlePoint();
  }, [passQuestionCount]);

  return (
    <div className="take-challenge">
      {isGameOver && (
        <GameResult
          setIsGameOver={setIsGameOver}
          passQuestionCount={passQuestionCount}
          totalQuestion={totalQuestion}
          pointCount={pointCount}
        />
      )}
      {currentQuestion?.challengeType === "qnas" && (
        <ChooseAnswer
          question={currentQuestion.question}
          answers={currentQuestion.answers}
          correctAnswer={currentQuestion.rightAnswer}
          totalQuestion={totalQuestion}
          currentQuestionIndex={currentQuestionIndex}
          onPass={onPass}
          onFail={onFail}
        />
      )}
      {currentQuestion?.challengeType === "hangman" && (
        <HangingMan
          question={currentQuestion.question}
          // totalQuestion={totalQuestion}
          currentQuestionIndex={currentQuestionIndex}
          correctAnswer={currentQuestion.rightAnswer}
          onPass={onPass}
          onFail={onFail}
        />
      )}
      {currentQuestion?.challengeType === "arrange" && (
        <Reorganize
          question={currentQuestion.question}
          totalQuestion={totalQuestion}
          currentQuestionIndex={currentQuestionIndex}
          correctAnswer={currentQuestion.rightAnswer}
          onPass={onPass}
          onFail={onFail}
        />
      )}
    </div>
  );
};

export default TakeChallenge;
