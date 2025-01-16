import React from "react";
import * as router from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../services/store/reducers/AuthSlice.js";
import { persistor } from "../services/store/Store.js";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = router.useNavigate();
  const logoutUser = () => {
    dispatch(logout());
    sessionStorage.clear();
    localStorage.removeItem("persist:root");
    persistor.purge(); // Clear persisted Redux state
    navigate("/login");
  };

  return <button onClick={logoutUser}>Logout</button>;
};

export default LogoutButton;
