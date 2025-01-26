import React from "react";
import { Clock } from "../../components/DashboardComponents/DashboardComponents";

const Calendar = () => {
  return (
    <>
      <div className="bg-white p-5  rounded-2xl">
        <div>
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
              <p>Semester</p>
              <h3>
                <b>1st Sem</b>
              </h3>
            </div>

            <div className="">
              <Clock time={true} day={true} date={false} />
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default Calendar;
