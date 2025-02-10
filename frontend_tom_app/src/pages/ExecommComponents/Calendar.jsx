import React from "react";
import { Clock } from "../../components/DashboardComponents/DashboardComponents";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import ButtonIcon from "../../components/ButtonIcon";

import {
  format,
  compareAsc,
  startOfDay,
  startOfToday,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  startOfWeek,
} from "date-fns";
import { CalendarDateRangeIcon, ClockIcon } from "@heroicons/react/24/outline";
import { BiCalendarWeek } from "react-icons/bi";
import { PlusIcon } from "@heroicons/react/24/solid";
import { FaLocationPin } from "react-icons/fa6";
import { TiLocation } from "react-icons/ti";
export const Calendar = () => {
  return (
    <>
      <div className="bg-white p-5  rounded-2xl">
        <div className="mb-5">
          <div className="mb-2">
            <p>Calendar</p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Academic Year</p>
              <h3>
                <b>2025-2026</b>
              </h3>
            </div>

            <div>
              <p className="text-gray-500">Semester</p>
              <h3>
                <b>1st Sem</b>
              </h3>
            </div>

            <div className="">
              <Clock time={true} day={true} date={false} />
            </div>
          </div>
          <br />

          <div>
            <Dates />
          </div>
        </div>
        <EventsList />
      </div>
    </>
  );
};

export const Dates = () => {
  let today = startOfToday();
  let newDays = eachDayOfInterval({
    start: startOfWeek(startOfMonth(today)),
    end: endOfWeek(endOfMonth(today)),
  });
  const daysOfTheWeek = ["S", "M", "T", "W", "Th", "F", "S"];
  return (
    <>
      <div>
        <div className="flex items-center gap-1 border text-gray-800 w-fit p-3 rounded-xl mb-1">
          <BiCalendarWeek className="size-5" />
          <h5>{format(today, "MMMM yyyy")}</h5>
        </div>
        <div className="border rounded-xl p-5 grid grid-cols-7 text-sm">
          <div className="col-span-7 mb-3">
            <div className="grid grid-cols-7 text-sm text-center">
              {daysOfTheWeek.map((day, index) => (
                <div key={index}>
                  <b>{day}</b>
                </div>
              ))}
            </div>
          </div>
          {newDays.map((date, dayIdx) => (
            <div
              key={dayIdx}
              className={`relative flex justify-center items-center overflow-hidden p-3 rounded-xl m-[1px] border text-[7pt] lg:text-[10pt] hover:bg-gray-200 cursor-pointer ${
                format(date, "MMM") != format(today, "MMM") &&
                "bg-gray-100 text-gray-400"
              }`}
            >
              {/* <div className="px-1 lg:px-2 py-1 bg-amber-500 absolute rounded-xl top-1 right-1 z-10"></div> */}

              <div
                className={`${
                  today == date.toString() &&
                  "lg:bg-blue-500 text-white rounded-full absolute size-32 lg:size-6 md:size-6  bg-blue-400"
                }   size-6 flex items-center justify-center`}
              >
                {format(date, "d")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const EventsList = () => {
  let today = startOfToday();
  let events = [
    { name: "Execomm Meeting", time: "4:00 PM", place: "Online" },
    { name: "SAGSAR Meeting", time: "8:00 PM", place: "Online" },
    { name: "Pungag", time: "10:00 PM", place: "Aguz" },
  ];
  return (
    <>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">Today</p>
            <h2>{format(today, "MMM d yyy")}</h2>
          </div>

          <div>
            <ButtonIcon text="Add Event" icon={PlusIcon}></ButtonIcon>
          </div>
        </div>
        <br />

        <div>
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                fontFamily: "Poppins",
                flex: 0,
                padding: 0,
              },
            }}
          >
            {events.map((event, idx) => (
              <div key={idx}>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot variant="outlined" />
                    {events.length > idx + 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <div style={{ fontFamily: "Poppins" }}>
                      <h5>
                        <div className="font-semibold">
                          {event.name && event.name}
                        </div>
                      </h5>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="size-4 text-gray-500" />
                        <h5>{event.time && event.time}</h5>
                        <TiLocation className="size-4 text-gray-500" />
                        <h5>{event.place && event.place}</h5>
                      </div>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              </div>
            ))}
          </Timeline>
        </div>
      </div>
    </>
  );
};
