import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiList from "../../libs/apiLists";
import { toast } from "react-toastify";

const JobTile = (props) => {
  let history = useNavigate();
  const { job, getData } = props;

  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [jobDetails, setJobDetails] = useState(job);

  console.log(jobDetails);

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleClick = (location) => {
    history.push(location);
  };

  const handleClose = () => {
    setOpen(false);
    document.body.style.overflowY = "auto";
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleDelete = async () => {
    console.log(job._id);
    try {
      const response = await fetch(`${apiList.jobs}/${job._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const json = await response.json();
      console.log(`${apiList.jobs}/${job._id}`);

      if (json.success) {
        getData();
        handleClose();
        toast.success("Job deleted successfully");
      } else {
        toast.error(json.message);
        handleClose();
      }
    } catch (err) {
      toast.error(err);
      handleClose();
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
      toast.error(err);
      toast.error("Error while updating the job section.");
      handleCloseUpdate();
    }
  };

  const postedOn = new Date(job.dateOfPosting);

  return (
    <div className="p-6 my-5 bg-white shadow-lg shadow-gray-400 rounded-lg w-full">
      <div className="flex flex-col md:flex-row">
        <div className="w-3/4 space-y-2">
          <h2 className="text-2xl font-bold">{job.title}</h2>
          <div className="flex items-center">
            {job.rating !== -1 ? (
              <span className="text-yellow-500">{"⭐".repeat(job.rating)}</span>
            ) : null}
          </div>
          <div>Role : {job.jobType}</div>
          <div>Salary : ₹ {job.salary} per month</div>
          <div>
            Duration :{" "}
            {job.duration !== 0 ? `${job.duration} month` : `Flexible`}
          </div>
          <div>Date Of Posting: {postedOn.toLocaleDateString()}</div>
          <div>Number of Applicants: {job.maxApplicants}</div>
          <div>
            Remaining Number of Positions:{" "}
            {job.maxPositions - job.acceptedCandidates}
          </div>
          <div className="flex flex-wrap">
            {job.skillsets.map((skill) => (
              <span className="mr-2 mb-2 p-1 bg-gray-200 rounded" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/4 flex flex-col space-y-2">
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => handleClick(`/job/applications/${job._id}`)}
          >
            View Applications
          </button>
          <button
            className="bg-orange-500 text-white p-2 rounded"
            onClick={() => setOpenUpdate(true)}
          >
            Update Details
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded"
            onClick={() => {
              setOpen(true);
              document.body.style.overflowY = "hidden";
            }}
          >
            Delete Job
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded">
            <h3 className="text-xl mb-4">Update Details</h3>
            <div className="space-y-4">
              <input
                type="datetime-local"
                value={jobDetails.deadline.substr(0, 16)}
                onChange={(e) => handleInput("deadline", e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                min="1"
                value={jobDetails.maxApplicants}
                onChange={(e) => handleInput("maxApplicants", e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                min="1"
                value={jobDetails.maxPositions}
                onChange={(e) => handleInput("maxPositions", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-around mt-4">
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={handleJobUpdate}
              >
                Update
              </button>
              <button
                className="bg-gray-500 text-white p-2 rounded"
                onClick={handleCloseUpdate}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FilterPopup = (props) => {
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded w-5/6 lg:w-2/3">
        <div className="space-y-6">
          <div className="flex items-center flex-col md:flex-row">
            <span className="md:w-1/4 items-center">Job Type</span>
            <div className="md:w-3/4 flex justify-around flex-wrap md:flex-nowrap">
              {["fullTime", "partTime", "wfh"].map((type) => (
                <label key={type} className="flex items-center w-full">
                  <input
                    type="checkbox"
                    checked={searchOptions.jobType[type]}
                    onChange={(e) =>
                      setSearchOptions({
                        ...searchOptions,
                        jobType: {
                          ...searchOptions.jobType,
                          [type]: e.target.checked,
                        },
                      })
                    }
                  />
                  <span className="ml-2 capitalize">
                    {type
                      .replace("Time", " Time")
                      .replace("wfh", "Work From Home")}
                  </span>
                </label>
              ))}
            </div>
          </div>
          {/* <div className="flex items-center">
                        <span className="w-1/4">Salary</span>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={searchOptions.salary}
                            onChange={(e) => setSearchOptions({
                                ...searchOptions,
                                salary: e.target.value
                            })}
                            className="w-3/4"
                        />
                    </div> */}
          <div className="flex items-center flex-col md:flex-row">
            <span className="w-1/4">Duration</span>
            <select
              value={searchOptions.duration}
              onChange={(e) =>
                setSearchOptions({
                  ...searchOptions,
                  duration: e.target.value,
                })
              }
              className="w-3/4 p-2 border rounded"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7].map((val) => (
                <option key={val} value={val}>
                  {val === 0 ? "All" : val + " Month"}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center flex-col md:flex-row">
            <span className="md:w-1/4">Sort</span>
            <div className="md:w-3/4 flex justify-around flex-wrap md:flex-nowrap">
              {["salary", "duration", "rating"].map((type) => (
                <div
                  key={type}
                  className="flex items-center border rounded-md px-2 py-1 m-1"
                >
                  <input
                    id={type}
                    type="radio"
                    name="sort"
                    value={type}
                    checked={searchOptions.sort === type}
                    onChange={(e) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: e.target.value,
                      })
                    }
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor={type}
                    className="ml-2 capitalize cursor-pointer"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-around mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white text-lg py-1 px-4 rounded-md"
              onClick={() => {
                getData();
                handleClose();
              }}
            >
              Apply
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white text-lg py-1 px-4 rounded-md"
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
    jobType: {
      fullTime: false,
      partTime: false,
      wfh: false,
    },
    salary: [0, 100],
    duration: 0,
    sort: {
      salary: false,
      duration: false,
      rating: false,
    },
  });
  const [openFilter, setOpenFilter] = useState(false);

  const getData = async () => {
    let searchParams = [];
    if (searchOptions.jobType.fullTime)
      searchParams.push("jobType=Full%20Time");
    if (searchOptions.jobType.partTime)
      searchParams.push("jobType=Part%20Time");
    if (searchOptions.jobType.wfh)
      searchParams.push("jobType=Work%20From%20Home");
    searchParams.push(
      `salary=${searchOptions.salary[0] * 1000}-${
        searchOptions.salary[1] * 1000
      }`
    );
    if (searchOptions.duration !== 0)
      searchParams.push(`duration=${searchOptions.duration}`);
    let asc = [],
      desc = [];
    if (searchOptions.sort.salary) asc.push("salary");
    if (searchOptions.sort.duration) asc.push("duration");
    if (searchOptions.sort.rating) desc.push("rating");
    let ascStr = "",
      descStr = "";
    if (asc.length > 0) ascStr = `asc=${asc.join(",")}`;
    if (desc.length > 0) descStr = `desc=${desc.join(",")}`;
    let searchString = searchParams.join("&");
    if (ascStr !== "") searchString = `${searchString}&${ascStr}`;
    if (descStr !== "") searchString = `${searchString}&${descStr}`;
    console.log(searchString);

    try {
      const response = await fetch(`${apiList.jobs}?${searchString}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      console.log(`${apiList.jobs}?${searchString}`);

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
      <div className="text-center">
        <button
          className="bg-blue-500 text-white text-lg py-1 px-4 rounded-md mb-4"
          onClick={() => {
            setOpenFilter(true);
            document.body.style.overflowY = "hidden";
          }}
        >
          Filter
        </button>
      </div>
      <div className="space-y-8">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobTile key={job._id} job={job} getData={getData} />
          ))
        ) : (
          <div className="text-center text-xl">No jobs found</div>
        )}
      </div>
      <FilterPopup
        open={openFilter}
        handleClose={() => {
          setOpenFilter(false);
          document.body.style.overflowY = "auto";
        }}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        getData={getData}
      />
    </div>
  );
};

export default MyJobs;
