import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const [authenticated, SetAuthenticated] = useState(null);
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");

  const onSubmit = () => {
    if (username == "" || password == "") {
      alert("Enter the required Fields");
      return;
    }
    if (id == "professor") {
      //Professor login

      axios
        .get(
          `http://localhost:8000/login/?username=${username}&password=${password}&role=P`
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
    if (id == "student") {
      /*Student login */
      axios
        .get(
          `http://localhost:8000/login/?username=${username}&password=${password}&role=S`
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
      <div className="flex flex-col gap-4 items-center border-2 border-black px-6 py-4">
        <div>
          Username :{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => {
              SetUsername(e.target.value);
            }}
            className="bg-gray-300 rounded-md shadow-md shadow-gray-800 p-1"
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
            className="bg-gray-300 rounded-md shadow-md shadow-gray-800 p-1"
          />
        </div>
        <button
          className="bg-blue-400 px-4 py-2 rounded-lg text-white shadow-md shadow-black "
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
