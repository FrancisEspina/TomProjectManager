import React from "react";
import { MenuItem, MenuItems } from "@headlessui/react";
import * as Outlined from "@heroicons/react/24/outline";
import * as Solid from "@heroicons/react/24/solid";
import LogoutButton from "./../LogoutButton";
import { Link } from "react-router-dom";
const ProfileMenuItems = (props) => {
  return (
    <div>
      <div className="flex items-center gap-2 m-2">
        <Solid.UserCircleIcon className="size-10" />
        <h4>
          {props.user.first_name} {props.user.last_name}
          <p>{props.user.category == "F" ? "Fraternity" : "Ladies' Circle"}</p>
        </h4>
      </div>
      <br />
      <ul>
        <li className="bg-gray-200 px-4 py-4 mb-2 gap-2 rounded-lg hover:bg-gray-300">
          <Link className="flex gap-2 items-center" to="/projects">
            <p>Profile Settings</p>
            <Outlined.PhoneArrowDownLeftIcon className="size-4 ml-auto"></Outlined.PhoneArrowDownLeftIcon>
          </Link>
        </li>
      </ul>

      <hr className="my-3" />
      <div className="mb-2">
        <LogoutButton />
      </div>
    </div>
  );
};

export default ProfileMenuItems;
