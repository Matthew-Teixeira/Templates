import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");

  const loginUser = async (email, password) => {
    fetch("http://localhost:5000/api/user/login", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        email,
        password,
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
    loginUser(formData.email, formData.password);
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" //Change Image
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link to="/register" className="text-indigo-600">
              register here
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
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
          </div>

          <div className="text-sm text-center">
            <a
              href="!#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Sign in
            </button>
          </div>
        </form>
      </div>
      {errors !== "" ? <p className="text-center">{errors}</p> : false}
    </div>
  );
};

export default Login;
