import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaStar,
  FaRegClock,
  FaUsers,
  FaCheckCircle,
  FaRegEdit,
  FaTrashAlt,
  FaCheck,
} from "react-icons/fa";
import apiList from "../../libs/apiLists";

const JobTile = ({ job, getData }) => {
  const history = useNavigate();
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [jobDetails, setJobDetails] = useState(job);

  const handleInput = (key, value) => {
    setJobDetails({ ...jobDetails, [key]: value });
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

  const handleClick = (location) => {
    history(location);
  };

  const handleClose = () => {
    setOpen(false);
    document.body.style.overflowY = "auto";
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${apiList.jobs}/${job._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const json = await response.json();

      if (json.success) {
        getData();
        handleClose();
        toast.success("Job deleted successfully");
      } else {
        toast.error(json.message);
        handleClose();
      }
    } catch (err) {
      toast.error("Error deleting job");
    }
    document.body.style.overflowY = "auto";
  };

  const handleJobUpdate = async () => {
    try {
      const response = await fetch(`${apiList.jobs}/${job._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobDetails),
      });

      const json = await response.json();

      if (json.success) {
        getData();
        handleCloseUpdate();
        toast.success("Job info updated successfully");
      } else {
        toast.error(json.message);
        handleCloseUpdate();
      }
    } catch (err) {
      toast.error("Error while updating the job section.");
      handleCloseUpdate();
    }
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const postedOn = new Date(job.dateOfPosting);

  return (
    <div className="p-6 my-5 bg-white shadow-lg rounded-lg w-full transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="flex flex-col md:flex-row">
        <div className="w-3/4 space-y-2">
          <h2 className="text-2xl font-bold text-blue-700">{job.title}</h2>
          <div className="flex items-center space-x-2">
            {job.rating !== -1 ? (
              <span className="text-yellow-500 flex items-center">
                <FaStar className="mr-1" /> {job.rating}
              </span>
            ) : null}
          </div>
          <div className="text-gray-600">Role: {job.jobType}</div>
          <div className="text-gray-600">Salary: ₹ {job.salary} per month</div>
          <div className="text-gray-600 flex items-center">
            <FaRegClock className="mr-2" /> Duration:{" "}
            {job.duration !== 0 ? `${job.duration} month` : `Flexible`}
          </div>
          <div className="text-gray-600">
            Date Of Posting: {postedOn.toLocaleDateString()}
          </div>
          <div className="text-gray-600 flex items-center">
            <FaUsers className="mr-2" /> Number of Applicants:{" "}
            {job.maxApplicants}
          </div>
          <div className="text-gray-600 flex items-center">
            <FaCheckCircle className="mr-2" /> Remaining Positions:{" "}
            {job.maxPositions - job.acceptedCandidates}
          </div>
          <div className="flex flex-wrap">
            {job.requiredSkillset.map((skill) => (
              <span className="mr-2 mb-2 p-1 bg-gray-200 rounded" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/4 flex flex-col space-y-2">
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-2 rounded transition hover:from-blue-600 hover:to-indigo-600 flex items-center justify-center"
            onClick={() => handleClick(`/job/applications/${job._id}`)}
          >
            <FaUsers className="mr-2" /> View Applications
          </button>
          <button
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-2 rounded transition hover:from-orange-600 hover:to-red-600 flex items-center justify-center"
            onClick={() => setOpenUpdate(true)}
          >
            <FaRegEdit className="mr-2" /> Update Details
          </button>
          <button
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-2 rounded transition hover:from-red-600 hover:to-pink-600 flex items-center justify-center"
            onClick={() => {
              setOpen(true);
              document.body.style.overflowY = "hidden";
            }}
          >
            <FaTrashAlt className="mr-2" /> Delete Job
          </button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded">
            <h3 className="text-xl text-center mb-8">Are you sure?</h3>
            <div className="flex justify-around space-x-10">
              <button
                className="bg-red-500 text-white text-lg py-1 px-4 rounded-md"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 text-white text-lg py-1 px-4 rounded-md"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {openUpdate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 py-1 px-1">
          <div className=" bg-white p-6 rounded max-w-4xl w-full h-full overflow-y-auto">
            <h3 className="text-xl mb-4 text-center">Update Job Details</h3>
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
                    onChange={(event) =>
                      handleInput("title", event.target.value)
                    }
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
                    onChange={(event) =>
                      handleInput("jobType", event.target.value)
                    }
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  className="w-full my-6 px-4 py-2 font-semibold text-white bg-gradient-to-r from-blue-700 to-purple-700 rounded-lg hover:from-blue-800 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleJobUpdate}
                >
                  Update Job
                </button>
                <button
                  className="w-full my-6 px-4 py-2 font-semibold text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={handleCloseUpdate}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FilterPopup = ({
  open,
  handleClose,
  searchOptions,
  setSearchOptions,
  getData,
}) => {
  return (
    <div
      className={`fixed my-11 items-center justify-center z-50 inset-0 overflow-y-auto transition-opacity duration-300 ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity duration-300"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all duration-300 sm:my-8 sm:align-middle w-full max-w-lg">
          <div className="bg-white p-8 rounded-lg">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-2xl mb-6 leading-6 font-bold text-gray-900">
                  Filter Options
                </h3>
                <div className="mt-2 space-y-6">
                  {/* Job Type Filter */}
                  <div className="mb-6">
                    <div className="block font-medium text-gray-700">
                      Job Type
                    </div>
                    <div className="flex flex-wrap mt-2 space-x-4">
                      <div className="flex items-center">
                        <input
                          id="fullTime"
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600 transition duration-300 ease-in-out"
                          checked={searchOptions.jobType.fullTime}
                          onChange={(e) =>
                            setSearchOptions({
                              ...searchOptions,
                              jobType: {
                                ...searchOptions.jobType,
                                fullTime: e.target.checked,
                              },
                            })
                          }
                        />
                        <label
                          htmlFor="fullTime"
                          className="ml-2 text-gray-700 cursor-pointer"
                        >
                          Full Time
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="parttime"
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600 transition duration-300 ease-in-out"
                          checked={searchOptions.jobType.partTime}
                          onChange={(e) =>
                            setSearchOptions({
                              ...searchOptions,
                              jobType: {
                                ...searchOptions.jobType,
                                partTime: e.target.checked,
                              },
                            })
                          }
                        />
                        <label
                          htmlFor="parttime"
                          className="ml-2 text-gray-700 cursor-pointer"
                        >
                          Part Time
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="wfh"
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600 transition duration-300 ease-in-out"
                          checked={searchOptions.jobType.wfh}
                          onChange={(e) =>
                            setSearchOptions({
                              ...searchOptions,
                              jobType: {
                                ...searchOptions.jobType,
                                wfh: e.target.checked,
                              },
                            })
                          }
                        />
                        <label
                          htmlFor="wfh"
                          className="ml-2 text-gray-700 cursor-pointer"
                        >
                          Work From Home
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Duration Filter */}
                  <div className="mb-6">
                    <label className="block font-medium text-gray-700">
                      Duration (Months)
                    </label>
                    <input
                      type="range"
                      className="w-full mt-2 appearance-none bg-gray-200 rounded-lg overflow-hidden"
                      value={searchOptions.duration}
                      min="0"
                      max="12"
                      step="1"
                      onChange={(e) =>
                        setSearchOptions({
                          ...searchOptions,
                          duration: e.target.value,
                        })
                      }
                    />
                    <div className="text-center mt-2 text-gray-600">
                      {searchOptions.duration !== "0"
                        ? `${searchOptions.duration} month${
                            searchOptions.duration > 1 ? "s" : ""
                          }`
                        : "Flexible"}
                    </div>
                  </div>
                  {/* Minimum Rating Filter */}
                  <div className="mb-6">
                    <label className="block font-medium text-gray-700">
                      Minimum Rating
                    </label>
                    <input
                      type="range"
                      className="w-full mt-2 appearance-none bg-gray-200 rounded-lg overflow-hidden"
                      value={searchOptions.rating}
                      min="0"
                      max="5"
                      step="0.5"
                      onChange={(e) =>
                        setSearchOptions({
                          ...searchOptions,
                          rating: e.target.value,
                        })
                      }
                    />
                    <div className="text-center mt-2 text-gray-600">
                      {searchOptions.rating}
                    </div>
                  </div>
                  {/* Salary Range Filter */}
                  <div className="mb-6">
                    <label className="block font-medium text-gray-700">
                      Salary Range ($)
                    </label>
                    <div className="flex justify-between items-center mt-2">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        value={searchOptions.salaryMin}
                        onChange={(e) =>
                          setSearchOptions({
                            ...searchOptions,
                            salaryMin: e.target.value,
                          })
                        }
                      />
                      <span className="mx-2">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        value={searchOptions.salaryMax}
                        onChange={(e) =>
                          setSearchOptions({
                            ...searchOptions,
                            salaryMax: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Sorting Options */}
                  <div className="mb-6">
                    <label className="block font-medium text-gray-700">
                      Sort By
                    </label>
                    <select
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                      value={searchOptions.sortBy}
                      onChange={(e) =>
                        setSearchOptions({
                          ...searchOptions,
                          sortBy: e.target.value,
                        })
                      }
                    >
                      <option value="date">Date</option>
                      <option value="salary">Salary</option>
                      <option value="rating">Rating</option>
                      <option value="duration">Duration</option>
                    </select>
                    {/* Ascending/Descending order */}
                    <div className="flex mt-2 space-x-4">
                      <div
                        className={`flex items-center cursor-pointer ${
                          searchOptions.sortOrder === "asc"
                            ? "text-blue-600"
                            : "text-gray-700"
                        }`}
                        onClick={() =>
                          setSearchOptions({
                            ...searchOptions,
                            sortOrder: "asc",
                          })
                        }
                      >
                        <FaCheck
                          className={`mr-2 ${
                            searchOptions.sortOrder === "asc"
                              ? "block"
                              : "hidden"
                          }`}
                        />
                        Ascending
                      </div>
                      <div
                        className={`flex items-center cursor-pointer ${
                          searchOptions.sortOrder === "desc"
                            ? "text-blue-600"
                            : "text-gray-700"
                        }`}
                        onClick={() =>
                          setSearchOptions({
                            ...searchOptions,
                            sortOrder: "desc",
                          })
                        }
                      >
                        <FaCheck
                          className={`mr-2 ${
                            searchOptions.sortOrder === "desc"
                              ? "block"
                              : "hidden"
                          }`}
                        />
                        Descending
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring
              focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition duration-300 ease-in-out"
              onClick={() => {
                getData();
                handleClose();
              }}
            >
              Apply
            </button>
            <button
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm transition duration-300 ease-in-out"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchOptions, setSearchOptions] = useState({
    query: "",
    jobType: {
      fullTime: false,
      partTime: false,
      wfh: false,
    },
    salaryMin: 0,
    salaryMax: 10000000,
    duration: "0",
    rating: 0,
    locationQuery: "",
    sortBy: "date",
    sortOrder: "desc",
  });
  const [openFilter, setOpenFilter] = useState(false);

  const getData = async (filter = false) => {
    let searchParams = [];
    if (filter) {
      if (searchOptions.query) searchParams.push(`q=${searchOptions.query}`);
      if (searchOptions.jobType.fullTime)
        searchParams.push("jobType=Full-time");
      if (searchOptions.jobType.partTime)
        searchParams.push("jobType=Part-time");
      if (searchOptions.jobType.wfh) searchParams.push("jobType=Remote");
      searchParams.push(
        `salaryMin=${searchOptions.salaryMin}&salaryMax=${searchOptions.salaryMax}`
      );
      if (searchOptions.duration !== "0")
        searchParams.push(`duration=${searchOptions.duration}`);
      searchParams.push(`rating[gte]=${searchOptions.rating}&rating[lte]=5`);

      if (searchOptions.locationQuery) {
        searchParams.push(`locationQuery=${searchOptions.locationQuery}`);
      }

      searchParams.push(`sort=${searchOptions.sortBy}`);
      searchParams.push(`order=${searchOptions.sortOrder}`); // Add sort order
    }

    const queryString = searchParams.join("&");
    try {
      const response = await fetch(
        `${apiList.recruiterJobs}${queryString ? `?${queryString}` : ""}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
       console.log(response)
      const json = await response.json();
      if (json.success) {
        setJobs(json.data);
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      toast.error("Failed to fetch jobs");
    }
  };

  useEffect(() => {
    // Fetch all jobs initially
    getData(false);
  },[]);

  return (
    <div className="container min-h-screen mx-auto px-4 py-8">
      <div className="flex flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">My Jobs</h1>
        <button
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg py-2 px-6 rounded-md hover:from-blue-600 hover:to-indigo-600 transition duration-300"
          onClick={() => setOpenFilter(true)}
        >
          Filter Jobs
        </button>
      </div>
      <div className="space-y-8">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobTile key={job._id} job={job} getData={getData} />
          ))
        ) : (
          <div className="text-center text-xl text-gray-600">No jobs found</div>
        )}
      </div>
      <FilterPopup
        open={openFilter}
        handleClose={() => setOpenFilter(false)}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        getData={getData}
      />
    </div>
  );
};

export default MyJobs;
