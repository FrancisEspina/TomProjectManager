import React from "react";
import * as api from "./../api";
import { useSelector } from "react-redux";
import { getCategoryName } from "../helpers/utils.jsx";
import * as DashboardComponents from "../components/DashboardComponents/DashboardComponents.jsx";
const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <>
      <div>
        <h5>Welcome </h5>
        <h2 className="font-semibold">
          <span>{getCategoryName(user.category)} </span> {user.first_name}
        </h2>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-2 gap-10">
          <DashboardComponents.CurrentProject />
        </div>
      </div>

      <br />
    </>
  );
};

export default Dashboard;
