import React, { useState, useEffect } from "react";
import { Row, Col, message } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import Ranking from "../../components/homepage/ranking";
import ChooseSubject from "../../components/homepage/chooseSubject.js";

import "./style.css";

const HomePage = ({ user }) => {
  const [isStart, setIsStart] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token")

  useEffect(() => {
    // Check if user token exists on component mount
    if (!token) {
      navigate("/auth"); // Redirect to AuthPage if no token
    }
  }, [user.token, navigate]);

  const handleStart = () => {
    setIsStart(true);
  };
  return (
    <div className="row homepage-main">
      <Row>
        <Col span={8}>
          <Ranking />
        </Col>
        <Col span={16}>
          {isStart ? (
            <ChooseSubject setIsStart={setIsStart} />
          ) : (
            <div className="hompage-main-start">
              <PlayCircleOutlined
                className="homepage-main-start-button"
                onClick={() =>
                  // if (!user.token) {
                  //   message.warning("Bạn cần đăng nhập trước.");
                  //   navigate("/auth");
                  // } else {
                  handleStart()
                }
              />
              <p>Click to start</p>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
