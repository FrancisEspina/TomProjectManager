import React from "react";
import { MenuItem, MenuItems } from "@headlessui/react";
import * as Outlined from "@heroicons/react/24/outline";
import * as Solid from "@heroicons/react/24/solid";
import LogoutButton from "./../LogoutButton";
import { Link } from "react-router-dom";
import { showImage } from "../../api";
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
    <div className="z-50">
      <div className="flex items-center gap-2 m-2 py-3">
        {props.user.profile_picture_url ? (
          <>
            <img
              className="size-14 border rounded-full"
              src={showImage(props.user.profile_picture_url)}
              alt=""
            />
          </>
        ) : (
          <>
            <Solid.UserCircleIcon className="size-12 text-gray-300" />
          </>
        )}
        <div>
          <div className="text-sm lg:text-lg md:text-md ">
            {props.user.first_name} {props.user.last_name}
          </div>
          <p className="text-gray-500 text-[10pt] mt-[-5px] mb-1 font-none">
            {props.user.username}
          </p>
          <p className="text-gray-500 font-none">
            {props.user.year} | {props.user.batch_name}
          </p>
        </div>
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
