import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  GooglePlusOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../../contexts/authcontext";

import "./style.css";

const SignIn = () => {
  const [form] = Form.useForm();
  const [typeOfAccount, setTypeOfAccount] = useState("user");
  const navigate = useNavigate();
  const { login } = useAuth();
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };

  const handleSignIn = async (values) => {
    const { email, password } = values;
    const url =
      typeOfAccount === "user"
        ? "https://x21-be.onrender.com/users/login"
        : "https://x21-be.onrender.com/admins/login";

    try {
      const res = await axios.post(url, { email, password });
      if (res.data.isSuccess == 1) {
        login(res.data, res.data.token);
        message.success(
          `Đăng nhập thành công với ${
            typeOfAccount === "user"
              ? "tài khoản người dùng"
              : "tài khoản quản trị viên"
          }.`
        );
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  return (
    <div className="col-9">
      <div className="signup-header animate__animated  animate__fadeIn">
        Đăng nhập
      </div>
      <Form
        {...formItemLayout}
        form={form}
        variant="filled"
        className="animate__animated animate__fast animate__zoomIn mt-5"
        onFinish={handleSignIn}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email!",
            },
            {
              type: "email",
              message: "Email không hợp lệ!",
            },
          ]}
        >
          <Input className="label-input" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
        >
          <Input.Password className="label-input" />
        </Form.Item>
        <Button htmlType="submit">Đăng nhập</Button>
      </Form>
      {/* <div className="social-account animate__animated animate__zoomIn">
        <button className="social-account-item">
          <GooglePlusOutlined />
          Đăng nhập với Google
        </button>
        <button className="social-account-item">
          <TwitterOutlined />
          Đăng nhập với Twitter
        </button>
        <button className="social-account-item">
          <FacebookOutlined />
          Đăng nhập với Faceboock
        </button>
      </div> */}
      <div className="account-sec animate__animated animate__zoomIn">
        <Button
          className={`account-btn ${
            typeOfAccount === "user"
              ? "active animate__animated animate__faster animate__zoomIn"
              : ""
          }`}
          onClick={() => setTypeOfAccount("user")}
        >
          Người dùng đăng nhập
        </Button>
        <Button
          className={`account-btn ${
            typeOfAccount === "admin"
              ? "active animate__animated animate__faster animate__zoomIn"
              : ""
          }`}
          onClick={() => setTypeOfAccount("admin")}
        >
          Đăng nhập Quản Trị Viên
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
