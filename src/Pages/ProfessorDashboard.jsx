import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProfessorDashboard = () => {
  const formatingDate = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Ensure two digits for month
    const day = ("0" + date.getDate()).slice(-2); // Ensure two digits for day
    return `${year}-${month}-${day} 23:59:59`;
  };
  const location = useLocation();
  const { professorName, role, professorId } = location.state || {};
  const [createScreen, SetCreateScreen] = useState(false);
  const [mark, setMark] = useState(25);
  const [tech, SetTech] = useState(false);
  const [grammar, SetGrammar] = useState(false);
  const [speeling, SetSpeeling] = useState(false);
  const [questionfile, setquestionFile] = useState(null);
  const [keyfile, setkeyFile] = useState(null);
  const [output, setoutput] = useState(null);
  const [name, setname] = useState();
  const [deadline, SetDeadline] = useState(formatingDate(new Date()));
  const [uploadedfile1, setuploadfile1] = useState(null);
  const [uploadedfile2, setuploadfile2] = useState(null);
  const [allAssignments, SetAllAssignments] = useState([]);

  const handleFileChange = (event, setFileState, setUploadFileState) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileState(selectedFile); // Set file object in state
      setUploadFileState(selectedFile.name); // Set the file name for display
      console.log(selectedFile.name); // Log the name of the uploaded file
    }
  };

  const handlePlagiarism = (assignId) => {
    axios
      .post(`http://localhost:8080/professor/plag_check?a_id=${assignId}`)
      .then((res) => {
        console.log("plagiarism executed");
        const fileName = `Assignment-${assignId} Plagiarism.pdf`;
        const fileUrl = res.data?.result_path;

        // Trigger download
        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("download", fileName); // Set suggested file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGrade = (assignId) => {
    axios
      .post(`http://localhost:8080/professor/grade?a_id=${assignId}`)
      .then((res) => {
        console.log("Grade executed");
        const fileName = `Assign - ${assignId} Plagiarism.pdf`;
        const fileUrl = res.data?.result_path;

        // Trigger download
        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("download", fileName); // Set suggested file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeleteAssignment = (assignId) => {
    axios
      .delete(
        `http://localhost:8080/professor/deleteAssignment?a_id=${assignId}`
      )
      .then(() => {
        console.log("deleted");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/professor/getAssignment?p_id=${professorId}&filter=ongoing`
      )
      .then((res) => {
        SetAllAssignments(res.data);
      });
  }, []);

  const handleSubmit = async () => {
    /*
    const finalResponse = {
      p_id: professorId,
      title: name,
      deadline: deadline,
      // question_path: questionfile,
      //key_path: keyfile,
      total_marks: mark,
      technical_setting: tech,
      grammer_setting: grammar,
      spelling_setting: speeling,
      status: "ongoing",
    };*/

    const formData = new FormData();
    formData.append("p_id", professorId);
    formData.append("title", "rty");
    formData.append("deadline", "2024-12-27 23:59:59");
    formData.append("question_path", questionfile); // Replace with the actual file
    formData.append("key_path", keyfile); // Replace with the actual file
    formData.append("total_marks", 25);
    formData.append("technical_setting", true);
    formData.append("grammar_setting", false);
    formData.append("spelling_setting", false);
    formData.append("status", "ongoing");

    try {
      const response = await axios.post(
        `http://localhost:8080/professor/postAssignment?p_id=${professorId}&title=${name}&deadline=${deadline}&total_marks=${mark}&technical_setting=${tech}&grammar_setting=${grammar}&spelling_setting=${speeling}&status=ongoing`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      SetCreateScreen(false);
      window.location.reload(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  /*
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("p_id", professorId);
    formData.append("title", name);
    formData.append("deadline", "2024-12-27 23:59:59");
    formData.append("question_path", questionfile); // Ensure this is a file object
    formData.append("key_path", keyfile); // Ensure this is a file object
    formData.append("total_marks", mark);
    formData.append("technical_setting", true);
    formData.append("grammar_setting", false);
    formData.append("spelling_setting", false);
    formData.append("status", "ongoing");

    try {
      const response = await fetch(
        `http://localhost:8080/professor/postAssignment`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
      alert("Assignment created successfully!");
    } catch (error) {
      console.error("Error creating assignment:", error);
      alert("Failed to create assignment.");
    }
  };
  */

  return (
    <div className="w-[75%] flex flex-col justify-center items-center gap-5 relative">
      <div
        className={`absolute min-h-screen w-screen bg-black/40 z-10 flex justify-center items-center ${
          createScreen ? "" : "hidden"
        }`}
      >
        <div className="w-[75%] rounded-md bg-[#171717] text-white p-4 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold">
            Professor Panel : Create Assignment
          </h1>
          <div className="w-full flex flex-col gap-5">
            <div className="mt-5 flex items-center gap-2">
              <label>Assignment Name : </label>
              <input
                className="bg-[#3a3939] rounded-md w-[50%]"
                type="text"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
            </div>
            {/* Upload Question File */}
            <div>
              <h1 className="font-bold">Upload Question PDF</h1>
              <div className="flex justify-between items-center rounded-md mt-2 bg-[#3a3939] p-2">
                <div className="flex gap-4">
                  <div>UPLOAD LOGO</div>
                  <div>
                    <h1 className="font-semibold text-lg">
                      Drag and drop file here
                    </h1>
                    <h1 className="font-light">Limit 200MB per file - PDF</h1>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="file-input-question"
                    className="bg-green-400 p-2 rounded-md font-bold"
                  >
                    Browse file
                  </label>
                  <input
                    id="file-input-question"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      handleFileChange(e, setquestionFile, setuploadfile1)
                    }
                  />
                </div>
              </div>
              {uploadedfile1 != null ? (
                <div className="flex gap-3">
                  <div>file logo</div>
                  <div>
                    <h1>{uploadedfile1}</h1>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Upload Key File */}
            <div>
              <h1 className="font-bold">Upload Key PDF</h1>
              <div className="flex justify-between items-center rounded-md mt-2 bg-[#3a3939] p-2">
                <div className="flex gap-4">
                  <div>UPLOAD LOGO</div>
                  <div>
                    <h1 className="font-semibold text-lg">
                      Drag and drop file here
                    </h1>
                    <h1 className="font-light">Limit 200MB per file - PDF</h1>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="file-input-key"
                    className="bg-green-400 p-2 rounded-md font-bold"
                  >
                    Browse file
                  </label>
                  <input
                    id="file-input-key"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      handleFileChange(e, setkeyFile, setuploadfile2)
                    }
                  />
                </div>
              </div>
              {uploadedfile2 != null ? (
                <div className="flex gap-3">
                  <div>file logo</div>
                  <div>
                    <h1>{uploadedfile2}</h1>
                  </div>
                </div>
              ) : null}
            </div>
            <div>
              <h1 className="font-bold">Enter Total Marks</h1>
              <div className="flex justify-between items-center rounded-md mt-2 bg-[#3a3939] p-2">
                <h1>{mark}</h1>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (mark > 0) {
                        setMark(mark - 1);
                      }
                    }}
                    className="font-bold text-xl bg-red-500 px-2 rounded-md"
                  >
                    -
                  </button>
                  <button
                    onClick={() => {
                      setMark(mark + 1);
                    }}
                    className="font-bold text-xl bg-blue-500 px-2 rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="m-2">
                <div className="">
                  <button
                    className={`min-w-3 ${
                      tech ? "bg-blue-400" : "bg-white"
                    } min-h-3`}
                    onClick={() => SetTech(!tech)}
                  ></button>
                  <label className="ml-3">Include Technical Content</label>
                </div>
                <div className="">
                  <button
                    className={`min-w-3 ${
                      grammar ? "bg-blue-400" : "bg-white"
                    } min-h-3`}
                    onClick={() => SetGrammar(!grammar)}
                  ></button>
                  <label className="ml-3">Include Grammar</label>
                </div>
                <div className="">
                  <button
                    className={`min-w-3 ${
                      speeling ? "bg-blue-400" : "bg-white"
                    } min-h-3`}
                    onClick={() => SetSpeeling(!speeling)}
                  ></button>
                  <label className="ml-3">Include Spelling</label>
                </div>
              </div>
              <div className="mt-5">
                <label>Deadline : </label>
                <DatePicker
                  className="text-black"
                  selected={deadline}
                  onChange={(newDate) => {
                    const formattedDate = `${newDate.getFullYear()}-${String(
                      newDate.getMonth() + 1
                    ).padStart(2, "0")}-${String(newDate.getDate()).padStart(
                      2,
                      "0"
                    )} 23:59:59`;
                    console.log(formattedDate);
                    SetDeadline(formattedDate); // This will log the date and time in "YYYY-MM-DD 23:59:59" format
                  }}
                />
              </div>
              <div className="flex gap-4 justify-center mt-8">
                <button
                  className="bg-blue-600 p-2 rounded-md shadow-md hover:shadow-black"
                  onClick={handleSubmit}
                >
                  Create Assignment
                </button>
                <button
                  className="bg-red-600 p-2 rounded-md shadow-md hover:shadow-black"
                  onClick={() => SetCreateScreen(false)}
                >
                  Cancel Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl">
          Welcome <strong>{professorName}</strong> 👋
        </h1>
      </div>
      <div className="w-full">
        <button
          className="bg-green-500 p-2 text-white rounded-lg"
          onClick={() => {
            SetCreateScreen(true);
          }}
        >
          + Create new Assignment
        </button>
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        {allAssignments?.assignments?.map((ele, ind) => (
          <div className="flex flex-col justify-around items-center bg-[#171717] border-2 border-[#171717] p-4 rounded-xl ease-linear min-h-[33vh] hover:border-green-500 transition-all duration-200">
            <div className="flex flex-col gap-2 text-xl">
              <h1>
                <strong>Assignment name : </strong>
                {ele?.title}
              </h1>
              <h1>
                <strong>Assignment ID : </strong>
                {ele?.a_id}
              </h1>
              <h1>
                <strong>Deadline : </strong>
                {ele?.deadline.toString().slice(0, 10)}
              </h1>
            </div>
            <div className="flex gap-4 text-white">
              <button
                className="bg-slate-400 p-2 rounded-lg shadow-sm shadow-green-200 hover:bg-green-500 transition-all duration-150 "
                onClick={() => handleGrade(ele?.a_id)}
              >
                Grade
              </button>
              <button
                className="bg-slate-500 p-2 rounded-lg shadow-sm shadow-green-200 hover:bg-green-500 transition-all duration-150"
                onClick={() => handlePlagiarism(ele?.a_id)}
              >
                Plagiarism
              </button>
              <button
                className="bg-slate-600  p-2 rounded-lg shadow-sm shadow-green-200 hover:bg-green-500 transition-all duration-150"
                onClick={() => DeleteAssignment(ele?.a_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessorDashboard;
