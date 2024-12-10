import React from "react";
import { useParams } from "react-router-dom";

const ProfessorDashboard = () => {
  const { id } = useParams();

  return (
    <div className="w-[75%] flex flex-col justify-center items-center gap-5">
      <div>
        <h1>Welcome {id} 👋</h1>
      </div>
      <div className="w-full">
        <button className="bg-rose-500 p-2 text-white rounded-lg">
          + Create new Assignment
        </button>
      </div>
      <div className="w-full flex flex-col p-4 gap-4">
        <div className="flex justify-between items-center bg-slate-200 p-4 rounded-xl">
          <div className="flex gap-10">
            <h1>Assignment - name1</h1>
            <h1>Dec 10</h1>
          </div>
          <button className="bg-slate-400 p-2 rounded-lg shadow-md shadow-black">
            Check Assignment
          </button>
        </div>
        <div className="flex justify-between items-center bg-slate-200 p-4 rounded-xl">
          <div className="flex gap-10">
            <h1>Assignment - name1</h1>
            <h1>Dec 12</h1>
          </div>
          <button className="bg-slate-400 p-2 rounded-lg shadow-md shadow-black">
            Check Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessorDashboard;
