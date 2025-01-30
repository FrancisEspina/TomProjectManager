import {
  AcademicCapIcon,
  AdjustmentsHorizontalIcon,
  ArrowRightIcon,
  BriefcaseIcon,
  CakeIcon,
  CalendarDateRangeIcon,
  MegaphoneIcon,
  PhoneIcon,
  QueueListIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import { TbBeach, TbOlympics } from "react-icons/tb";
import React from "react";
import { LiaGoogleDrive } from "react-icons/lia";
import { BiBullseye, BiDrink, BiMedal, BiParty } from "react-icons/bi";
import Calendar from "./ExecommComponents/Calendar";
import ProjectProgress from "./ExecommComponents/ProjectProgress";
import {
  FaNotesMedical,
  FaPeopleCarryBox,
  FaUserGraduate,
} from "react-icons/fa6";

const Execomm = () => {
  const generalTasks = [
    { name: "Announcements", icon: MegaphoneIcon },
    { name: "Meetings", icon: PhoneIcon },
    { name: "General Committees", icon: BriefcaseIcon },
    { name: "Alumni", icon: AcademicCapIcon },
    { name: "Residents", icon: UserGroupIcon },
    { name: "TOM Drives", icon: LiaGoogleDrive },
  ];

  const internalTasks = [
    { name: "Bulls", icon: BiBullseye },
    { name: "TOMlympics", icon: TbOlympics },
    { name: "Pungag", icon: BiDrink },
    { name: "Nightout", icon: BiParty },
    { name: "Sem Starter/Ender", icon: TbBeach },
    { name: "Rosebeer", icon: CakeIcon },
    { name: "Awards", icon: BiMedal },
  ];

  return (
    <>
      <h3 className="text-gray-500">EXECΩMM </h3>
      <br />
      <Section title={"General Tasks"} IconName={QueueListIcon} />
      <div className="relative">
        <div className="">
          <div className="grid grid-cols-1">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {generalTasks.map((widget, index) => (
                <div key={index}>
                  <Widget title={widget.name} IconName={widget.icon} />
                </div>
              ))}
            </div>

            <br />
            <hr />
            <br />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div>
                <Section
                  title={"Project Progress"}
                  IconName={AdjustmentsHorizontalIcon}
                />
                <ProjectProgress />
                <br />
                <Section title={"Internals"} IconName={FaPeopleCarryBox} />
                <div className="grid grid-cols-2 gap-2">
                  {internalTasks.map((widget, index) => (
                    <div key={index}>
                      <Widget title={widget.name} IconName={widget.icon} />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Section title={"Schedules"} IconName={CalendarDateRangeIcon} />
                <Calendar />
              </div>
            </div>
            <br />
            <hr />
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

const Section = ({ title, IconName }) => {
  return (
    <>
      <div className="flex items-center gap-1 mb-4 ">
        {IconName && (
          <>
            <IconName className="size-6 text-gray-400" />
          </>
        )}
        <div className="text-gray-400 text-lg">{title && title}</div>
      </div>
    </>
  );
};

const Widget = ({ title, IconName }) => {
  return (
    <>
      <div className="flex items-center hover:bg-amber-500 hover:text-white bg-white shadow-3xl relative p-6 cursor-pointer rounded-xl min-h-[10px] group">
        <div className="lg:flex items-center gap-2">
          {IconName && (
            <IconName className="size-12 group-hover:text-amber-500 bg-gray-200 rounded-full p-3" />
          )}
          <div className="text-sm mt-2 lg:mt-0">{title && title}</div>
        </div>
        <div className="ml-auto">
          <ArrowRightIcon className="hidden lg:block size-5 text-amber-500 group-hover:text-white" />
        </div>
      </div>
    </>
  );
};

export default Execomm;
