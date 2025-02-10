import React, { useState } from "react";
import * as Outlined from "@heroicons/react/24/outline";
import logo from "./../assets/tomlogo.png";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "@mui/material";

const SideNav = ({ onLinkClick }) => {
  const [open, setOpen] = useState(true);
  const location = useLocation(); // Get current route
  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: Outlined.Square2StackIcon,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: Outlined.FolderIcon,
    },
    {
      name: "Feed",
      path: "/feed",
      icon: Outlined.DeviceTabletIcon,
    },
    {
      name: "Schedules",
      path: "/schedules",
      icon: Outlined.CalendarIcon,
    },
    {
      name: "Residents",
      path: "/residents",
      icon: Outlined.UserGroupIcon,
    },
    // {
    //   name: "TΩMlympics",
    //   path: "/tomlympics",
    //   icon: Outlined.StarIcon,
    // },
    {
      name: "Execomm",
      path: "/execomm",
      icon: Outlined.UsersIcon,
    },

    {
      name: "About TΩM",
      path: "/about",
      icon: Outlined.InformationCircleIcon,
    },

    {
      name: "My Profile",
      path: "/profile",
      icon: Outlined.UserCircleIcon,
    },
  ];
  return (
    <>
      <aside className="h-screen sticky top-0 bg-transparent ">
        <nav
          className={`h-screen ${
            open ? "w-80" : "w-15"
          } duration-300  flex flex-col backdrop-blur lg:border-r ${
            open ? "px-6" : "px-2"
          } py-6`}
        >
          <div
            className={`flex ${
              open ? "justify-between" : "justify-center"
            }  items-center`}
          >
            <div className="flex items-center">
              <div>
                <img
                  src={logo}
                  className={
                    (`overflow-hidden transition-all`, open ? "w-12" : "w-0")
                  }
                />
              </div>
              <div className={`ms-2 ${open ? "block" : "hidden"}`}>
                <h5>The Outstanding Master</h5>
                <h6 className="text-gray-500">v. 1.0</h6>
              </div>
            </div>
            <div
              className="hover:text-amber-500 cursor-pointer
              duration-500"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <Outlined.ChevronLeftIcon className="size-6 hidden lg:block" />
              ) : (
                <Outlined.ArrowsPointingOutIcon className="size-6 text-gray-500" />
              )}
            </div>
          </div>

          <div className="mt-10">
            <div className="mt-4 flex flex-col gap-2 relative  ">
              {navItems.map((item, i) => (
                <Tooltip key={i} title={!open && item.name} placement="right">
                  <Link
                    onClick={onLinkClick}
                    to={item.path}
                    className={`flex  items-center text-sm p-3 rounded-xl ${
                      location.pathname === item.path
                        ? "text-white bg-amber-500"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <item.icon className="size-5"></item.icon>
                    <div
                      className={`overflow-hidden transition  ${
                        open ? "ms-3 w-32" : "w-0 "
                      }`}
                    >
                      <div>{open && item.name}</div>
                    </div>
                  </Link>
                </Tooltip>
              ))}
            </div>
          </div>

          <div className={`fixed bottom-5 text-gray-500`}>
            {open && <p>Copyright © 2025 Francis Espiña</p>}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default SideNav;
