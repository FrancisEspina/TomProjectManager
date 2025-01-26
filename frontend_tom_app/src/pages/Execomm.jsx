import {
  ArrowRightIcon,
  BriefcaseIcon,
  MegaphoneIcon,
  PhoneIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { LiaGoogleDrive } from "react-icons/lia";
import { BiBullseye } from "react-icons/bi";
import Calendar from "./ExecommComponents/Calendar";
import ProjectProgress from "./ExecommComponents/ProjectProgress";

const Execomm = () => {
  const widgets = [
    { name: "Announcements", icon: MegaphoneIcon },
    { name: "Meetings", icon: PhoneIcon },
    { name: "General Committees", icon: BriefcaseIcon },
    { name: "Bulls", icon: BiBullseye },
    { name: "Residents", icon: UserGroupIcon },
    { name: "TOM Drives", icon: LiaGoogleDrive },
  ];

  return (
    <>
      <h3 className="text-gray-500">EXECΩMM </h3>
      <div className="relative" style={{ height: "calc(100vh - 120px)" }}>
        <div className=" h-full">
          <div className="grid grid-cols-1">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {widgets.map((widget, index) => (
                <div
                  key={index}
                  className="flex items-center hover:bg-amber-500 hover:text-white bg-white shadow-3xl relative p-6 cursor-pointer rounded-xl min-h-[10px] group"
                >
                  <div className="lg:flex items-center gap-2">
                    <widget.icon className="size-12 group-hover:text-amber-500 bg-gray-200 rounded-full p-3" />
                    <div className="text-sm mt-2 lg:mt-0">{widget.name}</div>
                  </div>
                  <div className="ml-auto">
                    <ArrowRightIcon className="hidden lg:block size-5 text-amber-500 group-hover:text-white" />
                  </div>
                </div>
              ))}
            </div>

            <br />
            <hr />
            <br />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <ProjectProgress />
              </div>

              <div>
                <Calendar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Execomm;
