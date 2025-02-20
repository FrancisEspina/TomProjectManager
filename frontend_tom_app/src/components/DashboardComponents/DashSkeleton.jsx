import React from "react";
import { BiPoll } from "react-icons/bi";

const DashSkeleton = ({ minHeight, Icon, text }) => {
  return (
    <>
      <div
        className={`hover:text-gray-500 transition bg-gray-200 rounded-3xl flex text-gray-400 p-20  items-center flex-col justify-center relative ${minHeight} `}
      >
        {Icon && <Icon className="size-28" />}
        <div>{text && text}</div>
      </div>
    </>
  );
};

export default DashSkeleton;
