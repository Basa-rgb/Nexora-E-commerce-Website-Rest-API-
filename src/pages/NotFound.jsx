import React from "react";
import { Link } from "react-router-dom";
import Error404 from "../assets/404.jpg";

const NotFound = () => {
  return (
    // Full-screen centered layout for the 404 error page
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center ">

      {/* 404 illustration image */}
      <img
        src={Error404}
        alt="404 Not Found"
        className="w-[280px] md:w-[350px]"
      />

      {/* Error heading */}
      <h1 className="text-2xl md:text-3xl font-bold mt-4">
        Page Not Found
      </h1>

      {/* Descriptive message explaining the error */}
      <p className="text-gray-600 mt-2 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Button to navigate back to the home page */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg 
                   hover:bg-blue-700 transition-all duration-300"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;