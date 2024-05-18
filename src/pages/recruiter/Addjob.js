import React, { useState } from "react";
import apiList from "../../libs/apiLists";
import { toast } from "react-toastify";

const Addjobs = () => {
  const [newSkill, setNewSkill] = useState("");
  const [jobDetails, setJobDetails] = useState({
    title: "",
    maxApplicants: 0, // Change to numeric value
    maxPositions: 0, // Change to numeric value
    deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 16),
    skillsets: [],
    jobType: "Full Time",
    duration: 0, // Change to numeric value
    salary: 1000, // Change to numeric value
  });

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleSkillInputChange = (event) => {
    setNewSkill(event.target.value);
  };

  const handleSkillInputKeyDown = (event) => {
    if (event.key === "Enter") {
      const trimmedSkill = newSkill.trim();
      if (trimmedSkill !== "") {
        setJobDetails({
          ...jobDetails,
          skillsets: [...jobDetails.skillsets, trimmedSkill],
        });
        setNewSkill(""); // Clear input after adding skill
      }
    }
  };

  const handleUpdate = async () => {
    if (!jobDetails.title || !jobDetails.jobType) {
      toast.error("Title and job type are required.");
      return;
    }

    try {
      const response = await fetch(apiList.jobs, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobDetails),
      });

      const json = await response.json();
      if (json.success) {
        toast.success(json.message);
        // Reset form after successful submission
        setJobDetails({
          title: "",
          maxApplicants: 0,
          maxPositions: 0,
          deadline: new Date(
            new Date().getTime() + 10 * 24 * 60 * 60 * 1000
          ).toISOString(),
          skillsets: [],
          jobType: "Full Time",
          duration: 0,
          salary: 0,
        });
      } else {
        toast.warn(json.message);
      }
    } catch (err) {
      toast.error("Some Error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add Job</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Add Title"
            value={jobDetails.title}
            onChange={(event) => handleInput("title", event.target.value)}
            className="w-full p-2 border rounded-md outline-none"
          />
          <div className="relative">
            <input
              type="text"
              placeholder="Add the Skills"
              value={newSkill}
              onChange={handleSkillInputChange}
              onKeyDown={handleSkillInputKeyDown}
              className="w-full p-2 border rounded-md outline-none"
            />
            <div className="absolute inset-y-0 -bottom-14 pointer-events-none left-1 flex items-center text-sm">
              Press enter to add skills
            </div>
          </div>
          <div className="flex space-x-3 flex-wrap">
            {jobDetails.skillsets.map((skill, idx) => {
              return (
                <div
                  key={idx}
                  className="border border-gray-500 px-2 rounded-l-full rounded-r-full m-1"
                >
                  <div className="pointer-events-none">{skill}</div>
                </div>
              );
            })}
          </div>
          <select
            value={jobDetails.jobType}
            onChange={(event) => handleInput("jobType", event.target.value)}
            className="w-full p-2 border rounded-md outline-none"
          >
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Work From Home">Work From Home</option>
          </select>
          <select
            value={jobDetails.duration}
            onChange={(event) =>
              handleInput("duration", parseInt(event.target.value))
            }
            className="w-full p-2 border rounded-md outline-none"
          >
            <option value="0">Flexible</option>
            <option value="1">1 Month</option>
            <option value="2">2 Months</option>
            <option value="3">3 Months</option>
            <option value="4">4 Months</option>
            <option value="5">5 Months</option>
            <option value="6">6 Months</option>
          </select>
          <input
            type="text"
            placeholder="Enter the salary"
            value={jobDetails.salary}
            onChange={(event) =>
              handleInput("salary", parseInt(event.target.value))
            }
            className="w-full p-2 border rounded-md outline-none"
          />
          <input
            id="deadline"
            type="datetime-local"
            placeholder="Application Deadline"
            value={jobDetails.deadline}
            onChange={(event) => handleInput("deadline", event.target.value)}
            className="w-full p-2 border rounded-md outline-none"
          />
          <input
            type="number"
            placeholder="Maximum Number Of Applicants"
            value={jobDetails.maxApplicants}
            onChange={(event) =>
              handleInput("maxApplicants", parseInt(event.target.value))
            }
            className="w-full p-2 border rounded-md outline-none"
          />
          <input
            type="number"
            placeholder="Number of Position Available"
            value={jobDetails.maxPositions}
            onChange={(event) =>
              handleInput("maxPositions", parseInt(event.target.value))
            }
            className="w-full p-2 border rounded-md outline-none"
          />
          <button
            className="group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 space-x-2"
            onClick={() => handleUpdate()}
          >
            Add Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addjobs;
