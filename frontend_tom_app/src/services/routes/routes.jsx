import { Outlet } from "react-router-dom";
import SideNav from "./../../components/SideNav.jsx";
import NavBar from "./../../components/NavBar.jsx";
import { createBrowserRouter } from "react-router-dom";
import * as api from "./../../api";
import Login from "./../../pages/Login";
import Dashboard from "./../../pages/Dashboard";
import Register from "./../../pages/Register";
import ProtectedRoute from "./../../components/ProtectedRoute";
import { useSelector } from "react-redux";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    children: [
      {
        path: "/", // yes, again
        element: <ProtectedRoute element={<Dashboard />} />,
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/projects",
        element: <div>Projects</div>,
      },
      {
        path: "/feed",
        element: <div>Feed</div>,
      },
      {
        path: "/schedules",
        element: <div>Schedules</div>,
      },
      {
        path: "/residents",
        element: <div>Residents</div>,
      },
      {
        path: "/execomm",
        element: <div>Execomm</div>,
      },
    ],
  },
]);

function MainContainer() {
  const renderElement = useSelector((state) => state.user.loggedIn);
  return (
    <div className="flex">
      {renderElement && <SideNav />}
      <div className="w-full">
        {renderElement && <NavBar />}
        <div className="px-10">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
