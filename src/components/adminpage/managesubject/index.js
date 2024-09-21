import React, { useState, useEffect } from "react";
import { Button, message, Modal, Form, Input, Dropdown } from "antd";
import SubjectsService from "../../../services/subject.service";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import axios from "axios";

const ManageSubject = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();
    try {
      if (selectedSubject) {
        await axios.put(
          `https://x21-be.onrender.com/subjects/${selectedSubject._id}`,
          values
        );
        message.success("Chủ đề đã được cập nhật thành công!");
      } else {
        await axios.post("https://x21-be.onrender.com/subjects", values);
        message.success("Chủ đề mới đã được tạo thành công!");
      }
      // Refresh the list of subjects
      const response = await SubjectsService.getAll();
      setSubjects(response.data);
    } catch (error) {
      console.log(error);
      message.error("Có lỗi xảy ra khi cập nhật chủ đề");
    }
    setIsModalOpen(false);
    setSelectedSubject(null);
    form.resetFields();
  };

  const showModal = (subject) => {
    if (subject._id) {
      setSelectedSubject(subject);
      form.setFieldsValue({
        name: subject ? subject.name : null,
      });
      setIsModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedSubject(null);
    form.resetFields();
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SubjectsService.getAll();
        setSubjects(response.data);
      } catch (error) {
        console.log(error);
        message.error(error.response.data.message);
      }
    };

    fetchData();
  }, []);
  const deleteSubject = async (id) => {
    try {
      await axios.delete(`https://x21-be.onrender.com/subjects/${id}`);
      message.success("Chủ đề đã được xóa thành công!");
      // Refresh the list of subjects
      const response = await SubjectsService.getAll();
      setSubjects(response.data);
    } catch (error) {
      console.log(error);
      message.error("Có lỗi xảy ra khi xóa chủ đề");
    }
  };

  return (
    <div className="col-9">
      <div className="choose-title">
        <h4>Chủ đề</h4>
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
        <Form form={form}>
          <Form.Item
            name="name"
            label="Tên chủ đề"
            rules={[{ required: true, message: "Vui lòng nhập tên chủ đề!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {subjects.length > 0 ? (
        <div className="d-flex flex-row flex-wrap subject-main">
          {subjects.map((subject) => (
            <div
              key={subject._id}
              className="subject-item"
              onClick={() => setSelectedSubject(subject)}
            >
              <img src="/images/subjectimg.jpg"></img>
              <span>{subject.name}</span>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "1",
                      label: (
                        <EditOutlined
                          className="dropdown-item"
                          onClick={() => showModal(subject)}
                        />
                      ),
                    },
                    {
                      key: "2",
                      label: (
                        <DeleteOutlined
                          className="dropdown-item"
                          onClick={() => deleteSubject(subject._id)}
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
        <p>Loading Subjects ... </p>
      )}
    </div>
  );
};

export default ManageSubject;
