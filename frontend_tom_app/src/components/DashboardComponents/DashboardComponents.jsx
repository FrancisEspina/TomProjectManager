import React, { useEffect, useState } from "react";
import * as HeroOutlined from "@heroicons/react/24/outline";
import * as HeroSolid from "@heroicons/react/24/solid";
import { FaCircle, FaHandshake, FaRegComment } from "react-icons/fa";
import { FiRepeat } from "react-icons/fi";
import { FaHandshakeAngle } from "react-icons/fa6";
import { TiHeartOutline, TiHeart } from "react-icons/ti";
import IconBox from "./IconBox";
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
      <div className="lg:p-5 px-5 my-3 lg:my-0">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <IconBox title={"Fri"} content="14" hover={"bg-red-500"}></IconBox>
            <div>
              <div className="flex gap-1 small-title items-center mb-1">
                <HeroOutlined.CalendarIcon className="size-5" />
                <p>Event Date</p>
              </div>
              <h4 className="text-sm lg:text-lg">February 14, 2025</h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <IconBox
              title={"Funds"}
              content="45%"
              hover={"bg-green-500"}
            ></IconBox>

            <div>
              <div className="flex gap-1 small-title items-center mb-1">
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
      <div className="lg:p-5 px-5 py-2">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <IconBox
              icon={HeroOutlined.PaintBrushIcon}
              hover={"bg-purple-500"}
            ></IconBox>

            <div>
              <div className="flex gap-1 small-title items-center mb-1">
                <HeroOutlined.UsersIcon className="size-5" />
                <p>My Committee</p>
              </div>
              <h6 className="text-sm lg:text-lg">Publicity</h6>
            </div>

            <div className="ml-auto ">
              <ButtonIcon icon={HeroOutlined.BriefcaseIcon} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <IconBox hover={"bg-red-500"} title={"Wed"} content="29"></IconBox>

            <div>
              <div className="flex gap-1 small-title items-center mb-1">
                <HeroOutlined.ClockIcon className="size-5" />
                {true ? (
                  <>
                    <div className="text-[7pt] bg-green-500 text-white p-1 rounded-md">
                      Meeting Ongoing
                    </div>
                  </>
                ) : (
                  <>
                    <p>Next Meeting</p>
                  </>
                )}
              </div>
              <h4 className="text-sm lg:text-lg">January 29, 2025</h4>
              <p className="text-gray-500">8:00 PM</p>
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
              <HeroSolid.MegaphoneIcon className="size-7 text-red-500 me-1" />
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
            <div className="mt-3">
              <h6>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium praesentium labore nihil aut incidunt, tenetur
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const DashboardFeed = () => {
  const handlePostSelect = (event) => {
    event.preventDefault();
    console.log(event);
  };
  return (
    <Link to="/feed">
      <div className="card-sm cursor-pointer">
        <div className="flex items-center mb-3  gap-1 m-1">
          <HeroOutlined.DevicePhoneMobileIcon className="size-5" />
          <p>Feed</p>
          <HeroOutlined.ArrowUpRightIcon className="size-4 ml-auto up-right" />
        </div>

        <hr />

        <div className={`bg-white px-1 mt-3 ${maxHeight} ${minHeight}`}>
          <div
            onClick={handlePostSelect}
            id="post"
            className="mb-1 rounded-xl border  hover:bg-gray-100 px-5 py-6 "
          >
            <div className="flex items-center gap-1">
              <HeroSolid.UserCircleIcon className="size-10 text-gray-400" />
              <div>
                <h5>Jhoe Leil Adel</h5>
                <h6 className="text-gray-700">@samyang</h6>
              </div>
              <p className="ml-auto">1d</p>
            </div>

            <div className="my-3 px-3">
              <p>SHEESSHH 🫥🫥</p>
            </div>
            <br />
            <div className="">
              <div className="flex gap-1 items-center">
                <TiHeart color="red" size={20} />
                <h5>
                  <b>24</b>
                </h5>
              </div>
            </div>

            <div className="flex gap-1 justify-center w-full mt-2">
              <ButtonIcon
                width="w-full"
                text="Like"
                color="bg-gray-100"
                icon={TiHeartOutline}
              />
              <ButtonIcon
                width="w-full"
                text="Comment"
                color="bg-gray-100"
                icon={FaRegComment}
              />
              <ButtonIcon
                width="w-full"
                text="Share"
                color="bg-gray-100"
                icon={FiRepeat}
              />
            </div>
          </div>

          <div className="">
            <button className="w-full hover:bg-gray-200 gap-1 hover:text-black bg-transparent flex items-center justify-center">
              <div>
                <HeroOutlined.EyeIcon className="size-4"></HeroOutlined.EyeIcon>
              </div>
              <p>View Feed</p>
            </button>
          </div>
        </div>
      </div>
    </Link>
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
      <div className="flex items-center mb-3 gap-1 m-1">
        <HeroOutlined.DevicePhoneMobileIcon className="size-5" />
        <p>Residents</p>
        <HeroOutlined.ArrowUpRightIcon className="size-4 ml-auto up-right" />
      </div>
      <hr />
      <div
        className={`bg-gray-100 px-1 mt-3 bg-transparent rounded-lg ${minHeight} ${maxHeight}`}
      >
        {users.map((user, i) => (
          <div
            key={i}
            className="p-3 hover:bg-gray-100 rounded-xl flex items-center gap-1"
          >
            {user.profile_picture_url ? (
              <>
                <div>
                  <img
                    className="rounded-full size-8"
                    src={user.profile_picture_url}
                    alt=""
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <HeroSolid.UserCircleIcon className="size-8 text-gray-400" />
                </div>
              </>
            )}
            <div>
              <div className="text-xs">
                {user.first_name} {user.last_name}
              </div>
              <h6 className="text-gray-500">
                {/* {user.category == "F" ? "Fraternity" : "Ladies' Circle"} */}
                {user.username
                  ? user.username
                  : user.category == "F"
                  ? "Fraternity"
                  : "Ladies' Circle"}
              </h6>
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

export const Clock = ({
  format = "HH:mm:ss:ms",
  showDate = true,
  style = {},
  updateInterval = 1000,
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, updateInterval);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [updateInterval]);

  const getFormattedTime = () => {
    if (format === "HH:mm:ss:ms") {
      return time.toLocaleTimeString();
    } else if (format === "HH:mm") {
      return time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return time.toString(); // Fallback for custom formats
  };

  const getFormattedDate = () => {
    return time.toLocaleDateString(undefined, {
      year: "numeric", // "2025"
      month: "long", // "January"
      day: "numeric", // "21"
    });
  };

  const getFormattedDay = () => {
    return time.toLocaleDateString(undefined, {
      weekday: "long", // "Monday"
    });
  };

  return (
    <div className="text-end hidden lg:block md:block">
      <h5>{getFormattedDay()}</h5>
      <h2 className="text-amber-500 font-semibold">{getFormattedTime()}</h2>
      <h5 className="flex items-center">
        <HeroOutlined.CalendarDaysIcon className="size-5 me-1" />
        {getFormattedDate()}
      </h5>
    </div>
  );
};
