import { Link } from "react-router-dom";
import React, { useState } from "react";
import * as Router from "react-router-dom";
import * as api from "../api";
const Register = () => {
  const navigate = Router.useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    category: "",
    password: "",
    confirm_password: "",
  });

  const checkPassword = (user) => {
    if (user.password === user.confirm_password) {
      return true;
    } else {
      setErrors({ password: "Password does not match!" });
      return false;
    }
  };

  const categories = [
    { name: "Fraternity", value: "F" },
    { name: "Ladies' Circle", value: "LC" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors("");
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const registerForm = async (event) => {
    event.preventDefault();
    if (checkPassword(user)) {
      try {
        const response = await api.registerUser(user);
        if (response.status === 201) {
          navigate("/login");
          Router;
        } else {
          setErrors({ email: response });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="m-auto max-w-lg flex min-h-screen flex-col justify-center py-12 lg:px-8">
      <form onSubmit={registerForm}>
        <div className="card">
          <p>Ω</p>

          <h2 className="text-center font-bold "> Register </h2>
          <br />

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label>
                <p>First Name</p>
              </label>
              <input
                name="first_name"
                required
                type="text"
                placeholder="Juan"
                value={user.first_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>
                <p>Last Name</p>
              </label>
              <input
                name="last_name"
                required
                type="text"
                placeholder="Dela Cruz"
                value={user.last_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-3 my-3">
            {categories.map((category) => (
              <label key={category.value} className="flex space-x-1">
                <input
                  required
                  type="radio"
                  name="category"
                  value={category.value}
                  checked={user.category === category.value}
                  onChange={handleChange}
                />
                <p>{category.name}</p>
              </label>
            ))}
          </div>

          <div>
            <label>
              <p>Email</p>
            </label>
            <input
              name="email"
              required
              type="email"
              placeholder="example@mail.com"
              value={user.email}
              onChange={handleChange}
            />

            <div className="text-red-400 text-center">
              <p>{errors.email}</p>
            </div>

            <label>
              <p>Password</p>
            </label>
            <input
              name="password"
              required
              type="password"
              placeholder="password"
              value={user.password}
              onChange={handleChange}
            />

            <label>
              <p>Confirm Password</p>
            </label>
            <input
              name="confirm_password"
              required
              type="password"
              placeholder="password"
              value={user.confirm_password}
              onChange={handleChange}
            />
          </div>
          <div className="text-red-400 text-center">
            <p>{errors.password}</p>
          </div>

          <br />
          <div>
            <button type="submit" className={"w-full disabled"}>
              Register
            </button>
          </div>
          <br />
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login">
              <b>Sign in</b>
            </Link>
          </p>
        </div>

        <br />
      </form>
    </div>
  );
};

export default Register;
