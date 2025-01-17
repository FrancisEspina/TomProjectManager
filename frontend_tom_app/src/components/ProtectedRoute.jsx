import { Navigate } from "react-router-dom";
import * as api from "./../api";

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = api.isLoggedIn(); // Check if the user is logged in
  return !isLoggedIn ? <Navigate to="/login" replace /> : element;
};

export default ProtectedRoute;
