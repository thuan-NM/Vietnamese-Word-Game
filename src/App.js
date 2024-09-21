import { Route, Routes } from "react-router-dom";

import { useAuth } from "./contexts/authcontext";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.css";
import "animate.css/source/animate.css";

import Navbar from "./components/navbar";
import TakeChallenge from "./components/takechallenge";
import TakeSubjects from "./components/takesubject";
import GameResult from "./components/gameresult";

import HomePage from "./pages/homepage";
import AuthPage from "./pages/auth";
import TakeChallengePage from "./pages/takechallengepage";
import SubjectListPage from "./pages/subjectlistpage";
import ProfilePage from "./pages/profilepage";
// import AccountPage from "./pages/accountpage";
import AdminPage from "./pages/adminpage";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Hiển thị nội dung tạm thời khi đang chờ đợi
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/subjects" element={<SubjectListPage />} />
        <Route path="/auth" element={<AuthPage />}></Route>
        <Route path="/take-challenge" element={<TakeChallengePage />} />
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
