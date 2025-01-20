import React from "react";
import { logoutUser } from "../api.js";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

const LogoutButton = () => {
  return (
    <button
      className={`bg-white hover:bg-red-500 hover:text-white text-red-500 rounded-xl w-full flex items-center gap-2 duration-0`}
      onClick={logoutUser}
    >
      <ArrowRightEndOnRectangleIcon className="size-6" />
      <p>Sign Out</p>
    </button>
  );
};

export default LogoutButton;
