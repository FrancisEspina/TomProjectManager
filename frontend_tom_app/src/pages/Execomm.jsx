import {
  AcademicCapIcon,
  AdjustmentsHorizontalIcon,
  ArrowRightIcon,
  BanknotesIcon,
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
import {
  BiBullseye,
  BiDollar,
  BiDrink,
  BiMedal,
  BiMoney,
  BiParty,
  BiPoll,
} from "react-icons/bi";
import * as Calendar from "./ExecommComponents/Calendar";
import ProjectProgress from "./ExecommComponents/ProjectProgress";
import {
  FaNotesMedical,
  FaPeopleCarryBox,
  FaUserGraduate,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Execomm = () => {
  const generalTasks = [
    { name: "Bulletin", icon: MegaphoneIcon, path: "bulletin" },
    { name: "Meetings", icon: PhoneIcon, path: "meetings" },
    { name: "Committees", icon: BriefcaseIcon, path: "general-committees" },
    { name: "Alumni", icon: AcademicCapIcon, path: "alumni" },
    { name: "Residents", icon: UserGroupIcon, path: "manage-residents" },
    { name: "TOM Drives", icon: LiaGoogleDrive, path: "tom-drives" },
    { name: "Finances", icon: BanknotesIcon, path: "finance" },
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
            <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-2">
              {generalTasks.map((button, index) => (
                <div className="" key={index}>
                  <Widget
                    title={button.name}
                    IconName={button.icon}
                    path={button.path}
                  />
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
                <Calendar.Calendar />
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

const Widget = ({ title, IconName, path }) => {
  return (
    <>
      <Link to={path && path}>
        <div className="flex items-center hover:bg-amber-500 hover:text-white bg-white shadow-3xl relative p-6 cursor-pointer rounded-xl min-h-[10px] group">
          <div className="lg:flex items-center gap-2">
            {IconName && (
              <IconName className="size-12 group-hover:text-amber-500 bg-gray-200 rounded-[12px] p-2 text-wrap" />
            )}
            <div className="text-sm mt-2 lg:mt-0 text-xs lg:text-[10pt]">
              {title && title}
            </div>
          </div>
          <div className="ml-auto">
            <ArrowRightIcon className="hidden lg:block size-5 text-amber-500 group-hover:text-white" />
          </div>
        </div>
      </Link>
    </>
  );
};

export default Execomm;
