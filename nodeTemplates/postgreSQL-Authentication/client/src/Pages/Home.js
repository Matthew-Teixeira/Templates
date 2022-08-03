import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 className="text-center text-3xl">Home Page</h1>
      <div className="flex justify-end">
        <div className="p-4">
          <Link to="/login">Login</Link>
        </div>
        <div className="p-4">
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
