import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { getUsers, showImage } from "./../api.js";
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
const Residents = () => {
  const shortcuts = [
    "All",
    "Alumni Relations",
    "Defense Committee",
    "Public Relations",
    "Acad/Doc Committee",
    "Rosebeer",
    "Finance Committee",
    "Master/Mistress Secretary",
    "Membership Committee",
  ];
  let [residents, setResidents] = useState();
  const getUserData = async () => {
    const response = await getUsers(); // Assume this returns a raw HTTP response if needed
    const userData = response.users; // Use the response if it's already parsed JSON
    setResidents(userData);
    console.log(userData); //
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <h3 className="text-gray-500">RESIDENTS</h3>
      <br />

      <div className="flex justify-center flex-wrap gap-3">
        <div className="relative w-[400px] lg:w-[300px] ">
          <div className=" absolute top-1 right-2 z-10">
            <MagnifyingGlassIcon className=" p-1 size-7 text-gray-400" />
          </div>

          <input
            placeholder="Search"
            type="text"
            className="pl-10 w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center  gap-2">
          {shortcuts.map((shortcut) => (
            <div className="bg-transparent border-gray-300 hover:border-0 border rounded-full py-2 px-3 text-[9pt] hover:bg-amber-400 cursor-pointer">
              {shortcut}
            </div>
          ))}
        </div>
      </div>
      <br />
      <div className="flex flex-wrap gap-2 justify-center  m-auto">
        {residents &&
          residents.map((resi, index) => (
            <Link
              to={"/about"}
              className=" border border-transparent hover:border-gray-200 rounded-[40px] p-6 zoom group transition  text-center  basis-[250px]"
              key={index}
            >
              <div>
                <div className="text-gray-300">
                  {resi.profile_picture_url ? (
                    <img
                      className="rounded-full m-auto size-[150px] lg:size-[180px]"
                      src={showImage(resi.profile_picture_url)}
                      alt=""
                    />
                  ) : (
                    <UserIcon className="size-[150px] m-auto lg:size-[180px] group-hover:text-amber-500" />
                  )}
                </div>
                <br />
                <div className="text-md">
                  {resi.first_name} {resi.last_name}
                </div>
                <p className="text-gray-500">
                  {resi.category == "F" ? "Fraternity" : "Ladies' Circle"}
                </p>
              </div>
            </Link>
          ))}
      </div>
      <br />
      <div className="justify-center flex m-5">
        <Pagination
          count={10}
          defaultPage={6}
          siblingCount={0}
          variant="outlined"
        />
      </div>
    </>
  );
};

export default Residents;
