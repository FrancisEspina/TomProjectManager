import { Link } from "react-router-dom";
import * as Router from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import * as api from "./../api";
import { setUser } from "../services/store/reducers/AuthSlice";
import { useRedirectToDash, getCategoryName } from "../helpers/utils.jsx";

const Login = () => {
  useRedirectToDash();

  const navigate = Router.useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setError] = React.useState("");

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      const response = await api.loginUser(email, password); // Wait for the API response
      if (response.status === 200) {
        const data = await response.data;
        dispatch(setUser(data));
      }
    } catch (error) {
      setError("Invalid Email or Password");
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <div className="m-auto max-w-md flex min-h-screen flex-col justify-center py-12 lg:px-6">
        <div className="card">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h3>Ω</h3>
            <h2 className="mt-10 text-center font-bold ">Sign In</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={submitForm}>
              <div>
                <label htmlFor="email" className="">
                  <p>Email</p>
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="">
                    <p>Password</p>
                  </label>
                </div>

                <div className="mt-1">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    name="password"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div className="my-5 justify-center flex gap-2">
                <p>
                  Dont have an account?{" "}
                  <Link to="/register">
                    <b>Sign Up</b>
                  </Link>
                </p>

                {/* <a
                  href="#"
                  className="font-semibold text-gray-600 hover:text-yellow-500"
                >
                  <p>Forgot password?</p>
                </a> */}
              </div>

              <div className="flex justify-center">
                <button
                  className="w-64  font-semibold bg-yellow-500 text-white hover:bg-yellow-400 hover:text-black"
                  type="submit"
                >
                  Sign in
                </button>
              </div>

              <br />

              <p className="text-center text-red-500">{errors}</p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
