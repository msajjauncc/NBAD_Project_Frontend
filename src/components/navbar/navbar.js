import { DollarOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetState } from "../../redux/budget/reducer";
import { logout } from "../../redux/login/reducer";
import "./style.css";

const { Header } = Layout;

function Navbar() {
  const loginReducer = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const curLocation = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([]);

  const items = [
    {
      key: "addBudget",
      label: "Add Budget",
      onClick: () => navigate("/budget"),
    },
    {
      key: "addExpense",
      label: "Add Expense",
      onClick: () => navigate("/expense"),
    },
  ];

  function getLoginOrSignUp() {
    let pathname = curLocation.pathname;
    if (pathname === "/login") {
      return { name: "Sign up", url: "/signup" };
    }
    return { name: "Login", url: "/login" };
  }
  function dashboard() {
    setSelectedKeys([]);
    let pathname = curLocation.pathname;
    if (loginReducer.user) {
      navigate("/");
    } else {
      navigate(pathname);
    }
  }

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="pBudget" onClick={dashboard}>
          <DollarOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
          <p style={{ marginTop: "1px" }}> {"Personal Budget"}</p>
        </div>
        {loginReducer.user ? (
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedKeys}
            onSelect={({ key }) => setSelectedKeys([key])}
            items={items}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          />
        ) : (
          <Menu
            theme="dark"
            mode="horizontal"
            items={[]}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          />
        )}
        {loginReducer.user ? (
          <div
            className="pBudget"
            onClick={() => {
              dispatch(logout());
              dispatch(resetState());
              setSelectedKeys([]);
            }}
          >
            <div className="avatarDiv">
              <Avatar
                style={{
                  backgroundColor: "#f56a00",
                  fontSize: "18px",
                }}
              >
                {loginReducer.user.name[0].toUpperCase()}
              </Avatar>
            </div>
            <p className="logoutP" style={{ marginTop: "-1px" }}>
              {" "}
              {"Logout"}
            </p>
            <LogoutOutlined style={{ fontSize: "18px", marginLeft: "10px" }} />
          </div>
        ) : (
          <div
            className="pBudget"
            onClick={() => {
              navigate(getLoginOrSignUp().url);
            }}
          >
            <p style={{ marginTop: "1px" }}> {getLoginOrSignUp().name}</p>
          </div>
        )}
      </Header>
    </Layout>
  );
}

export default Navbar;
