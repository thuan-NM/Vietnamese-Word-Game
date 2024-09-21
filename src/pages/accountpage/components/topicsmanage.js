import React from "react";
import { Col, Row } from "antd";

import "./style.css";

const TopicsManagement = () => {
  return (
    <div className="topic-management">
      <Row>
        <Col span={24}>
          <h3>Topics Management</h3>
        </Col>
        <Col span={24}>
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
export default TopicsManagement;
