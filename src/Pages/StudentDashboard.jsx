import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const StudentDashboard = () => {
  const { id } = useParams();
  const location = useLocation();
  const { studentName, studentId } = location.state || {};
  const [allAssignments, setAllAssignment] = useState([]);
  const [uploadfile, setUploadFile] = useState(null);
  const [assignfile, setAssignFile] = useState(null);
  const [selectassign, setSelectassign] = useState(null);

  const handleFileChange = (
    event,
    setFileState,
    setUploadFileState,
    assignId
  ) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileState(selectedFile); // Set file object in state
      setUploadFileState(selectedFile.name); // Set the file name for display
      console.log(selectedFile.name); // Log the name of the uploaded file
      setSelectassign(assignId);
    }
  };

  const downLoadQuestion = (assignId, path) => {
    const fileName = `Assignment-${assignId} Question.pdf`;
    const fileUrl = path;

    // Trigger download
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", fileName); // Set suggested file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/student/getAssignment?student_id=${studentId}&filter=all`
      )
      .then((res) => {
        setAllAssignment(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmission = async (assignId) => {
    const formData = new FormData();
    formData.append("p_id", studentId);
    formData.append("a_id", assignId);
    formData.append("status", "submitted");
    formData.append("answer_path", assignfile);

    try {
      const response = await axios.post(
        `http://localhost:8080/student/submitAssignment?p_id=${studentId}&a_id=${assignId}&status=submitted`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      window.location.reload(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="w-[75%] flex flex-col justify-center items-center gap-5">
      <div>
        <h1 className="text-2xl">
          Welcome <strong>{studentName}</strong> 👋
        </h1>
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        {allAssignments?.assignments?.map((ele, ind) => (
          <div className="flex flex-col justify-between  bg-[#171717] p-4 rounded-xl">
            <div className="flex flex-col gap-3">
              <h1>
                <strong>Title : </strong>
                {ele?.title}
              </h1>
              <h1>
                <strong>Deadline : </strong>
                {ele?.deadline.toString().slice(0, 10)}
              </h1>
              <h1>
                <strong>Mark : </strong>{" "}
                {ele?.submission_status === "pending"
                  ? "NULL"
                  : ele?.marks_obtained === null
                  ? "Not Evaluated"
                  : ele?.marks_obtained}
              </h1>
              <h1>
                <strong>Percentage : </strong>{" "}
                {ele?.submission_status === "pending"
                  ? "NULL"
                  : ele?.percentage === null
                  ? "Not Evaluated"
                  : ele?.percentage}
              </h1>
            </div>
            <div className="mt-5">
              {ele?.submission_status === "pending" ? (
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center">
                      <div>
                        <button
                          className="bg-slate-500 p-2 rounded-md"
                          onClick={() =>
                            downLoadQuestion(ele?.a_id, ele?.question_path)
                          }
                        >
                          Download Question
                        </button>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div>
                          <label
                            htmlFor="file-input-question"
                            className="bg-slate-700 p-2 rounded-md text-white"
                          >
                            Browse File
                          </label>
                          <input
                            id="file-input-question"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) =>
                              handleFileChange(
                                e,
                                setAssignFile,
                                setUploadFile,
                                ele?.a_id
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {selectassign === ele?.a_id ? <h1>{uploadfile}</h1> : ""}
                  </div>
                  <div>
                    {selectassign === ele?.a_id ? (
                      <button
                        className="bg-green-400 p-2 rounded-lg shadow-md shadow-black text-white"
                        onClick={() => handleSubmission(ele?.a_id)}
                      >
                        Submit
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                <button className="bg-slate-400 p-2 rounded-lg shadow-md shadow-black text-white">
                  Submitted
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
