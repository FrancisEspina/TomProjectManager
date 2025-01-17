import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../api";

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

// ✅ Custom hook for redirecting to dashboard if logged in
export const useRedirectToDash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, [navigate]);
};
