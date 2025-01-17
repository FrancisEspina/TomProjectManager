import React from "react";
import { useSelector } from "react-redux";
import * as Outlined from "@heroicons/react/24/outline";
import * as Solid from "@heroicons/react/24/solid";
import LogoutButton from "../components/LogoutButton.jsx";
import transparent from "./../assets/tomlogotransparent.png";
import logo from "./../assets/tomlogo.png";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const user = useSelector((state) => state.user.user);
  const navButtons = [
    {
      name: "announcements",
      icon: Outlined.MegaphoneIcon,
      action: "",
    },
    {
      name: "notification",
      icon: Outlined.BellIcon,
      action: "",
    },
    {
      name: "profile",
      icon: Outlined.UserCircleIcon,
      action: "",
      options: [
        {
          name: "Profile Settings",
          path: "/",
        },
        {
          name: "Profile Summary",
          path: "/",
        },
      ],
    },
  ];
  return (
    <>
      <div className="backdrop-blur mb-2 py-5 sticky top-0 px-10 lg:px-10 md:px-8">
        <div className="flex items-center">
          <div className="lg:hidden  ">
            <img src={logo} className="size-10" alt="" />
          </div>
          <div className="hidden lg:block">
            <input placeholder="Search" type="text"></input>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {navButtons.map((button) => (
              <div key={button.name} className="">
                <Menu>
                  <MenuButton className="bg-transparent hover:bg-transparent hover:text-amber-500 flex transition">
                    <button.icon className="size-5" />
                    <MenuItems
                      anchor="bottom"
                      className="w-52 px-2 pt-2 shadow-lg rounded-xl mt-5 bg-gray-100 "
                    >
                      <div className="flex items-center gap-2 m-2">
                        <Solid.UserCircleIcon className="size-10" />
                        <h4>
                          {user.first_name} {user.last_name}
                          <p>
                            {user.category == "F"
                              ? "Fraternity"
                              : "Ladies' Circle"}
                          </p>
                        </h4>
                      </div>
                      <br />
                      <ul>
                        <li className="bg-gray-200 px-4 py-4 mb-2 gap-2 rounded-lg hover:bg-gray-300">
                          <Link
                            className="flex gap-2 items-center"
                            to="/projects"
                          >
                            <Outlined.PhoneArrowDownLeftIcon className="size-4"></Outlined.PhoneArrowDownLeftIcon>
                            <h5>Profile Settings</h5>
                          </Link>
                        </li>
                        <Link className="" to="/projects">
                          <li className="flex gap-2 items-center bg-gray-200 px-4 py-4 mb-2 gap-2 rounded-lg hover:bg-gray-300">
                            <Outlined.PhoneArrowDownLeftIcon className="size-4"></Outlined.PhoneArrowDownLeftIcon>
                            <h5>Profile Settings</h5>
                          </li>
                        </Link>

                        <hr className="my-3" />
                        <li className="mb-2">
                          <LogoutButton />
                        </li>
                      </ul>
                    </MenuItems>
                  </MenuButton>
                </Menu>
              </div>
            ))}
          </div>
          {/* <Menu></Menu> */}
        </div>
      </div>
    </>
  );
};

export default NavBar;
