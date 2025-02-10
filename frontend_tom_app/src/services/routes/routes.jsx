import { Outlet } from "react-router-dom";
import SideNav from "./../../components/SideNav.jsx";
import FourOFour from "./../../components/FourOFour.jsx";
import NavBar from "./../../components/NavBar.jsx";
import { createBrowserRouter } from "react-router-dom";
import * as api from "./../../api";
import Login from "./../../pages/Login";
import Execomm from "./../../pages/Execomm.jsx";
import Dashboard from "./../../pages/Dashboard";
import Profile from "./../../pages/Profile";
import About from "./../../pages/About.jsx";
import Register from "./../../pages/Register";
import Bulletin from "../../pages/ExecommComponents/Bulletin.jsx";
import Feed from "./../../pages/Feed";
import ProtectedRoute from "./../../components/ProtectedRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    errorElement: <FourOFour></FourOFour>, // Custom error page
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
        element: <Feed />,
      },
      {
        path: "/schedules",
        element: <div>Schedules</div>,
      },
      {
        name: "allResidents",
        path: "/residents",
        element: <div>Residents</div>,
      },
      {
        path: "/execomm",
        element: <Execomm />,
      },
      {
        name: "bulletin",
        path: "/execomm/bulletin",
        element: <Bulletin />,
      },
      {
        path: "/about",
        element: (
          <div>
            <About />
          </div>
        ),
      },
      {
        path: "/tomlympics",
        element: <div>Tomlympics</div>,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

function MainContainer() {
  // const renderElement = useSelector((state) => state.user.loggedIn);

  return (
    <div className="flex">
      <div className="hidden lg:block">{api.isLoggedIn() && <SideNav />}</div>
      <div className="w-full">
        {api.isLoggedIn() && <NavBar />}
        <div className="px-3 lg:px-10">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
