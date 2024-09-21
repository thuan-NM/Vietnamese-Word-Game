import React from "react";
import "./style.css";
import { SettingOutlined, DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useAuth } from "../../contexts/authcontext";
import { Dropdown, Space } from "antd";

const Navbar = () => {
  const { logout } = useAuth();
  const items = [
    {
      label: <Link to={"/profile"}>Hồ sơ của bạn</Link>,
      key: "0",
    },
    {
      label: (
        <Link to={"/auth"} onClick={logout}>
          Đăng Xuất
        </Link>
      ),
      key: "1",
    },
  ];
  const storedToken = localStorage.getItem("token");
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>; // Hiển thị nội dung tạm thời khi đang chờ đợi
  }
  return (
    <div className="nav-bar">
      <div className="list-nav-item">
        <img src="/images/logo.png" alt=""></img>
        {/* <img
          src="https://media2.giphy.com/headers/shanebeam/myU7u7UKroOg.gif"
          jsaction="VQAsE"
          className="sFlh5c pT0Scc iPVvYb"
          alt="Explore weekday GIFs"
          jsname="kn3ccd"
          height={"45px"}
        ></img> */}
      </div>
      <ul className="list-nav-item">
        {user && user.role == "admin" && (
          <Link to={"/admin"}>
            <Button className="nav-item">Quản lý</Button>
          </Link>
        )}
        <Link to={"/"}>
          <Button className="nav-item">Trang Chủ</Button>
        </Link>
        {!storedToken ? (
          <Link to={"/auth"}>
            <Button className="nav-item">Đăng nhập</Button>
          </Link>
        ) : (
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            {user && (
              <Button
                onClick={(e) => e.preventDefault()}
                className="nav-item px-2"
              >
                <Space>
                  {user.user.fullName}
                  <DownOutlined />
                </Space>
              </Button>
            )}
          </Dropdown>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
