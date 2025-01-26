import React, { useEffect, useState } from "react";
import UploadDialog from "../components/ProfileComponents/UploadDialog.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser, showImage } from "./../api.js";
import ButtonIcon from "../components/ButtonIcon.jsx";
import { PencilIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { FaSave } from "react-icons/fa";
const Profile = () => {
  let [user, setUser] = useState("");
  let [updatedUser, setUpdatedUser] = useState("");
  let [editMode, setEditMode] = useState(false);
  let user_id = useSelector((state) => state.user.user.id);
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const fetchUser = async () => {
    try {
      const userData = await getUser(user_id);
      setUser(userData);
      return await userData;
    } catch (error) {}
  };

  const updateUserData = async (userData) => {
    try {
      const response = await updateUser(user_id, userData);
      setUser(response.user);
    } catch (error) {}
  };

  const handleSubmitBatch = async (event) => {
    event.preventDefault();
    try {
      updateUserData(updatedUser);
      setUpdatedUser("");
    } catch (error) {}
  };

  const handlSubmitUser = async (event) => {
    console.log("FROM USER EDIT");
    event.preventDefault();
    if (updatedUser != "") {
      updateUserData(updatedUser);
      setUpdatedUser("");
    } else {
      console.log("EDIT CLICKED");
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value, // Only update the field being edited
    }));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div>
        <div>
          <h3 className="text-gray-500 mb-5">Omegan Profile</h3>
          <div>
            <div className="lg:flex  items-center gap-5">
              <div className="mb-5">
                <div className="relative w-36">
                  <img
                    src={showImage(user.profile_picture_url)}
                    className="size-36 rounded-full"
                  />

                  <div></div>

                  <button
                    onClick={open}
                    className="size absolute right-[5px] bottom-[2px] p-1 bg-gray-300"
                  >
                    <PencilSquareIcon className="size-5" />
                  </button>

                  <UploadDialog
                    fetchUser={fetchUser}
                    isOpen={isOpen}
                    close={close}
                    user_id={user_id}
                  />
                </div>
              </div>
              <div className="">
                <div className="font-semibold text-2xl lg:text-3xl md:text-2xl ">
                  {user.first_name} {user.last_name}
                </div>
                <div>
                  <p className="badge">{user.username && user.username}</p>
                </div>
              </div>
            </div>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-y-2">
              <div>
                <p className="small-title mb-1">Batch</p>
                {user.batch_name && user.year ? (
                  <>
                    <div className="text-md lg:text-lg md:text-md">
                      {user.year ? user.year : "XXXX"} |{" "}
                      {user.batch_name ? user.batch_name : "Batch"}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="">
                      <form onSubmit={handleSubmitBatch}>
                        <div className="flex gap-2 items-center">
                          <input
                            name="year"
                            className=""
                            placeholder="Input Year"
                            type="number"
                            onChange={handleChange}
                          />
                          <div>|</div>
                          <input
                            name="batch_name"
                            className=""
                            placeholder="Batch Name"
                            type="text"
                            onChange={handleChange}
                          />
                          <button type="submit">Save</button>
                        </div>
                      </form>
                    </div>
                  </>
                )}
              </div>

              <div className="lg:ml-auto md:ml-auto">
                <p className="small-title mb-1">Category</p>
                <div className="text-md lg:text-lg md:text-md">
                  {user.category
                    ? user.category == "F"
                      ? "Fraternity"
                      : "Ladies' Circle"
                    : "N/A"}
                </div>
              </div>

              <div className="lg:ml-auto md:ml-auto">
                <p className="small-title mb-1">Committee</p>
                <div className="text-md lg:text-lg md:text-md">
                  {user.general_committee ? user.general_committee : "N/A"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        {user && (
          <>
            <form onSubmit={handlSubmitUser}>
              <div className="">
                <div className="max-w-36 mb-3">
                  <p className="small-title mb-2">@handle</p>
                  <input
                    name="username"
                    onChange={handleChange}
                    readOnly={!editMode}
                    type="email"
                    required
                    value={
                      editMode
                        ? updatedUser.username ?? user.username ?? "" // Ensure fallback to a default value
                        : user.username ?? "" // For non-edit mode
                    }
                  />
                </div>
                <div className="grid-cols-2 grid gap-3 mb-3">
                  <div>
                    <p className="small-title mb-2">First Name</p>
                    <input
                      name="first_name"
                      onChange={handleChange}
                      readOnly={!editMode}
                      type="text"
                      value={
                        editMode
                          ? updatedUser.first_name ?? user.first_name ?? "" // Ensure fallback to a default value
                          : user.first_name ?? "" // For non-edit mode
                      }
                    />
                  </div>
                  <div>
                    <p className="small-title mb-2">Last Name</p>
                    <input
                      name="last_name"
                      onChange={handleChange}
                      readOnly={!editMode}
                      type="text"
                      value={
                        editMode
                          ? updatedUser.last_name ?? user.last_name ?? ""
                          : user.last_name
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
                  <div>
                    <p className="small-title mb-2">Email</p>
                    <input
                      name="email"
                      onChange={handleChange}
                      readOnly={!editMode}
                      type="email"
                      autoComplete="email"
                      value={
                        editMode
                          ? updatedUser.email
                          : user.email
                          ? user.email
                          : ""
                      }
                    />
                  </div>

                  <div>
                    <p className="small-title mb-2">Mobile No.</p>

                    <input
                      readOnly={!editMode}
                      onChange={handleChange}
                      name="mobile_no"
                      type="number"
                      value={
                        editMode
                          ? updatedUser.mobile_no
                          : user.mobile_no
                          ? user.mobile_no
                          : ""
                      }
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-1">
                    <p className="small-title mb-2">Birthday</p>
                    <input
                      name="birthday"
                      onChange={handleChange}
                      readOnly={!editMode}
                      type="date"
                      value={
                        editMode
                          ? updatedUser.birthday
                          : user.birthday
                          ? user.birthday
                          : ""
                      }
                    />
                  </div>
                </div>
              </div>

              <br />

              <div className="flex gap-2 justify-end">
                <button
                  className={`${
                    editMode ? "bg-green-500 hover:bg-green-600 text-white" : ""
                  }`}
                  onClick={() => setEditMode(!editMode)}
                >
                  <div className={`flex items-center`}>
                    {!editMode ? (
                      <PencilIcon className="size-4 me-1" />
                    ) : (
                      <FaSave className="size-4 me-1" />
                    )}
                    <p>{editMode ? "Save" : "Edit"}</p>
                  </div>
                </button>

                {editMode && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.reload();
                    }}
                    className="bg-red-500 text-white hover:bg-red-600 "
                  >
                    <div className="flex items-center ">
                      <p>Cancel</p>
                    </div>
                  </button>
                )}
              </div>
            </form>
          </>
        )}

        <div className="mb-2"></div>
      </div>
    </>
  );
};

export default Profile;
