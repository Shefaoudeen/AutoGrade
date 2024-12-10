import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <div className="flex flex-col gap-5 items-center">
        <Link to="/login/professor" className="w-full">
          <button className="bg-blue-400 px-4 py-2 rounded-lg text-white shadow-md shadow-black w-full">
            Log in as Professor
          </button>
        </Link>
        <Link to="/login/student" className="w-full">
          <button className="bg-blue-400 px-4 py-2 rounded-lg text-white shadow-md shadow-black w-full">
            Log in as Student
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
