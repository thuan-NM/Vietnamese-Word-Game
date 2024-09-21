// import React, { useEffect, useState } from "react";
// import { Col, Flex, Modal, Row, Typography } from "antd";

// import api from "../../api";
// import "./style.css";
// import { useNavigate } from "react-router-dom";

// export default function SubjectListPage() {
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [challengeTypes, setChallengeType] = useState([
//     { value: "hangman", label: "Hanging man" },
//     { value: "qnas", label: "Chọn đáp án đúng" },
//     { value: "arrange", label: "Sắp xếp câu" },
//   ]);
//   const navigate = useNavigate();

//   const fetchData = async () => {
//     const response = await api.subjects.invoke();
//     setSubjects(response.data.data);
//   };

//   const play = (challengeType) => {
//     navigate(
//       `/take-challenge?challengeType=${challengeType}&subjectId=${selectedSubject._id}`
//     );
//   };

//   useEffect(() => {
//     // lay danh sach subject
//     fetchData();
//   }, []);

//   return (
//     <div className="subject-list-page">
//       <h2 className="subject-list-title">Hãy chọn một chủ đề </h2>{" "}
//       {subjects.length > 0 ? (
//         <Row gutter={[20, 20]} justify={"center"} className="subject-list">
//           {subjects.map((subject) => (
//             <Col sm={5} key={subject._id}>
//               <div
//                 className="subject-list-item"
//                 onClick={() => setSelectedSubject(subject)}
//               >
//                 {subject.name}
//               </div>
//             </Col>
//           ))}
//         </Row>
//       ) : (
//         <p>Loading Subjects ... </p>
//       )}
//       <Modal
//         title={selectedSubject?.name}
//         open={selectedSubject}
//         onCancel={() => setSelectedSubject(null)}
//         okButtonProps={{ style: { display: "none" } }}
//         cancelButtonProps={{ style: { display: "none" } }}
//       >
//         <Typography.Paragraph>Hãy chọn chế độ chơi :</Typography.Paragraph>
//         <Flex gap={20} className="challenge-type-list">
//           {challengeTypes.map((challengeType) => (
//             <div
//               className="challenge-type-list-item"
//               key={challengeType.value}
//               onClick={() => play(challengeType.value)}
//             >
//               {challengeType.label}
//             </div>
//           ))}
//         </Flex>
//       </Modal>
//     </div>
//   );
// }
