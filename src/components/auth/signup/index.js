import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  message,
} from "antd";

import "./style.css";

import UserService from "../../../services/user.service";

const SignUp = ({ setActiveButton }) => {
  const [form] = Form.useForm();

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

  const handleSignUp = async (values) => {
    const { fullName, email, password, gender, dob, confirmPassword, phone } =
      values;
    const avatar = `https://api.dicebear.com/7.x/miniavs/svg?seed=${
      Math.floor(Math.random() * (10000 - 0 + 1)) + 0
    }`;
    if (password !== confirmPassword) {
      message.error("Mật khẩu nhập lại không khớp.");
      return;
    }

    try {
      const res = await UserService.register({
        fullName,
        phone,
        email,
        password,
        avatar,
        gender,
        dob,
        totalpoint: 0,
      });
      message.success("Đăng ký thành công.");
      setActiveButton("signin");
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  return (
    <div className="col-9">
      <div className="signup-header animate__animated animate__fadeIn">
        Đăng ký
      </div>
      <Form
        {...formItemLayout}
        form={form}
        variant="filled"
        className="animate__animated animate__faster animate__zoomIn"
        onFinish={handleSignUp}
      >
        <Form.Item
          label="Họ tên"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập họ tên!",
            },
          ]}
        >
          <Input className="auth-input" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Vui lòng nhập đúng định dạng email!",
            },
          ]}
        >
          <Input className="auth-input" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            {
              required: true,
              pattern: new RegExp(/^[0-9\b]+$/),
              message: "Vui lòng nhập đúng định dạng số!",
            },
          ]}
        >
          <Input className="auth-input" />
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
          <Input.Password className="auth-input" />
        </Form.Item>
        <Form.Item
          label="Nhập lại mật khẩu"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập lại mật khẩu!",
            },
          ]}
        >
          <Input.Password className="auth-input" />
        </Form.Item>

        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn giới tính!",
            },
          ]}
        >
          <Select
            className="auth-input"
            placeholder="Chọn giới tính"
            options={[
              {
                value: "male",
                label: "Nam",
              },
              {
                value: "female",
                label: "Nữ",
              },
              {
                value: "unexpected",
                label: "Không xác định",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Ngày sinh"
          name="dob"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày sinh!",
            },
          ]}
          className="text-start "
        >
          <DatePicker className="auth-input" placeholder="Chọn ngày" />
        </Form.Item>

        <Button
          htmlType="submit"
          className="animate__animated animate__fast animate__zoomIn"
        >
          Đăng ký
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
