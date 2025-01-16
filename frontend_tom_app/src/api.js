import axios from "axios";

const API_URL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: API_URL, // Rails API URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const isLoggedIn = () => {
  const accessToken = sessionStorage.getItem("access_token");
  const refreshToken = sessionStorage.getItem("refresh_token");

  // Check if both tokens are present and valid
  if (accessToken && refreshToken) {
    return true; // User is logged in
  }
  return false; // Either access_token or refresh_token is missing
};

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/users/tokens/sign_in", {
      email,
      password,
    });
    sessionStorage.setItem("access_token", response.data.token);
    sessionStorage.setItem("refresh_token", response.data.refresh_token);
    console.log(response.data);
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
