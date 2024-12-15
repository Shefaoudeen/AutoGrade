import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-[#171717] flex justify-center  items-center">
      <Link to={"/"}>
        <h1 className="text-2xl font-bold py-2">AutoGrade 📝</h1>
      </Link>
    </div>
  );
};

export default Header;
