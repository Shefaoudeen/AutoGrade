import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Login = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");

  const onSubmit = () => {
    if (username == "" || password == "") {
      alert("Enter the required Fields");
      return;
    }
    if (id == "professor") {
      //Professor login

      let loginState = {
        //some logic
        //return true or false
      };

      if (loginState == true) {
        navigation(`/professor/${username}`);
      } else {
        alert("Incorrect Username or Password");
      }
    }
    if (id == "student") {
      /*Student login */
      let loginState = {
        //some logic
        //return true or false
      };

      if (loginState == true) {
        navigation(`/student/${username}`);
      } else {
        alert("Incorrect Username or Password");
      }
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
