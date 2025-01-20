import React from "react";
import { logoutUser } from "../api.js";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

const LogoutButton = () => {
  return (
    <button
      className="bg-red-500 text-white rounded-xl  w-full flex items-center justify-center"
      onClick={logoutUser}
    >
      <p>Sign Out</p>
      <ArrowRightEndOnRectangleIcon className="size-6 ml-auto text-white" />
    </button>
  );
};

export default LogoutButton;
