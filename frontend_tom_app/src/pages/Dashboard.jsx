import React from "react";
import * as api from "./../api";
import { useSelector } from "react-redux";
import LogoutButton from "../components/LogoutButton.jsx";
import { getCategoryName } from "../helpers/utils.jsx";
const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <>
      <div style={{ height: "2000px" }}>
        <h5>Welcome </h5>
        <h2>
          <b>
            <span>{getCategoryName(user.category)} </span> {user.first_name}
          </b>
        </h2>
        <br />
        <LogoutButton />
      </div>
    </>
  );
};

export default Dashboard;
