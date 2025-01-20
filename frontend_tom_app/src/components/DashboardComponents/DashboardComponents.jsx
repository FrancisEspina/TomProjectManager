import React, { useEffect, useState } from "react";
import * as HeroOutlined from "@heroicons/react/24/outline";
import * as HeroSolid from "@heroicons/react/24/solid";
import { FaCircle, FaHandshake, FaRegComment } from "react-icons/fa";
import { FiRepeat } from "react-icons/fi";
import { FaHandshakeAngle } from "react-icons/fa6";
import { TiHeartOutline, TiHeart } from "react-icons/ti";

import ButtonIcon from "../ButtonIcon";
import { Link } from "react-router-dom";
import { getUsers } from "../../api";

const maxHeight = "max-h-72 overflow-y-auto";
const minHeight = "min-h-52";
export const CurrentProject = () => {
  return (
    <>
      {/* column 1 */}
      <Link to="/projects">
        <div className="bg-gray-100 rounded-2xl p-5 cursor-pointer card up">
          <div className="">
            <div className="flex items-center">
              <div className="w-full">
                <div className="flex items-center gap-1 mb-1">
                  <HeroOutlined.FolderIcon className="size-5" />
                  <p>Current Project</p>
                  <HeroOutlined.ArrowUpRightIcon className="size-4 ml-auto up-right" />
                </div>
                <h1 className=" text-rose-500 z-10 font-bold">SAGSAR 2025</h1>
              </div>
            </div>
          </div>
          <br />
          <div className="flex gap-2 justify-start">
            <ButtonIcon
              icon={HeroOutlined.DocumentIcon}
              text={"POA"}
              path={"/poa"}
            />
            <ButtonIcon
              icon={HeroOutlined.UsersIcon}
              text={"Committees"}
              path={"/comittees"}
            />
          </div>
        </div>
      </Link>
      {/* column 2 */}
      <div className="p-5">
        <div className="flex flex-col">
          <div>
            <div className="flex gap-1 small-title items-center mb-2">
              <HeroOutlined.CalendarIcon className="size-5" />
              <p>Event Date</p>
            </div>
            <h4 className="text-sm lg:text-lg">February 14, 2025</h4>
          </div>
          <br />
          <div className="flex items-center">
            <div>
              <div className="flex gap-1 small-title items-center mb-2">
                <HeroOutlined.BanknotesIcon className="size-5" />
                <p>Solicitations</p>
              </div>
              <h4 className="text-sm lg:text-lg">P 12,302 / P 32,000</h4>
            </div>

            <div className="ml-auto ">
              <ButtonIcon icon={HeroOutlined.EyeIcon} />
            </div>
          </div>
        </div>
      </div>
      {/* col 3 */}
      <div className="p-5">
        <div className="flex flex-col items-center">
          <div className="flex w-full">
            <div>
              <div className="flex mb-2 gap-1 items-center small-title">
                <HeroOutlined.UserIcon className="size-5" />
                <p>My Committee</p>
              </div>
              <h4 className="text-sm lg:text-lg">
                <b>Logistics</b>
              </h4>
              <br />
            </div>
            <div className="ml-auto ">
              <ButtonIcon icon={HeroOutlined.BriefcaseIcon} />
            </div>
          </div>

          <div className="flex w-full">
            <div>
              <div className="flex gap-1 items-center mb-2 small-title ">
                <HeroOutlined.ClockIcon className="size-5" />
                <div className="">
                  <p>Next Meeting</p>
                </div>
                {/* <div className="bg-green-500  rounded-lg text-white py-1 px-3">
                  <h6>Meeting Ongoing</h6>
                </div> */}
              </div>
              <h4 className="text-sm lg:text-lg">
                January 29, 2025 | 8:00 PM{" "}
              </h4>
              <br />
            </div>
            <div className="ml-auto ">
              <ButtonIcon icon={HeroOutlined.LinkIcon} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const DashBoardAnnouncements = () => {
  return (
    <>
      <div className="card-sm cursor-pointer">
        <div className="flex items-center gap-1 m-1 mb-3">
          <HeroOutlined.MegaphoneIcon className="size-5" />
          <p>Announcements</p>
          <HeroOutlined.ArrowUpRightIcon className="size-4 ml-auto up-right" />
        </div>
        <hr />
        <div
          className={`${maxHeight} ${minHeight} bg-white mt-3 rounded-lg px-1`}
        >
          <div className="p-5 hover:bg-gray-100 rounded-xl mb-2">
            <div className="flex items-center">
              <HeroOutlined.MegaphoneIcon className="size-10 text-red-500 me-1" />
              <div>
                <h4>Announcement</h4>
                <div className="badge badge-green">
                  <div>Eber Villanobos</div>
                </div>
              </div>
              <div className="ml-auto">
                <p>1d</p>
              </div>
            </div>
            <div className="mt-2">
              <h6>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
                laboriosam dolorum, dicta molestias temporibus nemo iusto porro
                doloribus totam ratione veritatis accusantium unde ut ipsam
                velit aliquid soluta? Similique, iusto.
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const DashboardFeed = () => {
  return (
    <div className="card-sm cursor-pointer ">
      <div className="flex items-center mb-3  gap-1 m-1">
        <HeroOutlined.DevicePhoneMobileIcon className="size-5" />
        <p>Feed</p>
        <HeroOutlined.ArrowUpRightIcon className="size-4 ml-auto up-right" />
      </div>

      <hr />

      <div className={`bg-white px-1 mt-3 ${maxHeight} ${minHeight}`}>
        <div
          id="post"
          className="mb-1 rounded-xl  hover:bg-gray-100 px-5 py-6 "
        >
          <div className="flex items-center gap-1">
            <HeroSolid.UserCircleIcon className="size-10" />
            <div>
              <h4>Jhoe Leil Adel</h4>
              <p className="text-gray-700">@samyang</p>
            </div>
            <p className="ml-auto">1d</p>
          </div>

          <div className="my-3 px-3">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              autem aut provident distinctio fugit sunt quisquam mollitia omnis
              neque. Officia quas doloremque libero laboriosam cumque
              repudiandae praesentium, quo nobis corporis?
            </p>
          </div>
          <br />
          <div className="flex items-center">
            <div className="flex gap-1 items-center">
              <TiHeart color="red" size={20} />
              <h5>
                <b>24</b>
              </h5>
            </div>
            <div className="flex gap-2 ml-auto">
              <ButtonIcon
                text="Like"
                color="bg-gray-200"
                icon={TiHeartOutline}
              />
              <ButtonIcon
                text="Comment"
                color="bg-gray-200"
                icon={FaRegComment}
              />
              <ButtonIcon text="Share" color="bg-gray-200" icon={FiRepeat} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DashboardResidents = () => {
  const [users, setUsers] = useState([]);

  const getUserData = async () => {
    const response = await getUsers(); // Assume this returns a raw HTTP response if needed
    const userData = response.users; // Use the response if it's already parsed JSON
    setUsers(userData);
    console.log(userData); //
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="card-sm cursor-pointer">
      <div className="flex items-center  gap-1 m-1">
        <HeroOutlined.DevicePhoneMobileIcon className="size-5" />
        <p>Residents</p>
        <HeroOutlined.ArrowUpRightIcon className="size-4 ml-auto up-right" />
      </div>

      <div
        className={`bg-gray-100 p-2 mt-5 bg-transparent rounded-lg ${minHeight} ${maxHeight}`}
      >
        {users.map((user, i) => (
          <div
            key={i}
            className="p-3 hover:bg-gray-100 rounded-lg flex items-center gap-1"
          >
            <div>
              <HeroSolid.UserCircleIcon className="size-8" />
            </div>
            <div>
              <h5>
                {user.first_name} {user.last_name}
              </h5>
              <h6>{user.category == "F" ? "Fraternity" : "Ladies' Circle"}</h6>
            </div>

            <div className="ml-auto">
              <FaCircle size={10} color="green" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
