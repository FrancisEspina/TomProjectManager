import React from "react";
import { MenuItem, MenuItems } from "@headlessui/react";
import * as Outlined from "@heroicons/react/24/outline";
import * as Solid from "@heroicons/react/24/solid";
import LogoutButton from "./../LogoutButton";
import { Link } from "react-router-dom";
const ProfileMenuItems = (props) => {
  const profileItems = [
    {
      name: "Account Settings",
      icon: Outlined.Cog6ToothIcon,
      path: "/profile",
    },
    {
      name: "My Tasks",
      icon: Outlined.BookOpenIcon,
      path: "/projects",
    },
    {
      name: "My Projects",
      icon: Outlined.UserIcon,
      path: "/projects",
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 m-2">
        <Solid.UserCircleIcon className="size-12" />
        <h4>
          {props.user.first_name} {props.user.last_name}
          <p className="text-gray-500">{props.user.email}</p>
        </h4>
      </div>
      <hr className="my-3" />

      {profileItems.map((profileItem, i) => (
        <props.menuItem
          key={i}
          className="bg-transparent px-4 py-3 mb-2 gap-2 rounded-lg hover:bg-gray-200"
        >
          <Link className="flex gap-2 items-center" to={profileItem.path}>
            <profileItem.icon className="size-5"></profileItem.icon>
            <h5>{profileItem.name}</h5>
          </Link>
        </props.menuItem>
      ))}

      <hr className="my-3" />
      <div className="mb-2">
        <LogoutButton />
      </div>
    </div>
  );
};

export default ProfileMenuItems;
