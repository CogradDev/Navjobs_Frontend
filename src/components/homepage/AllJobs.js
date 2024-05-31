import React, { useState, useEffect, useRef } from "react";
import {
  AiOutlineSearch,
  AiOutlineMore,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import {
  FaRegBookmark,
  FaBookmark,
  FaFlag,
  FaLocationArrow,
  FaSearch,
  FaMapMarkerAlt,
  FaCheck,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import { GoCircleSlash } from "react-icons/go";
import { toast } from "react-toastify";
import apiList from "../../libs/apiLists";
import { userType } from "../../libs/isAuth";

const JobTile = ({ job, onSelectJob }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDotHovered, setIsDotHovered] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectJob = () => {
    onSelectJob(job);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const truncatedDescription = job.jobDescription.substring(0, 300);
  const shouldTruncate = job.jobDescription.length > 300;
  const defaultLocation = "Unknown Location";

  return (
    <div
      className="p-4 mb-4 bg-white shadow-lg rounded-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300 cursor-pointer relative"
      style={{ minHeight: "250px" }}
      onClick={handleSelectJob}
    >
      <div className="flex justify-between items-center mb-4">
        <h3
          className="text-xl font-bold hover:underline cursor-pointer text-blue-700"
          onClick={handleSelectJob}
        >
          {job.title}
        </h3>
        <div
          className="relative"
          ref={dropdownRef}
          onMouseEnter={() => setIsDotHovered(true)}
          onMouseLeave={() => setIsDotHovered(false)}
        >
          <AiOutlineMore
            className={`text-3xl text-gray-500 cursor-pointer ${
              isDotHovered ? "bg-gray-100 rounded" : ""
            }`}
            onClick={handleToggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute left-0 mt-8 z-50 bg-white border border-gray-300 rounded-lg shadow-md">
              <ul className="py-1" style={{ whiteSpace: "nowrap" }}>
                <li className="flex items-center text-gray-700 py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  <FaRegBookmark className="mr-3 text-xl" />
                  Save Job
                </li>
                <li className="flex items-center text-gray-700 py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  <GoCircleSlash className="mr-3 text-xl" />
                  Not Interested
                </li>
                <li className="flex items-center text-gray-700 py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  <FaFlag className="mr-3 text-xl" />
                  Is there a problem with the job
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-500 font-semibold">{job.companyName}</p>
      <p className="text-sm text-gray-500">
        {job.location ? job.location : defaultLocation}
      </p>
      <div className="mt-2 text-sm text-gray-700 overflow-hidden overflow-ellipsis">
        {shouldTruncate ? `${truncatedDescription}...` : job.jobDescription}
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Posted {job.postedDaysAgo} days ago
      </p>
    </div>
  );
};

const JobDetailsPane = ({ job }) => {
  const [open, setOpen] = useState(false);
  const [sop, setSop] = useState("");

  if (!job) return null;

  const handleClose = () => {
    setOpen(false);
    setSop("");
  };

  const handleApply = async () => {
    try {
      const response = await fetch(apiList.jobs, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const json = await response.json();

      if (json.success) {
        handleClose();
        toast.success("Applied Successfully");
      } else {
        toast.warn(json.message);
        handleClose();
      }
    } catch (err) {
      handleClose();
      toast.error("Error occurred while applying.");
    }
  };

  const deadline = new Date(job.applicationDeadline).toLocaleDateString();

  // Default location if job location is not provided
  const location = job.location ? job.location : "Location Not Specified";

  // Format job description with line breaks and style links and email addresses
  const formattedDescription = job.jobDescription
    .split("\n")
    .map((line, index) => {
      // Regular expression to identify email addresses
      const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
      // Regular expression to identify URLs
      const urlRegex = /(?:https?|ftp):\/\/[\S]+/g;

      // Replace email addresses with a styled span
      const emailReplaced = line.replace(
        emailRegex,
        (match) =>
          `<a href="mailto:${match}" class="text-blue-700 underline">${match}</a>`
      );

      // Replace URLs with a styled span
      const urlReplaced = emailReplaced.replace(
        urlRegex,
        (match) =>
          `<a href="${match}" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline">${match}</a>`
      );

      return (
        <p
          key={index}
          className="mb-2"
          dangerouslySetInnerHTML={{ __html: urlReplaced }}
        />
      );
    });

  return (
    <div
      className="p-6 bg-white shadow-lg rounded-lg overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 100px)" }}
    >
      <h2 className="text-3xl font-bold mb-4 text-blue-700">{job.title}</h2>
      <div className="flex items-center mb-4">
        <FaLocationArrow className="text-gray-600 mr-2" />
        <p className="text-gray-600">{location}</p>
      </div>
      <div className="flex justify-between mb-4">
        <div className="text-lg font-semibold">
          <span className="text-gray-700 mr-2 font-bold text-base">
            Job Type:
          </span>
          <span className="text-gray-700 font-normal text-base">
            {job.jobType}
          </span>
        </div>
        <div className="text-lg font-semibold">
          <span className="text-gray-700 mr-2 font-bold text-base">
            Salary:
          </span>
          <span className="text-gray-700 font-normal text-base">
            ₹{job.salary} per month
          </span>
        </div>
      </div>
      <div className="text-gray-700 mt-4">
        <div>
          <strong>Duration:</strong>{" "}
          {job.duration !== 0 ? `${job.duration} month(s)` : "Flexible"}
        </div>
        <div>
          <strong>Posted By:</strong> {job.companyName}
        </div>
        <div>
          <strong>Application Deadline:</strong> {deadline}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Full Job Description:</h3>
        <div className="text-gray-700 leading-relaxed">
          {formattedDescription}
        </div>
      </div>
      <div className="mt-6">
        <strong>Required Skillset:</strong>
        <div className="flex flex-wrap mt-2">
          {job.requiredSkillset.map((skill, index) => (
            <span
              key={index}
              className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mr-2 mb-2"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className={`bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 ${
            userType() === "recruiter" ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => setOpen(true)}
          disabled={userType() === "recruiter"}
        >
          Apply Now
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg overflow-hidden max-w-lg w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Write Statement of Purpose (SOP)
              </h3>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="6"
                placeholder="Write your SOP here..."
                value={sop}
                onChange={(e) => setSop(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-end px-6 py-4 bg-gray-100">
              <button
                className="px-4 py-2 text-sm text-gray-700 font-medium mr-2 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:bg-blue-700"
                onClick={handleApply}
              >
                Submit
              </button>
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
                          searchOptions.sortOrder == "asc"
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
                            searchOptions.sortOrder == "asc"
                              ? "block"
                              : "hidden"
                          }`}
                        />
                        Ascending
                      </div>
                      <div
                        className={`flex items-center cursor-pointer ${
                          searchOptions.sortOrder == "desc"
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
                            searchOptions.sortOrder == "desc"
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

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isFixed, setIsFixed] = useState(false);
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
        `${apiList.jobs}${queryString ? `?${queryString}` : ""}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();
      if (json.success) {
        setJobs(json.data);
        if (json.data.length > 0) {
          setSelectedJob(json.data[0]);
        }
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
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsFixed(scrollY > 180); // Change 180 to your desired scroll threshold
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="p-4 max-w-screen-xl flex flex-col items-center mx-auto relative overflow-auto">
      <div className="items-center bg-gray-100 p-6 rounded-lg mb-6 w-11/12 md:w-4/5 mx-auto shadow-lg">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1 w-full md:w-auto">
            <FaSearch className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            <input
              type="text"
              className="w-full border rounded pl-10 pr-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Job title, keywords, or company"
              value={searchOptions.query}
              onChange={(e) =>
                setSearchOptions({ ...searchOptions, query: e.target.value })
              }
            />
          </div>
          <div className="relative flex-1 w-full md:w-auto">
            <FaMapMarkerAlt className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            <input
              type="text"
              className="w-full border rounded pl-10 pr-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="City, state, zip code or 'Remote'"
              value={searchOptions.locationQuery}
              onChange={(e) =>
                setSearchOptions({
                  ...searchOptions,
                  locationQuery: e.target.value,
                })
              }
            />
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 w-full md:w-auto"
            onClick={() => getData(true)}
          >
            Find Jobs
          </button>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center mb-4 w-full">
        <h2 className="text-xl font-bold">Job Feed</h2>
        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hidden md:block"
          onClick={() => setOpenFilter(true)}
        >
          Filters
        </button>
        <button
          className="text-gray-700 p-2 rounded block md:hidden"
          onClick={() => setOpenFilter(true)}
        >
          <FaFilter />
        </button>
      </div>

      <FilterPopup
        open={openFilter}
        handleClose={() => setOpenFilter(false)}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        getData={() => getData(true)}
      />

<div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
  <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
    {jobs.map((job) => (
      <JobTile key={job._id} job={job} onSelectJob={() => openModal(job)} />
    ))}
  </div>

  {/* Modal for Job Details on Small Screens */}
  {isModalOpen && (
    <div className="md:hidden fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <JobDetailsPane job={selectedJob} />
        <button className="absolute top-4 right-4 text-gray-500" onClick={closeModal}>
          <FaTimes />
        </button>
      </div>
    </div>
  )}

  {/* Job Details Pane for Big Screens */}
  <div className={`md:col-span-3 hidden md:block bg-gray-50 p-4 rounded-lg ${isFixed ? 'fixed right-12 top-16 mt-2 mr-1' : ''}`} style={isFixed ? { width: '55%' } : {}}>
    <JobDetailsPane job={selectedJob} />
  </div>
</div>

    </div>
  );
};

export default AllJobs;