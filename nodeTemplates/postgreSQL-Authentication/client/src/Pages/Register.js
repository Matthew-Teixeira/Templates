import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState("");

  const registerUser = async (username, email, password, confirmPassword) => {
    fetch("http://localhost:5000/api/user/register", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setErrors(data.error);
        } else {
          Auth.login(data.token);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(formData);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    registerUser(
      formData.username,
      formData.email,
      formData.password,
      formData.confirmPassword
    );
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" //Change Image
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Register for an account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or already have an account?{" "}
              <Link to="/login" className="text-indigo-600">
                Login here
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  onChange={onChange}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div className="my-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  onChange={onChange}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  onChange={onChange}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                  onChange={onChange}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="confirmPassword"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
      {errors !== "" ? <p className="text-center">{errors}</p> : false}
    </>
  );
};

export default Register;
