import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";

import "./style.css";

const AccountManagement = () => {
  return (
    <div className="account-management">
      <Row>
        <Col span={24}>
          <h3>Account Management</h3>
          <div className="account-management-image">
            <div className="account-management-image-coverimage">
              <img
                src="https://png.pngtree.com/background/20220714/original/pngtree-simple-solid-color-small-fresh-fashion-background-psd-picture-image_1615200.jpg"
                alt="cover"
              />
            </div>
            <div className="account-management-image-avatar">
              <img src="https://i.stack.imgur.com/Dj7eP.jpg" alt="avatar" />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <div className="account-management-information">
          <Col span={24}>
            <h6>Your information</h6>
            <p>Name : </p>
            <p>Birthday : </p>
            <p>Address : </p>
            <p>Phonenumber : </p>
            <span id="button">Change your password.</span>
          </Col>
        </div>
      </Row>
    </div>
  );
};

export default AccountManagement;
