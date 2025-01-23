import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

const IconBox = (props) => {
  return (
    <>
      <div
        className={`p-2 min-w-[60px] h-[60px] hover:bg-amber-400  flex bg-gray-200  items-center justify-center text-center rounded-2xl up cursor-pointer text-gray-700 hover:text-white "bg-gray-500"`}
      >
        {props.title ? (
          <>
            <div>
              <div className="text-[7pt]">
                <div>{props.title && props.title}</div>
              </div>
              <div className="lg:text-xl text-lg ">
                <b>{props.content && props.content}</b>
              </div>
            </div>
          </>
        ) : (
          <>
            <props.icon className="flex size-9 lg:size-10  " />
          </>
        )}
      </div>
    </>
  );
};

export default IconBox;
