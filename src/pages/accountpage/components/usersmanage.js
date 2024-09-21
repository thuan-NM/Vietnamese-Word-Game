import React from "react";
import { Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import "./style.css";

const UserManagement = () => {
  return (
    <div className="user-management">
      <Row>
        <Col span={24}>
          <h3>Users Management</h3>
          <div className="user-management-search">
            <SearchOutlined />
            <input placeholder="Tìm kiếm người dùng ..."></input>
          </div>
        </Col>
        <Row className="user-management-user-control">
          <Col span={6}>
            <span>Tên người dùng</span>
            <p>Người chơi 1</p>
            <p>Người chơi 1</p>
            <p>Người chơi 1</p>
            <p>Người chơi 1</p>
            <p>Người chơi 1</p>
            <p>Người chơi 1</p>
            <p>Người chơi 1</p>
            <p>Người chơi 1</p>
            <p>Người chơi 1</p>
            <p>Người chơi 1</p>
          </Col>
          <Col span={4}>
            <span>Tổng điểm</span>
            <p>15000</p>
            <p>15000</p>
            <p>15000</p>
            <p>15000</p>
            <p>15000</p>
            <p>15000</p>
            <p>15000</p>
            <p>15000</p>
            <p>15000</p>
            <p>15000</p>
          </Col>
          <Col span={6}>
            <span>Ngày đăng ký</span>
            <p>26/04/2024</p>
            <p>26/04/2024</p>
            <p>26/04/2024</p>
            <p>26/04/2024</p>
            <p>26/04/2024</p>
            <p>26/04/2024</p>
            <p>26/04/2024</p>
            <p>26/04/2024</p>
            <p>26/04/2024</p>
            <p>26/04/2024</p>
          </Col>
          <Col span={6}>
            <span>Quản lý tài khoản</span>
            <p>Xoá người chơi</p>
            <p>Xoá người chơi</p>
            <p>Xoá người chơi</p>
            <p>Xoá người chơi</p>
            <p>Xoá người chơi</p>
            <p>Xoá người chơi</p>
            <p>Xoá người chơi</p>
            <p>Xoá người chơi</p>
            <p>Xoá người chơi</p>
            <p>Xoá người chơi</p>
          </Col>
        </Row>
      </Row>
      <span>Trang trước </span>
      <span> 1/10</span>
      <span> Trang sau</span>
    </div>
  );
};
export default UserManagement;
