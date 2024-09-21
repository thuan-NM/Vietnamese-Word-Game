import React, { useState, useEffect } from "react";
import { Button, message, Modal, Form, Input, Dropdown } from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import axios from "axios";

const ManageAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();
    try {
      if (selectedAdmin) {
        await axios.put(
          `https://x21-be.onrender.com/admins/changeinfo/${selectedAdmin._id}`,
          values
        );
        message.success("Admin đã được cập nhật thành công!");
      } else {
        await axios.post("https://x21-be.onrender.com/admins/register", values);
        message.success("Admin mới đã được tạo thành công!");
      }
      // Refresh the list of admins
      const response = await axios.get("https://x21-be.onrender.com/admins");
      setAdmins(response.data);
    } catch (error) {
      console.log(error);
      message.error("Có lỗi xảy ra khi cập nhật admin");
    }
    setIsModalOpen(false);
    setSelectedAdmin(null);
    form.resetFields();
  };

  const showModal = (admin) => {
    if (admin._id) {
      setSelectedAdmin(admin);
      form.setFieldsValue({
        fullName: admin.fullName,
        email: admin.email,
        password: admin.password,
      });
      setIsModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null);
    form.resetFields();
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://x21-be.onrender.com/admins");
        setAdmins(response.data);
      } catch (error) {
        console.log(error);
        message.error(error.response.data.message);
      }
    };

    fetchData();
  }, []);
  const deleteAdmin = async (id) => {
    try {
      await axios.delete(`https://x21-be.onrender.com/admins/${id}`);
      message.success("Admin đã được xóa thành công!");
      // Refresh the list of admins
      const response = await axios.get("https://x21-be.onrender.com/admins");
      setAdmins(response.data);
    } catch (error) {
      console.log(error);
      message.error("Có lỗi xảy ra khi xóa admin");
    }
  };

  return (
    <div className="col-9">
      <div className="choose-title">
        <h4>Quản lý Admin</h4>
      </div>
      <Button className="btn-adding mt-3" onClick={showModal}>
        <PlusCircleOutlined />
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form name="admin_form">
          <Form.Item name="fullName" label="Tên đầy đủ">
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>

          <Form.Item name="password" label="Mật khẩu">
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
      {admins.length > 0 ? (
        <div className="row questions-list">
          {admins.map((admin, index) => (
            <div
              key={admin._id}
              className="question-item admin-item col-3"
              onClick={() => setSelectedAdmin(admin)}
            >
              <div className="question-item-answer">
                <span className="title me-2">STT:</span>
                <span>{index + 1}</span>
              </div>
              <div className="question-item-answer">
                <span className="title me-2">Họ và tên:</span>
                <span>{admin.fullName}</span>
              </div>
              <div className="question-item-answer">
                <span className="title me-2">Email:</span>
                <span>{admin.email}</span>
              </div>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "1",
                      label: (
                        <EditOutlined
                          className="dropdown-item"
                          onClick={() => showModal(admin)}
                        />
                      ),
                    },
                    {
                      key: "2",
                      label: (
                        <DeleteOutlined
                          className="dropdown-item"
                          onClick={() => deleteAdmin(admin._id)}
                        />
                      ),
                    },
                  ],
                }}
              >
                <Button className="dropdown-editing">
                  <EllipsisOutlined />
                </Button>
              </Dropdown>
            </div>
          ))}
        </div>
      ) : (
        <p>Không có admin nào.</p>
      )}
    </div>
  );
};

export default ManageAdmin;
