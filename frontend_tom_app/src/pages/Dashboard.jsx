import React from "react";
import * as api from "./../api";
import { persistor } from "./../services/store/Store";
import { useSelector } from "react-redux";
import LogoutButton from "../components/LogoutButton.jsx";
const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const logoutUser = () => {
    api.logoutUser();
  };
  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <div>{user ? user.email : "No Logged in User"}</div>
        <br />
        <LogoutButton />
      </div>
    </>
  );
};

export default Dashboard;
