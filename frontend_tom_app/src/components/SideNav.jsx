import React from "react";
import * as Outlined from "@heroicons/react/24/outline";
import logo from "./../assets/tomlogo.png";
import * as Icon from "@heroicons/react";
import { Link, useLocation } from "react-router-dom";

const SideNav = () => {
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
    {
      name: "Execomm",
      path: "/execomm",
      icon: Outlined.UsersIcon,
    },
  ];
  return (
    <>
      <aside className="h-screen sticky top-0">
        <nav className="h-full w-80 flex flex-col backdrop-blur border-r shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div>
                <img src={logo} className="w-16" />
              </div>
              <div className="ms-2">
                <h5>The Outstanding Master</h5>
              </div>
            </div>
            <div>
              <Outlined.ChevronLeftIcon className="size-6 hover:text-amber-500" />
            </div>
          </div>

          <div className="pt-10">
            <ul>
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link to={item.path}>
                    <li
                      className={`p-3 rounded-lg rounded-lg flex items-center gap-2 ${
                        location.pathname === item.path
                          ? "bg-amber-500 text-white"
                          : "text-gray-500"
                      }`}
                    >
                      <item.icon className="size-5"></item.icon>
                      <h5>{item.name}</h5>
                    </li>
                  </Link>
                </div>
              ))}
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default SideNav;
