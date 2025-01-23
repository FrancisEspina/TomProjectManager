import React from "react";
import * as api from "./../api";
import { useSelector } from "react-redux";
import { getCategoryName } from "../helpers/utils.jsx";
import * as DashboardComponents from "../components/DashboardComponents/DashboardComponents.jsx";
const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  return (
    //      <DashboardComponents.CurrentProject />
    <div className="">
      <div className="flex items-center">
        <div>
          <h4 className="text-amber-500">Welcome </h4>
          <div className="text-2xl lg:text-3xl md:text-2xl font-semibold">
            <span>{getCategoryName(user && user.category)} </span>{" "}
            {user && user.first_name}
          </div>
          <h4 className="mt-1 text-gray-500">
            {user.year ? user.year : "XXXX"} |{" "}
            {user.batch_name ? user.batch_name : "Batch Name"}
          </h4>
        </div>

        <div className="ml-auto">
          <DashboardComponents.Clock />
        </div>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-5">
          <DashboardComponents.CurrentProject />
        </div>
      </div>

      <div className="mt-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-7">
          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
            <DashboardComponents.DashboardFeed />
          </div>

          <div className="col-span-1 sm:col-span-1 xl:col-span-2">
            <DashboardComponents.DashBoardAnnouncements />
          </div>

          <div className="col-span-1 sm:col-span-1 lg:col-span-2">
            <DashboardComponents.DashboardResidents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
