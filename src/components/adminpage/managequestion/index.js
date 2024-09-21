import { Button, message, Dropdown, Select, Modal, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Option } from "antd/es/mentions";
import SubjectsService from "../../../services/subject.service";
const { TextArea } = Input;

const ManageQuestion = () => {
  const [qnas, setQnas] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [challengeType, setChallengeType] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [form] = Form.useForm();
  const showModal = (qna) => {
    if (qna._id) {
      form.setFieldsValue({
        challengeType: qna.challengeType,
        question: qna.question,
        answers: qna.answers ? qna.answers.join(",") : undefined,
        rightAnswer: qna.rightAnswer,
        subject: qna.subjectId,
      });
      setChallengeType(qna.challengeType);
      setCurrentQuestion(qna);
      setIsModalVisible(true);
    } else {
      setIsModalVisible(true);
    }
  };

  const createQuestion = async (payload) => {
    try {
      await axios.post("https://x21-be.onrender.com/qnas/admin", payload);
      message.success("Câu hỏi mới đã được tạo thành công!");
    } catch (error) {
      console.log(error);
      message.error("Có lỗi xảy ra khi tạo câu hỏi mới");
    }
  };

  const updateQuestion = async (id, payload) => {
    try {
      await axios.put(`https://x21-be.onrender.com/qnas/${id}`, payload);
      message.success("Câu hỏi đã được cập nhật thành công!");
    } catch (error) {
      console.log(error);
      message.error("Có lỗi xảy ra khi cập nhật câu hỏi");
    }
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    const { question, answers, rightAnswer, subject } = values;
    let payload;
    if (answers != undefined) {
      payload = {
        question,
        answers: answers.split(","),
        challengeType: challengeType,
        rightAnswer,
        subjectId: subject,
      };
    } else {
      payload = {
        question,
        challengeType: challengeType,
        rightAnswer,
        subjectId: subject,
      };
    }
    try {
      if (currentQuestion != null) {
        // Update the existing question
        await updateQuestion(currentQuestion._id, payload);
      } else {
        // Create a new question
        await createQuestion(payload);
      }
      // Refresh the list of questions
      const response = await axios.get(
        "https://x21-be.onrender.com/qnas/admin"
      );
      setQnas(response.data.questions);
    } catch (error) {
      console.log(error);
      message.error("Có lỗi xảy ra khi tạo hoặc cập nhật câu hỏi");
    }
    setIsModalVisible(false);
    setCurrentQuestion(null); // Reset the current question
    form.resetFields();
  };

  const handleCancel = () => {
    setCurrentQuestion(null);
    setIsModalVisible(false);
  };

  const handleChange = (value) => {
    setChallengeType(value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://x21-be.onrender.com/qnas/admin"
        );
        const subjectresponse = await SubjectsService.getAll();
        setSubjects(subjectresponse.data);
        setQnas(response.data.questions);
      } catch (error) {
        console.log(error);
        message.error(error.response.data.message);
      }
    };

    fetchData();
  }, [qnas, subjects]);
  const deleteQuestion = async (id) => {
    try {
      await axios.delete(`https://x21-be.onrender.com/qnas/${id}`);
      message.success("Câu hỏi đã được xóa thành công!");
      // Refresh the list of questions
      const response = await axios.get(
        "https://x21-be.onrender.com/qnas/admin"
      );
      setQnas(response.data.questions);
    } catch (error) {
      console.log(error);
      message.error("Có lỗi xảy ra khi xóa câu hỏi");
    }
  };
  return (
    <div className="col-9">
      <div className="choose-title">
        <h4>Quản lý câu hỏi</h4>
      </div>
      <Button className="btn-adding mt-3" onClick={showModal}>
        <PlusCircleOutlined />
      </Button>
      <Modal
        title="Chọn loại thách thức"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <Form form={form}>
          <Form.Item name="challengeType" label="Loại thách thức">
            <Select onChange={handleChange}>
              <Select.Option value="">
                Vui lòng chọn một loại thử thách để thêm{" "}
              </Select.Option>
              <Select.Option value="hangman">Hangman</Select.Option>
              <Select.Option value="arrange">Arrange</Select.Option>
              <Select.Option value="qnas">QnAs</Select.Option>
            </Select>
          </Form.Item>
          {challengeType === "qnas" && (
            <div>
              <div className="form-component">
                <Form.Item name="question" label="Câu hỏi">
                  <TextArea rows={3} />
                </Form.Item>
                <Form.Item name="answers" label="Các phương án">
                  <Input placeholder="Nhập các phương án, phân tách bằng dấu ," />
                </Form.Item>
                <Form.Item name="rightAnswer" label="Câu trả lời đúng">
                  <Input />
                </Form.Item>
                <Form.Item name="subject" label="Chủ đề">
                  <Select>
                    {subjects.map((subject) => (
                      <Select.Option key={subject._id} value={subject._id}>
                        {subject.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
          )}
          {challengeType === "arrange" && (
            <div>
              <div className="form-component">
                <Form.Item name="question" label="Câu hỏi">
                  <TextArea rows={3} />
                </Form.Item>
                <Form.Item name="subject" label="Chủ đề">
                  <Select>
                    {subjects.map((subject) => (
                      <Select.Option key={subject._id} value={subject._id}>
                        {subject.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="rightAnswer" label="Các từ cần sắp xếp">
                  <Input placeholder="Nhập các từ cần sắp xếp, phân tách bằng dấu ," />
                </Form.Item>
              </div>
            </div>
          )}
          {challengeType === "hangman" && (
            <div className="form-component">
              <Form.Item name="question" label="Câu hỏi">
                <TextArea rows={3} />
              </Form.Item>
              <Form.Item name="subject" label="Chủ đề">
                <Select>
                  {subjects.map((subject) => (
                    <Select.Option key={subject._id} value={subject._id}>
                      {subject.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="rightAnswer" label="Câu trả lời đúng">
                <Input />
              </Form.Item>
            </div>
          )}
        </Form>
      </Modal>
      {qnas.length > 0 ? (
        <div className="row questions-list">
          {qnas.map((qna) => (
            <div key={qna._id} className="question-item col-3">
              <div className="question-item-header">
                <span className="title me-2">Câu hỏi:</span>
                <span>{qna.question}</span>
              </div>

              <div className="question-item-body">
                <span className="title me-2">Cách chơi:</span>
                <span>{qna.challengeType}</span>
              </div>
              <div className="question-item-answer">
                <span className="title me-2">Đáp án:</span>
                <span>{qna.rightAnswer}</span>
              </div>
              <div className="question-item-actions">
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: (
                          <EditOutlined
                            className="dropdown-item"
                            onClick={() => showModal(qna)}
                          />
                        ),
                      },
                      {
                        key: "2",
                        label: (
                          <DeleteOutlined
                            className="dropdown-item"
                            onClick={() => deleteQuestion(qna._id)}
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
            </div>
          ))}
        </div>
      ) : (
        <p>Loading Subjects ... </p>
      )}
    </div>
  );
};

export default ManageQuestion;
