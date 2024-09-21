import React from "react";
import { Col, Row } from "antd";

import "./style.css";

const QuestionsManagement = () => {
  return (
    <div className="topic-management">
      <Row>
        <Col span={24}>
          <h3>Questions Management</h3>
        </Col>
        <Col span={24}>
          <h4>Hãy lựa chọn chủ đề</h4>
          <div className="topic-management-container">
            <span className="topic-management-items">Topic</span>
            <span className="topic-management-items">Topic</span>
            <span className="topic-management-items">Topic</span>
            <span className="topic-management-items">Topic</span>
            <span className="topic-management-items">Topic</span>
            <span className="topic-management-items">Topic</span>
            <span className="topic-management-items">Topic</span>
            <span className="topic-management-items">Topic</span>
            <span className="topic-management-items">Topic</span>
            <span className="topic-management-items">Topic</span>
            <span className="topic-management-items">Topic</span>
            <span className="topic-management-items">Topic</span>
            <span className="topic-management-items">Topic</span>
            <span className="topic-management-items">Topic</span>
            <span className="topic-management-items">Topic</span>
            <span className="topic-management-items">+</span>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default QuestionsManagement;
