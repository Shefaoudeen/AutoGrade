import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const [authenticated, SetAuthenticated] = useState(null);
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [role, SetRole] = useState(null);

  const onSubmit = () => {
    if (username == "" || password == "") {
      alert("Enter the required Fields");
      return;
    }
    if (role === "P") {
      //Professor login

      axios
        .get(
          `http://localhost:8080/login/?username=${username}&password=${password}&role=P`
        )
        .then((res) => {
          console.log(res.data);
          if (res.data?.authenticate === true) {
            SetAuthenticated(true);
            navigation(`/professor/${username}`, {
              state: {
                professorName: res.data?.name,
                role: "P",
                professorId: res.data?.id,
              },
            });
          } else {
            alert("Incorrect Username or Password");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (role === "S") {
      /*Student login */
      axios
        .get(
          `http://localhost:8080/login/?username=${username}&password=${password}&role=S`
        )
        .then((res) => {
          console.log(res.data);
          if (res.data?.authenticate === true) {
            SetAuthenticated(true);
            navigation(`/student/${username}`, {
              state: {
                studentName: res.data?.name,
                role: "S",
                studentId: res.data?.id,
              },
            });
          } else {
            alert("Incorrect Username or Password");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 items-center  justify-around px-6 py-4 bg-[#171717] min-h-[30vh]">
        <div>
          Username :{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => {
              SetUsername(e.target.value);
            }}
            className="bg-gray-300 rounded-md shadow-md shadow-gray-800 p-1 text-black"
          />
        </div>
        <div>
          Password :{" "}
          <input
            type="text"
            value={password}
            onChange={(e) => {
              SetPassword(e.target.value);
            }}
            className="bg-gray-300 rounded-md shadow-md shadow-gray-800 p-1 text-black"
          />
        </div>
        <div className="flex gap-2 items-center">
          Role :{" "}
          <div className="flex gap-2">
            <button
              className={`${
                role === "S" ? "bg-green-400" : "bg-slate-400"
              } px-4 py-2 rounded-xl`}
              onClick={() => SetRole("S")}
            >
              Student
            </button>
            <button
              className={`${
                role === "P" ? "bg-green-400" : "bg-slate-400"
              } px-4 py-2 rounded-xl`}
              onClick={() => SetRole("P")}
            >
              Professor
            </button>
          </div>
        </div>
        <button
          className="bg-green-400 px-4 py-2 rounded-lg text-white shadow-md shadow-black "
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
