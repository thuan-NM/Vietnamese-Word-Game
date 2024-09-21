// import React, { useState, useEffect } from "react";
// import { Row, Col, Flex } from "antd";

// import "./style.css";
// import AccountManagement from "./components/accountmanage";
// import UserManagement from "./components/usersmanage";
// import TopicsManagement from "./components/topicsmanage";
// import QuestionsManagement from "./components/questionsmanage";

// const AccountPage = () => {
//   const [selectedManagement, setSelectedManagement] = useState("questions"); // Initial state

//   const handleManagementClick = (management) => {
//     setSelectedManagement(management);
//   };

//   return (
//     <div className="account-page">
//       <Row gutter={[32, 16]}>
//         <Col
//           span={4}
//           style={{
//             border: "0.1rem solid #cdcdcd",
//             borderRadius: "12px",
//           }}
//         >
//           <div className="account-page-management">
//             <p
//               onClick={() => handleManagementClick("account")}
//               className={selectedManagement === "account" ? "active" : ""}
//             >
//               Account Management
//             </p>
//             <p
//               onClick={() => handleManagementClick("users")}
//               className={selectedManagement === "users" ? "active" : ""}
//             >
//               Users Management
//             </p>
//             <p
//               onClick={() => handleManagementClick("topics")}
//               className={selectedManagement === "topics" ? "active" : ""}
//             >
//               Topics Management
//             </p>
//             <p
//               onClick={() => handleManagementClick("questions")}
//               className={selectedManagement === "questions" ? "active" : ""}
//             >
//               Questions Management
//             </p>
//           </div>
//         </Col>
//         <Col span={20}>
//           <div className="account-page-management-items">
//             {selectedManagement === "account" && <AccountManagement />}
//             {selectedManagement === "users" && <UserManagement />}
//             {selectedManagement === "topics" && <TopicsManagement />}
//             {selectedManagement === "questions" && <QuestionsManagement />}
//           </div>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default AccountPage;
