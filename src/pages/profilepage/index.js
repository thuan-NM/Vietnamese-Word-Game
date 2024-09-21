import React, { useState } from "react";
import moment from "moment";
import "./style.css";
import { useAuth } from "../../contexts/authcontext";
import {
  Button,
  Divider,
  Modal,
  DatePicker,
  Form,
  Input,
  Select,
  message,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import UserService from "../../services/user.service";

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  console.log(user.user.totalpoint);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue({
      fullName: user.user.fullName,
      email: user.user.email,
      phone: user.user.phone,
      gender: user.user.gender,
      password: user.user.password,
      dob: moment(user.user.dob),
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dob = new Date(user.user.dob);

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

  const handleEdit = async (values) => {
    const { fullName, email, password, gender, dob, phone } = values;
    const newdata = {
      fullName,
      email,
      password,
      gender,
      dob,
      phone,
    };
    // try {
    //   const res = await UserService.changeInfo(user.user._id, newdata);
    //   message.success("Cập nhật thông tin thành công.");
    //   handleCancel();
    //   updateUser();
    // } catch (error) {
    //   console.log(error);
    //   message.error(error.response.data.message);
    // }
  };

  return (
    <div className="row profile-main">
      <div className="profile-title">
        <h2>Thông tin cá nhân</h2>
      </div>
      <div className="col-3">
        <img
          className="mb-4 text-center"
          src={String.fromCharCode.apply(null, user.user.avatar.data)}
        ></img>
        {/* <h2 className="mt-5 info">{user.user.fullName}</h2> */}
      </div>
      <div className="col-9">
        <Divider orientation="center" plain>
          Full name:
        </Divider>
        <p className="info">{user.user.fullName}</p>
        <Divider orientation="center" plain>
          Email:
        </Divider>
        <p className="info">{user.user.email}</p>
        <Divider orientation="center" plain>
          Phone:
        </Divider>
        <p className="info">{user.user.phone}</p>
        <Divider orientation="center" plain>
          Gender:
        </Divider>
        <p className="info">{user.user.gender == "male" ? "Nam" : "Nữ"}</p>
        <Divider orientation="center" plain>
          Date of birth:
        </Divider>
        <p className="info">
          {dob.getDate()}-{dob.getMonth() + 1}-{dob.getFullYear()}
        </p>
        <Button onClick={showModal} className="p-0 my-4">
          {" "}
          <EditOutlined />{" "}
        </Button>
        <Modal
          className="modal-edit"
          title="Cập nhật thông tin của bạn tại đây"
          open={isModalOpen}
          footer=""
          onCancel={handleCancel}
        >
          <Form
            {...formItemLayout}
            form={form}
            variant="filled"
            className="animate__animated animate__faster animate__zoomIn"
            onFinish={handleEdit}
          >
            <Form.Item
              label="Họ tên"
              name="fullName"
              rules={[
                {
                  message: "Vui lòng nhập họ tên!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Vui lòng nhập đúng định dạng email!",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  pattern: new RegExp(/^[0-9\b]+$/),
                  message: "Vui lòng nhập đúng định dạng số!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  message: "Vui lòng nhập mật khẩu!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Giới tính"
              name="gender"
              rules={[
                {
                  message: "Vui lòng chọn giới tính!",
                },
              ]}
            >
              <Select
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
                ]}
              />
            </Form.Item>
            <Form.Item label="Ngày sinh" name="dob" className="text-start">
              <DatePicker placeholder="Chọn ngày" />
            </Form.Item>

            <Button
              className="animate__animated animate__faster animate__zoomIn"
              htmlType="submit"
            >
              Cập nhật
            </Button>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ProfilePage;
