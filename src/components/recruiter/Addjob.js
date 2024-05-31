import React, { useState } from "react";
import apiList from "../../libs/apiLists";
import { toast } from "react-toastify";

const Addjobs = () => {
  const [newSkill, setNewSkill] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [jobDetails, setJobDetails] = useState({
    title: "",
    jobType: "Full-time",
    salary: 5000,
    jobDescription: "",
    requiredSkillset: [],
    duration: 1,
    applicationDeadline: new Date(
      new Date().getTime() + 10 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .substr(0, 16),
    experienceLevel: "Fresher",
    educationRequirement: "Graduated",
    employmentType: "Permanent",
    maxApplicants: 10,
    maxPositions: 2,
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
          requiredSkillset: [...jobDetails.requiredSkillset, trimmedSkill],
        });
        setNewSkill(""); // Clear input after adding skill
      }
    }
  };

  const removeSkill = (indexToRemove) => {
    setJobDetails({
      ...jobDetails,
      requiredSkillset: jobDetails.requiredSkillset.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  const handleUpdate = async () => {
    setIsClicked(true);
    if (
      !jobDetails.title ||
      !jobDetails.jobType ||
      !jobDetails.jobDescription
    ) {
      toast.warn("Title, job type, and description are required.");
      setIsClicked(false);
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
        setIsClicked(false);
        // Reset form after successful submission
        setJobDetails({
          title: "",
          jobType: "Full-time",
          salary: 0,
          jobDescription: "",
          requiredSkillset: [],
          duration: 1,
          applicationDeadline: new Date(
            new Date().getTime() + 10 * 24 * 60 * 60 * 1000
          )
            .toISOString()
            .substr(0, 16),
          experienceLevel: "Fresher",
          educationRequirement: "Graduated",
          employmentType: "Permanent",
          maxApplicants: 10,
          maxPositions: 2,
        });
      } else {
        toast.warn(json.message);
        setIsClicked(false);
      }
    } catch (err) {
      setIsClicked(false);
      toast.error("Some Error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Add New Job
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Job Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter the title of the job"
                value={jobDetails.title}
                onChange={(event) => handleInput("title", event.target.value)}
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="jobType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Job Type
              </label>
              <select
                id="jobType"
                value={jobDetails.jobType}
                onChange={(event) => handleInput("jobType", event.target.value)}
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Full-time">Full Time</option>
                <option value="Part-time">Part Time</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Salary
              </label>
              <input
                id="salary"
                type="number"
                placeholder="Enter the salary"
                value={jobDetails.salary}
                onChange={(event) =>
                  handleInput("salary", parseInt(event.target.value))
                }
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Duration (Months)
              </label>
              <select
                id="duration"
                value={jobDetails.duration}
                onChange={(event) =>
                  handleInput("duration", parseInt(event.target.value))
                }
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {[...Array(13).keys()].map((month) => (
                  <option key={month} value={month}>
                    {month === 0 ? "Flexible" : month}
                  </option>
                ))}
                <option value="12">12 months or more</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="applicationDeadline"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Application Deadline
              </label>
              <input
                id="applicationDeadline"
                type="datetime-local"
                value={jobDetails.applicationDeadline}
                onChange={(event) =>
                  handleInput("applicationDeadline", event.target.value)
                }
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="experienceLevel"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Experience Level
              </label>
              <select
                id="experienceLevel"
                value={jobDetails.experienceLevel}
                onChange={(event) =>
                  handleInput("experienceLevel", event.target.value)
                }
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Fresher">Fresher</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
                <option value="Experienced">Experienced</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="educationRequirement"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Education Requirement
              </label>
              <select
                id="educationRequirement"
                value={jobDetails.educationRequirement}
                onChange={(event) =>
                  handleInput("educationRequirement", event.target.value)
                }
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Matric Pass">Matric Pass</option>
                <option value="Diploma">Diploma</option>
                <option value="Graduated">Graduated</option>
                <option value="Post Graduated">Post Graduated</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="employmentType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Employment Type
              </label>
              <select
                id="employmentType"
                value={jobDetails.employmentType}
                onChange={(event) =>
                  handleInput("employmentType", event.target.value)
                }
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="maxApplicants"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Max Number of Applicants
              </label>
              <input
                id="maxApplicants"
                type="number"
                placeholder="Maximum Number Of Applicants"
                value={jobDetails.maxApplicants}
                onChange={(event) =>
                  handleInput("maxApplicants", parseInt(event.target.value))
                }
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="maxPositions"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Max Number of Available Positions
              </label>
              <input
                type="number"
                id="maxPositions"
                placeholder="Number of Positions Available"
                value={jobDetails.maxPositions}
                onChange={(event) =>
                  handleInput("maxPositions", parseInt(event.target.value))
                }
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="skill"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Required Skillset
            </label>
            <input
              type="text"
              id="skill"
              placeholder="Enter the desired skill sets"
              value={newSkill}
              onChange={handleSkillInputChange}
              onKeyDown={handleSkillInputKeyDown}
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500">
              Press Enter to add
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {jobDetails.requiredSkillset.map((skill, idx) => (
              <div
                key={idx}
                className="flex items-center px-3 py-1 bg-blue-200 text-blue-700 rounded-full"
              >
                {skill}
                <button
                  type="button"
                  className="ml-2 text-blue-700 hover:text-red-500"
                  onClick={() => removeSkill(idx)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <div>
            <label
              htmlFor="jobDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Description
            </label>
            <textarea
              id="jobDescription"
              placeholder="Enter the job description, links, and other details"
              value={jobDetails.jobDescription}
              onChange={(event) =>
                handleInput("jobDescription", event.target.value)
              }
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="5"
            />
          </div>

          <button
            className={`${
              isClicked ? "animate-pulse" : ""
            } w-full my-6 px-4 py-2 font-semibold text-white bg-gradient-to-r from-blue-700 to-purple-700 rounded-lg hover:from-blue-800 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            onClick={handleUpdate}
            disabled={isClicked}
          >
            {isClicked ? "Submitting..." : "Add Job"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addjobs;
