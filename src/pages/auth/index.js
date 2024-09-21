import React, { useState } from "react";
import "./style.css";
import SignUp from "../../components/auth/signup";
import SignIn from "../../components/auth/signin";
import { Button } from "antd";
const AuthPage = () => {
  const [activeButton, setActiveButton] = useState("signin");
  return (
    <div className="main-component auth-page">
      <div className="signup-component">
        <div className="signup-sec row">
          <div className="col-3">
            <div className="d-flex flex-column align-items-center signup-button-sec">
              <Button
                onClick={() => setActiveButton("signin")}
                className={`${
                  activeButton === "signin"
                    ? "active animate__animated animate__fadeIn"
                    : ""
                }`}
              >
                Đăng nhập
              </Button>
              <Button
                onClick={() => setActiveButton("signup")}
                className={`${
                  activeButton === "signup"
                    ? "active animate__animated animate__fadeIn "
                    : ""
                }`}
              >
                Đăng ký
              </Button>
            </div>
            <div className="d-flex">
              <img
                src="https://media.tenor.com/1GY_AGNWy-UAAAAi/tkthao219-bubududu.gif"
                alt=""
                width="175"
                height="180"
              ></img>
            </div>
            <div className="d-flex">
              <img
                src="https://media.tenor.com/LZUBjmbft7YAAAAi/bear-panda.gif"
                alt=""
                width="175"
                height="180"
              ></img>
            </div>
          </div>
          {activeButton === "signup" ? (
            <SignUp setActiveButton={setActiveButton} />
          ) : (
            <SignIn />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
