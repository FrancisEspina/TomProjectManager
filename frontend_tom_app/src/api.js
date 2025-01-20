import axios from "axios";
import { persistor } from "./services/store/Store.js";

const API_URL = "http://192.168.1.5:3000";

const axiosInstance = axios.create({
  baseURL: API_URL, // Rails API URL
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = () => {
  try {
    const permitRoot = JSON.parse(localStorage.getItem("persist:root")).user;
    const token = JSON.parse(permitRoot).token;
    return token;
  } catch (error) {
    return null;
  }
};

const getRefreshToken = () => {
  try {
    const permitRoot = JSON.parse(localStorage.getItem("persist:root")).user;
    const token = JSON.parse(permitRoot).refresh_token;
    return token;
  } catch (error) {
    return null;
  }
};

export const isLoggedIn = () => {
  try {
    const permitRoot = JSON.parse(localStorage.getItem("persist:root")).user;
    const loggedIn = JSON.parse(permitRoot).loggedIn;
    const token = getToken();
    if (loggedIn && token != null) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const logoutUser = () => {
  localStorage.clear();
  persistor.purge();
  window.location.replace("/login");
};

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/users/tokens/sign_in", {
      email,
      password,
    });
    window.location.replace("/");
    return response;
  } catch (error) {
    console.log("Error Logging in", error);
    throw error;
  }
};

export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/users/tokens/sign_up", {
      email: payload.email,
      password: payload.password,
      first_name: payload.first_name,
      last_name: payload.last_name,
      category: payload.category,
    });

    return response;
  } catch (error) {
    return error.response.data.error_description;
  }
};

export const getUsers = async (payload) => {
  try {
    const token = getToken(); // Replace with the actual token or fetch it dynamically
    const response = await axiosInstance.get("/users/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the data if needed
  } catch (error) {
    console.log(error);
    // logoutUser();
    throw error.response?.data?.error_description || "An error occurred";
  }
};

export const checkValid = async () => {
  const token = getToken();
  const refresh_token = getRefreshToken();

  try {
    const response = await axiosInstance.get("/users/tokens/info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("STILL VALID");
    console.log(response);
    return true; // Return true if
  } catch (error) {
    try {
      const response = await axiosInstance.post("/users/tokens/refresh", {
        access_token: refresh_token,
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        },
      });
      console.log("RENEWING......");
      window.location.reload();
      return response;
    } catch (err) {
      console.log("ERROR", err);
      console.log("REFRESH TOKEN EXPIRED... YOU WILL BE LOGGED OUT");
      logoutUser();
    }
  }
};
