import React, { useEffect, useState } from "react";
import * as Calendar from "./ExecommComponents/Calendar";
import * as api from "./../api";
import { current_user, getCategoryName } from "../helpers/utils.jsx";
import * as DashboardComponents from "../components/DashboardComponents/DashboardComponents.jsx";
import { FaCalendar } from "react-icons/fa";
import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import { current } from "@reduxjs/toolkit";
const Dashboard = () => {
  const [latesPost, setLatestPost] = useState(null);
  useEffect(() => {
    getLatestPost();
  }, []);

  const getLatestPost = async () => {
    const response = await api.getPosts();
    setLatestPost(response.posts[0]);
  };
  const user = current_user();
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
          <DashboardComponents.Clock time={true} day={true} date={true} />
        </div>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-5">
          <DashboardComponents.CurrentProject />
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-3 ">
        <div className="flex-auto lg:basis-1/3 basis-1/2">
          <DashboardComponents.DashBoardAnnouncements />
        </div>
        <div className="flex-auto lg:basis-1/3 basis-1/2">
          {<DashboardComponents.DashBoardPoll />}
        </div>
        <div className="flex-auto lg:basis-auto basis-1/2 ">
          <DashboardComponents.DashboardResidents />
        </div>

        <div className="flex-auto lg:basis-1/2 basis-1/2">
          <DashboardComponents.DashboardFeed latestPost={latesPost} />
        </div>

        <div className="flex-auto">
          <div className="card-sm">
            <DashboardComponents.CardTitle
              title="Calendar"
              IconName={CalendarDateRangeIcon}
            />
            <hr />
            <div className="mt-3">
              <Calendar.Dates />
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Dashboard;

// <div className="mt-2">
//   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-7">
//     <div className="col-span-1 sm:col-span-2 lg:col-span-3 lg:order-first">
//       <DashboardComponents.DashboardFeed latestPost={latesPost} />
//       <br />
//       <DashboardComponents.DashBoardPoll />
//     </div>

//     <div className="col-span-1 sm:col-span-1 xl:col-span-2 order-first lg:order-1">
//       <DashboardComponents.DashBoardAnnouncements />
//       <br />
//       <DashboardComponents.DashBoardPoll />
//     </div>

//     <div className="col-span-1 sm:col-span-1 lg:col-span-2 lg:order-last">
//       <DashboardComponents.DashboardResidents />
//     </div>
//   </div>
// </div>;
