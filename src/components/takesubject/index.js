// import React, { useState, useEffect } from "react";
// import { Row, Flex, Col } from "antd";
// import axios from "axios";

// import "./style.css";
// import TakeChallenge from "../takechallenge";

// const TakeSubjects = () => {
//   const [subjects, setSubjects] = useState([]);
//   const [gameModes, setGameModes] = useState(["hangman", "arrange", "qnas"]);
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [selectedGameMode, setSelectedGameMode] = useState(null);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("https://x21-be.onrender.com/subjects");
//         setSubjects(response.data.data);
//       } catch (error) {
//         console.error("Error fetching subjects:", error);
//       }
//     };
//     setTimeout(() => {
//       fetchData();
//     }, 1500);
//   }, []);

//   const handleChooseSubject = (subject) => {
//     setSelectedSubject(subject);
//   };

//   const handleChooseGameMode = (gamemode) => {
//     if (!selectedSubject) {
//       console.warn("Please choose a subject first !!!");
//       return;
//     } else {
//       setSelectedGameMode(gamemode);
//       // console.log({
//       //   data: {
//       //     selectedSubject,
//       //     selectedGameMode: gamemode,
//       //   },
//       // });
//     }
//   };
//   return (
//     <div>
//       {subjects.length > 0 ? (
//         <Row>
//           <Col span={24}>
//             <Flex align="center" gap={20} justify="center">
//               {subjects.map((subject) => {
//                 return (
//                   <div
//                     className={
//                       selectedSubject
//                         ? "take-subject-choose-subject-none"
//                         : "take-subject-choose-subject"
//                     }
//                   >
//                     <button onClick={() => handleChooseSubject(subject)}>
//                       {subject.name}
//                     </button>
//                   </div>
//                 );
//               })}
//             </Flex>
//           </Col>
//         </Row>
//       ) : (
//         <p>Loading Subjects ... </p>
//       )}

//       {selectedSubject && (
//         <div>
//           <Row>
//             <Col span={24}>
//               <Flex gap={10} justify="center">
//                 {gameModes.map((gamemode) => {
//                   return (
//                     <p className="take-subject-choose-gamemode">
//                       <button onClick={() => handleChooseGameMode(gamemode)}>
//                         {gamemode}
//                       </button>
//                     </p>
//                   );
//                 })}
//               </Flex>
//             </Col>
//           </Row>
//         </div>
//       )}
//       {selectedGameMode && selectedSubject && (
//         <TakeChallenge
//           subjectId={selectedSubject._id}
//           challengeType={selectedGameMode}
//         />
//       )}
//     </div>
//   );
// };

// export default TakeSubjects;
