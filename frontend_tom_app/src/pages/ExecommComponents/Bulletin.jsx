import React, { useEffect, useState } from "react";
import ButtonIcon from "../../components/ButtonIcon";
import {
  EyeIcon,
  MegaphoneIcon,
  MinusIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { BiCalendarExclamation, BiPoll } from "react-icons/bi";
import { FaPoll } from "react-icons/fa";
import { getAnnouncements, postAnnouncement } from "../../api";
import { useSelector } from "react-redux";
import { timeAgo } from "../../helpers/utils";

const Announcements = () => {
  const userId = useSelector((state) => state.user.user.id);
  const [announcements, setAnnouncement] = useState();
  const [myAnnouncements, setMyAnnouncements] = useState();

  const fetchAnnouncements = async () => {
    const data = await getAnnouncements();
    console.log("FETCHHHHH", data.announcements);
    setAnnouncement(data.announcements);

    const filteredData = data.announcements.filter(
      (announcement) => announcement.user.user_id == userId
    );

    setMyAnnouncements(filteredData);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <>
      <div>
        <h3 className="text-gray-500">BULLETIN</h3>
        <br />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-2">
          <div>
            <NewAnnouncement fetchAnnouncements={fetchAnnouncements} />
          </div>
          <div className="">
            <AllAnnouncements announcements={announcements} />
          </div>
        </div>

        <div>
          <MyAnnouncements myAnnouncements={myAnnouncements} />
        </div>
      </div>
    </>
  );
};

const MyAnnouncements = ({ myAnnouncements }) => {
  const headers = [
    "Announcment ID",
    "Title",
    "Polls",
    "Date Created",
    "Expiration",
    "Action",
  ];
  return (
    <>
      <div className="card-sm">
        <p>My Announcements</p>
        <div className="relative rounded-xl overflow-x-auto mt-3">
          <table className="w-full text-sm text-left   ">
            <thead className="text-xs bg-gray-100  ">
              <tr>
                {headers &&
                  headers.map((header, index) => (
                    <th key={index} className="px-6 py-3">
                      {header}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {myAnnouncements &&
                myAnnouncements.map((entry) => (
                  <tr
                    key={entry.id}
                    className="bg-white hover:bg-gray-100 text-gray-500 hover:text-black"
                  >
                    <td className="px-6 py-4">A{entry.id}</td>
                    <td className="px-6 py-4">{entry.title}</td>
                    {entry.poll ? (
                      <td className="px-6 py-4">
                        <ButtonIcon text="Results" icon={EyeIcon} />
                      </td>
                    ) : (
                      <>
                        <td className="px-6 py-4">
                          <div className="text-start">-</div>
                        </td>
                      </>
                    )}
                    <td className="px-6 py-4">{timeAgo(entry.created_at)}</td>
                    <td className="px-6 py-4">
                      {entry.expiration ? entry.expiration : "N/A"}
                    </td>
                    <td className="px-6 py-4 flex gap-1 ">
                      <ButtonIcon
                        text="Delete"
                        icon={TrashIcon}
                        color="hover:bg-red-500 bg-gray-200 hover:text-white"
                      />

                      <ButtonIcon
                        text="Edit"
                        icon={PencilIcon}
                        color="hover:bg-blue-500 bg-gray-200 hover:text-white"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const NewAnnouncement = ({ fetchAnnouncements }) => {
  const [hasPoll, setHasPoll] = useState(false);
  const [options, setOptions] = useState(3);
  const [announcement, setAnnouncement] = useState({});
  const [poll, setPoll] = useState({});

  const handlePost = async (announcement) => {
    if (announcement.title && announcement.content) {
      if (poll.topic && poll.options) {
        announcement.topic = poll.topic;
        announcement.options = poll.options;
      }
      try {
        const response = await postAnnouncement(announcement);
        console.log("ANNOUNCEMENT CREATED", response);
      } catch (error) {}
    } else {
      console.log("empty");
    }

    fetchAnnouncements();
    setAnnouncement({});
  };

  const handleAnnouncementChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setAnnouncement((prev) => ({ ...prev, [name]: value }));
  };

  const removeOptions = () => {
    if (poll.options) {
      let last_key = Object.keys(poll.options).pop();
      last_key == options - 1 && delete poll.options[last_key];
    }
    options > 0 && setOptions((prev) => prev - 1);
  };

  const handlePollChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setPoll((prev) => {
      if (name === "topic") {
        return { ...prev, [name]: value };
      } else {
        return {
          ...prev,
          options: { ...prev.options, [name]: value }, // Preserve existing options
        };
      }
    });
    console.log(poll);
  };

  return (
    <>
      <div className="relative">
        <div className="flex items-end gap-2">
          <div className="">
            <p className="text-gray-500 mb-1">Title</p>
            <input
              name="title"
              placeholder="Announcement"
              className=""
              onChange={handleAnnouncementChange}
              value={announcement.title || ""} // Ensure controlled input
              type="text"
            />
          </div>

          <div className="">
            <p className="text-gray-500 mb-1">Expiration</p>
            <input
              name="expiration"
              className=""
              type="date"
              onChange={handleAnnouncementChange}
              value={announcement.expiration || ""} // Ensure controlled input
            />
          </div>

          <div className="ml-auto" onClick={() => setHasPoll(!hasPoll)}>
            <ButtonIcon
              color={`hover:bg-gray-500 text-white h-screen  ${
                hasPoll ? "bg-red-500" : "bg-green-500"
              }`}
              text={hasPoll ? "Remove Poll" : "Add Poll"}
              icon={FaPoll}
            />
          </div>
        </div>

        <div className="mt-3 mb-2">
          <p className="text-gray-500 mb-1">Details</p>
          <textarea
            name="content"
            onChange={handleAnnouncementChange}
            placeholder="What's happening? 📢"
            className="textarea-blank focus:ring-[3px] text-sm ring-offset-[2px] ring-yellow-400 bg-gray-200 rounded-2xl"
            style={{ height: "50px" }} // Initial height
            value={announcement.content || ""} // Ensure controlled input
          ></textarea>
        </div>
        {hasPoll ? (
          <>
            <div>
              <div className="text-sm my-3 flex items-center">
                <BiPoll />
                <div>Poll</div>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-gray-500 mb-1">Topic</p>
                  <div className="mb-5 w-44">
                    <input
                      name="topic"
                      onChange={handlePollChange}
                      value={poll.topic || ""}
                      type="text"
                      placeholder="Ask something"
                    />
                  </div>
                </div>

                <div
                  className="ml-auto"
                  onClick={() => {
                    setOptions((prev) => prev + 1);
                  }}
                >
                  <ButtonIcon
                    color="bg-gray-400 text-white"
                    icon={PlusIcon}
                    text=""
                  />
                </div>
                <div
                  onClick={() => {
                    removeOptions();
                  }}
                >
                  <ButtonIcon
                    color="bg-gray-400 text-white"
                    icon={MinusIcon}
                    text=""
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-end gap-2">
                {Array.from({ length: options }).map((option, index) => (
                  <div key={index} className="">
                    <p className="text-gray-500 mb-1">Option {index + 1}</p>
                    <input
                      value={poll.options?.[index] || ""}
                      onChange={handlePollChange}
                      name={index}
                      type="text"
                      placeholder="Input Option"
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center border-2 border-gray-300 border-dashed rounded-xl bg-gray-100 h-[200px]">
              <div className="flex items-center gap-2 text-gray-500">
                <BiPoll size={30} />
                Add Poll
              </div>
            </div>
          </>
        )}

        {announcement.title &&
          announcement.content &&
          announcement.expiration && (
            <div className="flex justify-center mt-3">
              <button
                onClick={() => {
                  handlePost(announcement);
                }}
                className="bg-red-500 text-white w-full"
              >
                <div className="flex justify-center items-center gap-1 mx-5 lg:mx-0 md:mx-0 sm:mx-0">
                  <MegaphoneIcon className="size-7 lg:size-5 md:size-5 sm:size-5 " />
                  <p className="hidden lg:block md:block sm:block">Announce</p>
                </div>
              </button>
            </div>
          )}
      </div>
    </>
  );
};

const AllAnnouncements = ({ announcements }) => {
  return (
    <>
      <div className="card-sm">
        <div className="mb-3">
          <p>Announcements</p>
        </div>
        <div className="overflow-auto max-h-[310px] p-1">
          {announcements &&
            announcements.map((announcement, index) => (
              <div key={index}>
                <div className="p-3 rounded-lg hover:bg-gray-200 cursor-pointer mb-1">
                  <div className="mb-1 text-red-500 font-semibold">
                    <MegaphoneIcon className="size-5" />
                    <h5>{announcement.title}</h5>
                  </div>

                  <div className="text-xs">{announcement.content}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Announcements;
