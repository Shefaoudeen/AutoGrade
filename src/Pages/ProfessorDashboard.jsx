import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProfessorDashboard = () => {
  const { id } = useParams();
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
  const [deadline, SetDeadline] = useState(new Date());
  const [uploadedfile1, setuploadfile1] = useState(null);
  const [uploadedfile2, setuploadfile2] = useState(null);

  const handleFileChange = (event, setFileState, setUploadFileState) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileState(selectedFile); // Set file object in state
      setUploadFileState(selectedFile.name); // Set the file name for display
      console.log(selectedFile.name); // Log the name of the uploaded file
    }
  };

  const handleSubmit = async () => {
    setoutput({
      p_id: professorId,
      title: name,
      deadline: deadline,
      question_path: questionfile,
      key_path: keyfile,
      total_marks: mark,
      technical_setting: tech,
      grammer_setting: grammar,
      spelling_setting: speeling,
      status: "ongoing",
    });

    console.log(output);
    try {
      // Axios post request
      const response = await axios.post(
        `http://localhost:8000/professor/postAssignmnet?p_id=${professorId}&title=${name}&deadline=${deadline}&question_path=${questionfile}&key_path=${keyfile}&total_mark=${mark}&technical_setting=${tech}&grammar_setting=${grammar}&spelling_setting=${speeling}&status=ongoing`,
        output,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from API:", response.data);
      alert("Assignment created successfully!");
    } catch (error) {
      console.error("Error creating assignment:", error);
      alert("Failed to create assignment.");
    }
  };

  return (
    <div className="w-[75%] flex flex-col justify-center items-center gap-5 relative">
      <div
        className={`absolute min-h-screen w-screen bg-slate-500/50 z-10 flex justify-center items-center ${
          createScreen ? "" : "hidden"
        }`}
      >
        <div className="w-[75%] rounded-md bg-slate-700 text-white p-4 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold">
            Professor Panel : Create Assignment
          </h1>
          <div className="w-full flex flex-col gap-5">
            <div className="mt-5 flex items-center gap-2">
              <label>Assignment Name : </label>
              <input
                className="bg-slate-500 rounded-md w-[50%]"
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
              <div className="flex justify-between items-center rounded-md mt-2 bg-slate-500 p-2">
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
                    className="bg-slate-700 p-2 rounded-md"
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
              <div className="flex justify-between items-center rounded-md mt-2 bg-slate-500 p-2">
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
                    className="bg-slate-700 p-2 rounded-md"
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
              <div className="flex justify-between items-center rounded-md mt-2 bg-slate-500 p-2">
                <h1>{mark}</h1>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (mark > 0) {
                        setMark(mark - 1);
                      }
                    }}
                    className="font-bold text-xl bg-slate-700 px-2 rounded-md"
                  >
                    -
                  </button>
                  <button
                    onClick={() => {
                      setMark(mark + 1);
                    }}
                    className="font-bold text-xl bg-slate-700 px-2 rounded-md"
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
                    SetDeadline(newDate);
                    const formattedDate = `${newDate.getFullYear()}-${String(
                      newDate.getMonth() + 1
                    ).padStart(2, "0")}-${String(newDate.getDate()).padStart(
                      2,
                      "0"
                    )} 23:59:59`;
                    console.log(formattedDate); // This will log the date and time in "YYYY-MM-DD 23:59:59" format
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
        <h1>Welcome {professorName} 👋</h1>
      </div>
      <div className="w-full">
        <button
          className="bg-rose-500 p-2 text-white rounded-lg"
          onClick={() => {
            SetCreateScreen(true);
          }}
        >
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
