import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../services/store/reducers/AuthSlice.js";
import { persistor } from "../services/store/Store.js";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logout());
    persistor.purge(); // Clear persisted Redux state
    sessionStorage.clear();
    localStorage.clear();
  };

  return <button onClick={logoutUser}>Logout</button>;
};

export default LogoutButton;
