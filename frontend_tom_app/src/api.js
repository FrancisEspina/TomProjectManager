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
    const response = await axiosInstance.get("/users/user", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data; // Return the data if needed
  } catch (error) {
    console.log(error);
    // logoutUser();
    throw error.response?.data?.error_description || "An error occurred";
  }
};

export const getUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.data.user; // Return the data if needed
  } catch (error) {}
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axiosInstance.put(
      `/users/user/${userId}`,
      { user: userData },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
    // return response.data.user; // Return the data if needed
  } catch (error) {}
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

export const getPosts = async () => {
  try {
    const response = await axiosInstance.get("/posts", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data.error_description;
  }
};

export const createPost = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/posts",
      {
        id: payload.user_id,
        post: {
          content: payload.content,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data.error_description;
  }
};

export const updateProfilePic = async (formData, userId) => {
  try {
    console.log(formData); // Log the FormData contents for debugging

    const response = await axios.patch(
      `${API_URL}/users/user/${userId}/upload_profile_picture`, 
      formData, 
      {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
          Authorization: `Bearer ${getToken()}`, // Include token if authentication is required
        },
      }
    );

    console.log("Response:", response.data); // Log the server response
    return response.data; // Return response if needed
  } catch (error) {
    console.error(
      "Error:",
      error.response?.data?.error_description || error.message
    );
    throw error; // Re-throw the error for further handling
  }
};
