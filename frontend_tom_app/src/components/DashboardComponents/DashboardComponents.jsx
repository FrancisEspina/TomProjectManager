import React from "react";
import * as Outlined from "@heroicons/react/24/outline";
import ButtonIcon from "../ButtonIcon";
import { Link } from "react-router-dom";
export const CurrentProject = () => {
  return (
    <>
      {/* column 1 */}
      <div className="bg-gray-200 rounded-2xl p-5">
        <div className="">
          <div className="flex items-center">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <Outlined.FolderIcon className="size-5" />
                <p>Current Project</p>
              </div>
              <h1 className=" text-pink-500 font-bold">SAGSAR 2025</h1>
            </div>
          </div>
        </div>
        <br />
        <div className="flex gap-2 justify-start">
          <ButtonIcon
            color={"gray"}
            icon={Outlined.DocumentIcon}
            text={"POA"}
            path={"/poa"}
          />
          <ButtonIcon
            color={"gray"}
            icon={Outlined.UsersIcon}
            text={"Committees"}
            path={"/projects"}
          />
        </div>
      </div>
      {/* column 2 */}
      <div className="">
        <div className="flex flex-col">
          <div>
            <div className="flex gap-1 items-center mb-1">
              <Outlined.CalendarIcon className="size-5" />
              <p>Event Date</p>
            </div>
            <h4 className="text-gray-700">February 27, 2025</h4>
          </div>
          <br />
          <div className="flex items-center">
            <div>
              <div className="flex gap-1 items-center mb-1">
                <Outlined.BanknotesIcon className="size-5" />
                <p>Solicitaions</p>
              </div>
              <h4 className="text-gray-700">P 54,302 / P 114,000</h4>
            </div>

            <div className="ml-auto ">
              <ButtonIcon icon={Outlined.EyeIcon} />
            </div>
          </div>
        </div>
      </div>
      {/* col 3 */}
      <div className="flex flex-col items-center ">
        <div className="flex w-full">
          <div>
            <div className="flex gap-1 items-center">
              <Outlined.CalendarIcon className="size-5" />
              <p>My Committee</p>
            </div>
            <h3>
              <b>Logistics</b>
            </h3>
            <br />
          </div>
          <div className="ml-auto ">
            <ButtonIcon icon={Outlined.BriefcaseIcon} />
          </div>
        </div>

        <div className="bg-green-500 flex justify-start rounded-lg text-white p-2">
          <h6>Meeting Ongoing</h6>
        </div>

        <div className="flex w-full">
          <div>
            <div className="flex gap-1 items-center mb-1">
              <Outlined.CalendarIcon className="size-5" />
              <p>Next Meeting</p>
            </div>
            <h4>January 29, 2025 | 8:00 PM </h4>
            <br />
          </div>
          <div className="ml-auto ">
            <ButtonIcon icon={Outlined.LinkIcon} />
          </div>
        </div>
      </div>
    </>
  );
};

export const ProjectCommittee = () => {
  return (
    <>
      <div className="card">
        <div className="flex items-center">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Outlined.UserIcon className="size-5" />
              <p>My General Committe</p>
            </div>
            <h3 className="text-pink-700">
              <b>Publicity</b>
            </h3>
          </div>
        </div>
        <br />
        <div className="flex gap-2">
          <button>View Tasks</button>
          <button className="bg-gray-200 border border-1">
            View Announcements
          </button>
        </div>
      </div>
    </>
  );
};
