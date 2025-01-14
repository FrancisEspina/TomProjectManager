import React from "react";
import * as Router from "react-router-dom";
import { useDispatch } from "react-redux";
import * as api from "./../api";
import { setUser } from "../services/store/reducers/AuthSlice";

const Login = () => {
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
        dispatch(setUser(data.resource_owner));
        navigate("/");
      }
    } catch (error) {
      setError("Invalid Email or Password");
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <div className="card">
        <p>TΩM</p>
        <h2>Login</h2>
        <form onSubmit={submitForm}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />

          <div style={{ minHeight: "15px" }}>
            <p className="text-red">{errors}</p>
          </div>
          <div style={{ marginTop: "5", width: "100%" }}>
            <button type="submit">Log In</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
