import React, { useState, useEffect } from "react";
import apiList from "../../libs/apiLists";
import { userType } from "../../libs/isAuth";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";




const JobTile = ({ job }) => {
  const [open, setOpen] = useState(false);
  const [sop, setSop] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setSop('');
  };

  const handleApply = async () => {
    try {
      const response = await fetch(apiList.jobs, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const json = await response.json();

      if (json.success) {
        handleClose();
        toast.success('Applied Successfully');
      } else {
        toast.warn(json.message);
        handleClose();
      }
    } catch (err) {
      handleClose();
      toast.error('Error occurred while applying.');
    }
  };

  const deadline = new Date(job.deadline).toLocaleDateString();

  const truncatedDescription = job.description.substring(0, 300);
  const shouldTruncate = job.description.length > 300;

  return (
    <div className="p-6 mb-8 bg-white shadow-lg rounded-lg transform transition-all hover:shadow-2xl duration-300">
      <div className="flex flex-col justify-between h-full space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{job.title}</h2>
          <div className="flex items-center mt-2">
            {job.rating !== -1 && (
              <span className="text-yellow-500">{'⭐'.repeat(job.rating)}</span>
            )}
          </div>
          <div className="mt-4 text-gray-700">
            <div><strong>Role:</strong> {job.jobType}</div>
            <div><strong>Salary:</strong> ₹{job.salary} per month</div>
            <div><strong>Duration:</strong> {job.duration !== 0 ? `${job.duration} month(s)` : 'Flexible'}</div>
            <div><strong>Posted By:</strong> {job.recruiter.name}</div>
            <div><strong>Application Deadline:</strong> {deadline}</div>
            <div className="mt-4">
              <strong>Description:</strong>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {showFullDescription ? job.description : truncatedDescription}
                {shouldTruncate && (
                  <button
                    className="text-blue-600 underline ml-1"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    {showFullDescription ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap">
            {job.skillsets.map((skill, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mr-2 mb-2"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <button
          className={`bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 ${
            userType() === 'recruiter' ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => setOpen(true)}
          disabled={userType() === 'recruiter'}
        >
          Apply Now
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg overflow-hidden max-w-lg w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Write Statement of Purpose (SOP)</h3>
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
      className={`fixed my-11 items-center justify-center z-200 inset-0 overflow-y-auto transition-opacity duration-300 ${
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
                  <div className="mb-6">
                    <div className="block font-medium text-gray-700">
                      Job Type
                    </div>
                    <div className="flex flex-wrap mt-2 space-x-4">
                      <div className="flex items-center">
                        <input
                          id="fullt"
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
                          htmlFor="fullt"
                          className="ml-2 text-gray-700 cursor-pointer"
                        >
                          Full Time
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="partt"
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
                          htmlFor="partt"
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
                  <div className="mb-6">
                    <label className="block font-medium text-gray-700">
                      Duration
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
                  <div className="mb-6">
                    <label className="block font-medium text-gray-700">
                      Rating
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
                  <div className="mb-6">
                    <label className="block font-medium text-gray-700">
                      Sort By
                    </label>
                    <select
                      className="mt-2 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md transition duration-300 ease-in-out"
                      value={searchOptions.sortBy}
                      onChange={(e) =>
                        setSearchOptions({
                          ...searchOptions,
                          sortBy: e.target.value,
                        })
                      }
                    >
                      <option value="relevance">Relevance</option>
                      <option value="date">Date</option>
                      <option value="salary">Salary</option>
                      <option value="rating">Rating</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition duration-300 ease-in-out"
              onClick={() => {
                getData();
                handleClose();
              }}
            >
              Apply
            </button>
            <button
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm transition duration-300 ease-in-out"
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
  const [isFocused, setIsFocused] = useState(false);
  const [searchOptions, setSearchOptions] = useState({
    query: "",
    jobType: {
      fullTime: false,
      partTime: false,
      wfh: false,
    },
    salary: [0, 100000],
    duration: "0",
    sort: {
      salary: {
        status: false,
        desc: false,
      },
      duration: {
        status: false,
        desc: false,
      },
      rating: {
        status: false,
        desc: false,
      },
    },
  });
  const [open, setOpen] = useState(false);

  const getData = async () => {
    let searchParams = [];
    if (searchOptions.query !== "")
      searchParams.push(`q=${searchOptions.query}`);
    if (searchOptions.jobType.fullTime)
      searchParams.push("jobType=Full%20Time");
    if (searchOptions.jobType.partTime)
      searchParams.push("jobType=Part%20Time");
    if (searchOptions.jobType.wfh)
      searchParams.push("jobType=Work%20From%20Home");
    searchParams.push(
      `salary[gte]=${searchOptions.salary[0]}&salary[lte]=${searchOptions.salary[1]}`
    );
    if (searchOptions.duration !== "0")
      searchParams.push(`duration[gte]=${searchOptions.duration}`);
    searchParams.push(`rating[gte]=${searchOptions.rating * 1}&rating[lte]=5`);
    if (searchOptions.sort.salary.status) {
      searchParams.push(
        `sort=salary:${searchOptions.sort.salary.desc ? "desc" : "asc"}`
      );
    }
    if (searchOptions.sort.duration.status) {
      searchParams.push(
        `sort=duration:${searchOptions.sort.duration.desc ? "desc" : "asc"}`
      );
    }
    if (searchOptions.sort.rating.status) {
      searchParams.push(
        `sort=rating:${searchOptions.sort.rating.desc ? "desc" : "asc"}`
      );
    }

    const queryString = searchParams.join("&");

    try {
      const response = await fetch(`${apiList.jobs}?${queryString}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      if (json.success) {
        setJobs(json.data);
      } else {
        toast.error(json.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8 max-md:flex-col space-y-8 md:space-y-0">
        {/* Search bar */}
        <div className="relative flex items-center bg-white shadow-lg rounded-full overflow-hidden transition-all duration-300">
          <div className="flex items-center px-4">
            <AiOutlineSearch className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className={`flex-grow py-2 px-4 text-lg text-gray-700 border-none outline-none transition-all duration-300 ${
              isFocused ? "w-72" : "w-56"
            }`}
            value={searchOptions.query}
            onChange={(e) =>
              setSearchOptions({ ...searchOptions, query: e.target.value })
            }
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {searchOptions.query && (
            <button
              className="text-gray-500 px-4"
              onClick={() => setSearchOptions({ ...searchOptions, query: "" })}
            >
              <AiOutlineClose />
            </button>
          )}
          <button
            className="bg-blue-600 text-white text-lg py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            onClick={getData}
          >
            Search
          </button>
        </div>

        {/* filter button */}
        <button
          className="bg-blue-500 text-white text-lg py-1 px-4 rounded-md"
          onClick={() => setOpen(true)}
        >
          Filter
        </button>
      </div>
      <div className="lg:grid grid-cols-1 gap-4">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobTile key={job._id} job={job} />)
        ) : (
          <div className="text-gray-700 text-lg">No jobs found</div>
        )}
      </div>
      <FilterPopup
        open={open}
        handleClose={() => setOpen(false)}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        getData={getData}
      />
    </div>
  );
};

export default AllJobs;
