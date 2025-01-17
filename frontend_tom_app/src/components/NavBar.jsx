import React from "react";

import * as Outlined from "@heroicons/react/24/outline";
import * as Solid from "@heroicons/react/24/solid";
import transparent from "./../assets/tomlogotransparent.png";
import logo from "./../assets/tomlogo.png";

const NavBar = () => {
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
    },
  ];
  return (
    <>
      <div className="backdrop-blur mb-2 p-5 sticky top-0">
        <div className="flex items-center">
          <div className="ml-auto flex items-center gap-3">
            {navButtons.map((button) => (
              <button key={button.name} className="component-button flex">
                <button.icon className="size-6" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
