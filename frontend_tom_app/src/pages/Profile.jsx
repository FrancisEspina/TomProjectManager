import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "./../api.js";
const Profile = () => {
  let user = useSelector((state) => state.user.user);
  const fetchUser = async () => {
    try {
      const userData = await getUser(user.id);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div>
        <h1>Profile</h1>
      </div>
    </>
  );
};

export default Profile;
