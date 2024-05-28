import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaStar, FaRegClock, FaUsers, FaCheckCircle, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import apiList from '../../libs/apiLists';

const JobTile = ({ job, getData }) => {
    const history = useNavigate();
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [jobDetails, setJobDetails] = useState(job);

    const handleInput = (key, value) => {
        setJobDetails({ ...jobDetails, [key]: value });
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
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
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
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jobDetails)
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
                        <FaRegClock className="mr-2" /> Duration: {job.duration !== 0 ? `${job.duration} month` : `Flexible`}
                    </div>
                    <div className="text-gray-600">Date Of Posting: {postedOn.toLocaleDateString()}</div>
                    <div className="text-gray-600 flex items-center">
                        <FaUsers className="mr-2" /> Number of Applicants: {job.maxApplicants}
                    </div>
                    <div className="text-gray-600 flex items-center">
                        <FaCheckCircle className="mr-2" /> Remaining Positions: {job.maxPositions - job.acceptedCandidates}
                    </div>
                    <div className="flex flex-wrap">
                        {job.requiredSkillset.map((skill) => (
                            <span className="mr-2 mb-2 p-1 bg-gray-200 rounded" key={skill}>{skill}</span>
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
                        onClick={() => { setOpen(true); document.body.style.overflowY = "hidden"; }}
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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded w-full max-w-lg">
                        <h3 className="text-xl mb-4 text-center">Update Job Details</h3>
                        <div className="space-y-4">
                            <input
                                type="datetime-local"
                                value={jobDetails.deadline.substr(0, 16)}
                                onChange={(e) => handleInput('deadline', e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="number"
                                min="1"
                                value={jobDetails.maxApplicants}
                                onChange={(e) => handleInput('maxApplicants', e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="number"
                                min="1"
                                value={jobDetails.maxPositions}
                                onChange={(e) => handleInput('maxPositions', e.target.value)}
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

const FilterPopup = ({ open, handleClose, searchOptions, setSearchOptions, getData }) => {
    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${open ? 'block' : 'hidden'}`}>
            <div className="bg-white p-8 rounded w-5/6 lg:w-1/2">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Filter Jobs</h2>
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row  items-center">
                        <span className="md:w-1/4 mb-2 md:mb-0">Job Type</span>
                        <div className="md:w-3/4 flex justify-around flex-wrap md:flex-nowrap">
                            {['fullTime', 'partTime', 'wfh'].map(type => (
                                <label key={type} className="flex items-center w-full">
                                    <input
                                        type="checkbox"
                                        checked={searchOptions.jobType[type]}
                                        onChange={(e) => setSearchOptions({
                                            ...searchOptions,
                                            jobType: {
                                                ...searchOptions.jobType,
                                                [type]: e.target.checked
                                            }
                                        })}
                                    />
                                    <span className="ml-2 capitalize">{type.replace('Time', ' Time').replace('wfh', 'Work From Home')}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center flex-col md:flex-row">
                        <span className="w-1/4">Duration</span>
                        <select
                            value={searchOptions.duration}
                            onChange={(e) => setSearchOptions({
                                ...searchOptions,
                                duration: e.target.value
                            })}
                            className="w-3/4 p-2 border rounded"
                        >
                            {[0, 1, 2, 3, 4, 5, 6, 7].map(val => (
                                <option key={val} value={val}>{val === 0 ? 'All' : val + " Month"}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center flex-col md:flex-row">
                        <span className="md:w-1/4">Sort</span>
                        <div className="md:w-3/4 flex justify-around flex-wrap md:flex-nowrap">
                            {['salary', 'duration', 'rating'].map(type => (
                                <div key={type} className="flex items-center border rounded-md px-2 py-1 m-1">
                                    <input
                                        id={type}
                                        type="radio"
                                        name="sort"
                                        value={type}
                                        checked={searchOptions.sort === type}
                                        onChange={(e) => setSearchOptions({
                                            ...searchOptions,
                                            sort: e.target.value
                                        })}
                                        className='cursor-pointer'
                                    />
                                    <label htmlFor={type} className="ml-2 capitalize cursor-pointer">{type}</label>
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
            wfh: false
        },
        salary: [0, 100],
        duration: 0,
        sort: {
            salary: false,
            duration: false,
            rating: false
        }
    });
    const [openFilter, setOpenFilter] = useState(false);

    const getData = async () => {
        let searchParams = [];
        if (searchOptions.jobType.fullTime) searchParams.push('jobType=Full%20Time');
        if (searchOptions.jobType.partTime) searchParams.push('jobType=Part%20Time');
        if (searchOptions.jobType.wfh) searchParams.push('jobType=Work%20From%20Home');
        searchParams.push(`salary=${searchOptions.salary[0] * 1000}-${searchOptions.salary[1] * 1000}`);
        if (searchOptions.duration !== 0) searchParams.push(`duration=${searchOptions.duration}`);
        let asc = [],
            desc = [];
        if (searchOptions.sort.salary) asc.push('salary');
        if (searchOptions.sort.duration) asc.push('duration');
        if (searchOptions.sort.rating) desc.push('rating');
        let ascStr = '',
            descStr = '';
        if (asc.length > 0) ascStr = `asc=${asc.join(',')}`;
        if (desc.length > 0) descStr = `desc=${desc.join(',')}`;
        let searchString = searchParams.join('&');
        if (ascStr !== '') searchString = `${searchString}&${ascStr}`;
        if (descStr !== '') searchString = `${searchString}&${descStr}`;

        try {
            const response = await fetch(`${apiList.jobs}?${searchString}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();

            if (json.success) {
                setJobs(json.data);
            } else {
                toast.error(json.message);
            }
        } catch (err) {
            toast.error("Error fetching jobs");
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center">
                <button
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg py-2 px-6 rounded-md mb-4 hover:from-blue-600 hover:to-indigo-600"
                    onClick={() => setOpenFilter(true)}
                >
                    Filter Jobs
                </button>
            </div>
            <div className="space-y-8">
                {jobs.length > 0 ? (
                    jobs.map((job) => <JobTile key={job._id} job={job} getData={getData} />)
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
