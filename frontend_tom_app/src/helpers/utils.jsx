import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../api";
import { useSelector } from "react-redux";

// ✅ Function to return category names
export const getCategoryName = (category) => {
  switch (category) {
    case "F":
      return "Brod";
    case "LC":
      return "Sis";
    default:
      return "Unknown"; // Handle unexpected cases
  }
};

export const current_user = () => {
  let user = useSelector((state) => state.user.user);
  return user;
  // const { id, first_name, last_name, email, username, batch_name, year } = user;
  // return { id, first_name, last_name, email, username, batch_name, year };
};

// ✅ Custom hook for redirecting to dashboard if logged in
export const useRedirectToDash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, [navigate]);
};

export function timeAgo(createdAt) {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInSeconds = Math.floor((now - createdDate) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h`;
  } else {
    // If the difference is more than a day, format and display the date
    return createdDate.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  }
}
