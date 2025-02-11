import React, { useEffect, useState } from "react";
import * as HeroOutlined from "@heroicons/react/24/outline";
import * as HeroSolid from "@heroicons/react/24/solid";
import { FaCircle, FaHandshake, FaPoll, FaRegComment } from "react-icons/fa";
import { FiRepeat } from "react-icons/fi";
import { FaHandshakeAngle } from "react-icons/fa6";
import { TiHeartOutline, TiHeart } from "react-icons/ti";
import IconBox from "./IconBox";
import ButtonIcon from "../ButtonIcon";
import { Link } from "react-router-dom";
import { getAnnouncements, getPolls, getUsers, showImage } from "../../api";
import { timeAgo } from "../../helpers/utils";
import { BiPoll } from "react-icons/bi";
import BorderLinearProgress from "../BorderLinearProgress";
import { Dialog } from "@mui/material";
import DialogBox from "../Dialog";

const maxHeight = "max-h-[295px] overflow-y-auto";
const minHeight = "min-h-[100px]";
const minWidth = "min-w-[300px]";
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
              <h4 className="text-sm lg:text-[11pt]">February 14, 2025</h4>
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
              <h4 className="text-sm lg:text-[11pt]">P 12,302 / P 32,000</h4>
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
              <h6 className="text-sm lg:text-[11pt]">Publicity</h6>
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
              <h4 className="text-sm lg:text-[11pt]">January 29, 2025</h4>
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
  const [announcements, setAnnouncement] = useState();
  const fetchAnnouncements = async () => {
    const data = await getAnnouncements();
    console.log("FETCHHHHH", data.announcements);
    setAnnouncement(data.announcements);
  };
  useEffect(() => {
    fetchAnnouncements();
  }, []);
  return (
    <>
      <div className={`card-sm cursor-pointer`}>
        <CardTitle
          title="Announcements"
          IconName={HeroOutlined.MegaphoneIcon}
        />
        <hr />
        <div className={`mt-3 ${maxHeight}`}>
          {announcements &&
            announcements.map((announcement, i) => (
              <div
                key={i}
                className={`${maxHeight} ${minHeight} bg-white  rounded-lg px-1`}
              >
                <div className="p-5 hover:bg-gray-100 rounded-xl mb-1">
                  <div className="flex items-center">
                    <HeroSolid.MegaphoneIcon className="size-7 text-red-500 me-1" />
                    <div>
                      <div className="text-sm">{announcement.title}</div>
                      <div className="text-[8pt] text-gray-800  w-fit   py-[2px]">
                        <div>By: {announcement.user.first_name}</div>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <p>{timeAgo(announcement.created_at)}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h6>{announcement.content}</h6>
                  </div>

                  {announcement.poll && (
                    <div className="mt-2 ">
                      <button className="flex items-center w-full justify-center bg-transparent hover:bg-gray-300 hover:text-black">
                        <FaPoll size={15} />
                        <h5>View Poll</h5>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export const DashboardFeed = ({ latestPost }) => {
  const handlePostSelect = (event) => {
    event.preventDefault();
    console.log(event);
  };
  return (
    <Link to="/feed">
      <div className="card-sm cursor-pointer">
        <CardTitle title="Feed" IconName={HeroOutlined.DevicePhoneMobileIcon} />

        <hr />

        <div className={`bg-white px-1 mt-3 ${maxHeight} ${minHeight}`}>
          {/* {latestPost && JSON.stringify(latestPost)} */}

          {latestPost ? (
            <>
              <div
                onClick={handlePostSelect}
                id="post"
                className="mb-1 rounded-xl   hover:bg-gray-100 px-5 py-6 "
              >
                <div className="flex items-center gap-1">
                  {latestPost.user.profile_picture_url ? (
                    <>
                      <img
                        className="size-10 rounded-full"
                        src={showImage(latestPost.user.profile_picture_url)}
                        alt=""
                      />
                    </>
                  ) : (
                    <>
                      <HeroSolid.UserCircleIcon className="size-10 text-gray-400" />
                    </>
                  )}
                  <div>
                    <h5 className="font-semibold">
                      {latestPost.user.first_name} {latestPost.user.last_name}
                    </h5>
                    <h6 className="text-gray-700">
                      {latestPost.user.username}
                    </h6>
                  </div>
                  <p className="ml-auto">{timeAgo(latestPost.created_at)}</p>
                </div>

                <div className="my-4 px-3">
                  <h5>{latestPost.content}</h5>
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

                <div className="flex gap-1 justify-between max-w-96 m-[auto] mt-2">
                  <ButtonIcon color="bg-gray-100" icon={FaRegComment} />
                  <ButtonIcon color="bg-gray-100" icon={FiRepeat} />
                  <ButtonIcon color="bg-gray-100" icon={TiHeartOutline} />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="">
                <div className="h-52 flex justify-center items-center">
                  <p>NO POST</p>
                </div>
              </div>
            </>
          )}

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
      <CardTitle title="Residents" IconName={HeroOutlined.UserIcon} />
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
                    src={showImage(user.profile_picture_url)}
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

export const Clock = (
  props,
  { format = "HH:mm:ss:ms", showDate = true, style = {}, updateInterval = 1000 }
) => {
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
      {props.day && <h5>{getFormattedDay()}</h5>}
      {props.time && (
        <h2 className="text-amber-500 font-semibold">{getFormattedTime()}</h2>
      )}
      {props.date && (
        <h5 className="flex justify-end items-center">
          <HeroOutlined.CalendarDaysIcon className="size-5 me-1" />
          {getFormattedDate()}
        </h5>
      )}
    </div>
  );
};

export const CardTitle = ({ title, IconName }) => {
  return (
    <>
      <div className="flex items-center mb-3 gap-1 m-1">
        {IconName && <IconName className="size-5" />}
        <p>{title && title}</p>
        <HeroOutlined.ArrowUpRightIcon className="size-4 ml-auto up-right" />
      </div>
    </>
  );
};

export const DashBoardPoll = () => {
  let [currentPoll, setCurrentPoll] = useState(0);
  const [polls, setPolls] = useState();

  function handlePollTraverse(action) {
    setCurrentPoll((prev) => {
      if (action === "increment") {
        return prev < polls.length - 1 ? prev + 1 : prev;
      } else if (action === "decrement") {
        return prev > 0 ? prev - 1 : prev;
      }
      return prev;
    });
  }
  const fetchPolls = async () => {
    const data = await getPolls();
    setPolls(data.polls);
    console.log(data.polls);
  };
  useEffect(() => {
    fetchPolls();
  }, []);
  return (
    <>
      <div>
        <div className={`card-sm `}>
          <CardTitle title="Polls" IconName={BiPoll} />
          <hr />
          <div
            className={`py-2 px-8 rounded-xl mt-3 max-h-[232px] ${minHeight} overflow-y-auto`}
          >
            <div className="text-center">
              <div className="text-gray-500 text-xs">Topic</div>
              <div className="font-semibold flex justify-center">
                <HeroOutlined.MegaphoneIcon className="size-5 me-1" />
                {polls && polls[currentPoll].topic}
              </div>
              <div className="text-xs">By: Eber Villanobos</div>
              <div className="text-blue-500 flex items-center text-xs justify-center mt-2">
                <HeroOutlined.EyeIcon className="size-3" />
                See Details
              </div>
              <br />
              {polls &&
                polls[currentPoll].options.map((option, index) => (
                  <div key={index} id="votePanel" className="mb-2">
                    <div className="flex justify-between">
                      <p className="mb-1">{option.content}</p>
                      <div className="flex items-center gap-1 mb-1">
                        <HeroOutlined.UserCircleIcon className="size-4" />
                        <div className="text-xs">+4</div>
                      </div>
                    </div>
                    <BorderLinearProgress
                      variant="determinate"
                      value={20}
                      height={20}
                      shade="#00A3EE"
                    />
                  </div>
                ))}
            </div>
          </div>

          <br />
          <div className="flex justify-between gap-1">
            <div
              onClick={() => handlePollTraverse("decrement")}
              className="bg-gray-100 p-3 rounded-lg text-xs text-center basis- hover:cursor-pointer"
            >
              <HeroSolid.ChevronLeftIcon className="size-5 m-auto" />
            </div>
            <DialogBox buttonText="Vote">hey</DialogBox>
            <div
              onClick={() => handlePollTraverse("increment")}
              className="bg-gray-100 p-3 rounded-lg text-xs text-center basis- hover:cursor-pointer "
            >
              <HeroSolid.ChevronRightIcon className="size-5 m-auto" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
