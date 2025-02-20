import React, { useEffect, useState } from "react";
import * as Outlined from "@heroicons/react/24/outline";
import SideNav from "./../components/SideNav.jsx";

import transparent from "./../assets/tomlogotransparent.png";
import ProfileMenuItems from "../components/NavbarComponents/ProfileMenuItems.jsx";
import logo from "./../assets/tomlogo.png";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { Link } from "react-router-dom";
import { checkValid } from "./../api.js";

import { useDispatch } from "react-redux";
import { setUser } from "./../services/store/reducers/AuthSlice";
import { current_user } from "../helpers/utils.jsx";

const NavBar = () => {
  const dispatch = useDispatch();
  const checkToken = async () => {
    try {
      const response = await checkValid(); // Wait for the API response
      if (response.status === 200) {
        const data = await response.data;
        dispatch(setUser(data));
      }
    } catch (error) {
      setError("Invalid Email or Password");
      console.error("Error logging in:", error);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);
  const user = current_user();
  const [show, setShow] = useState(true);

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
      <div className="backdrop-blur mb-2 py-5 sticky top-0 px-7 lg:px-10 z-10 ">
        <div className="flex items-center">
          <div className="lg:hidden  ">
            <div onClick={() => setShow(!show)}>
              <Outlined.Bars3Icon className="size-5" />
            </div>
          </div>

          {/* <div className="hidden lg:block w-80 relative">
            <div className=" absolute top-1 right-2 z-10">
              <Outlined.MagnifyingGlassIcon className=" p-1 size-7 text-gray-400" />
            </div>

            <input
              placeholder="Search"
              type="text"
              className="pl-10 w-full border border-gray-300 rounded-md p-2"
            />
          </div> */}

          <div className="ml-auto flex items-center gap-3">
            {navButtons.map((button) => (
              <div key={button.name}>
                <Menu>
                  <MenuButton className="bg-transparent outline-0 hover:bg-transparent hover:text-amber-500 flex ">
                    <button.icon className="size-5 bg-transparent" />
                  </MenuButton>
                  <MenuItems
                    anchor="bottom end"
                    className="bg-white w-fit-content px-3 pb-1 pt-2 shadow-lg rounded-2xl mt-5"
                  >
                    <ProfileMenuItems user={user} menuItem={MenuItem} />
                  </MenuItems>
                </Menu>
              </div>
            ))}
          </div>
        </div>
      </div>

      <HiddenNav show={show} setShow={setShow} />
    </>
  );
};

function HiddenNav(props) {
  const closeNav = () => {
    props.setShow(!props.show); // Safeguard in case the prop isn't passed
  };

  return (
    <div
      className={`lg:hidden bg-white sidebar fixed top-0 bottom-0 transition-transform duration-200 lg:left-0 z-20 ${
        !props.show ? "translate-x-0" : "-translate-x-full"
      } p-2 h-full`}
    >
      <Outlined.XMarkIcon
        onClick={closeNav}
        className="absolute hover:text-amber-500 right-5 top-11 z-10 size-6"
      />
      <SideNav onLinkClick={closeNav} />
    </div>
  );
}

export default NavBar;
