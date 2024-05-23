import React, { useState, useEffect } from 'react';
import apiList from '../../libs/apiLists';
import { userType } from '../../libs/isAuth';
import { toast } from 'react-toastify';

const JobTile = ({ job }) => {
    const [open, setOpen] = useState(false);
    const [sop, setSop] = useState('');

    const handleClose = () => {
        setOpen(false);
        setSop('');
    };

    const handleApply = async () => {
        try {
            const response = await fetch(apiList.jobs, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            const json = await response.json();

            if (json.success) {
                handleClose();
                toast.success("Applied Successfully");
                toast.warn("Need to check this section");
            }
            else {
                toast.warn(json.message);
                handleClose();
            }
        }
        catch(err){
            handleClose();
            toast.warn(err);
        }
    };

    const deadline = new Date(job.deadline).toLocaleDateString();

    return (
        <div className="p-8 mb-8 bg-white shadow-lg shadow-gray-400 rounded-lg">
            <div className="flex justify-around h-full  flex-col space-y-4">
                <div>
                    <h2 className="text-2xl font-bold">{job.title}</h2>
                    <div className="flex items-center">
                        {job.rating !== -1 ? (
                            <span className="text-yellow-500">{"⭐".repeat(job.rating)}</span>
                        ) : null}
                    </div>
                    <div>Role: {job.jobType}</div>
                    <div>Salary: &#8377; {job.salary} per month</div>
                    <div>Duration: {job.duration !== 0 ? `${job.duration} month` : `Flexible`}</div>
                    <div>Posted By: {job.recruiter.name}</div>
                    <div>Application Deadline: {deadline}</div>
                    <div className="mt-2">
                        {job.skillsets.map((skill, index) => (
                            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{skill}</span>
                        ))}
                    </div>
                </div>
                <button
                    className={`bg-blue-500 text-white px-4 py-2 rounded ${userType() === 'recruiter' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => setOpen(true)}
                    disabled={userType() === 'recruiter'}
                >
                    Apply
                </button>
            </div>
            {open && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 text-center">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Write SOP (up to 250 words)</h3>
                                    <div className="mt-2">
                                        <textarea
                                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                                            rows="8"
                                            value={sop}
                                            onChange={(e) => {
                                                if (e.target.value.split(' ').filter(n => n !== '').length <= 250) {
                                                    setSop(e.target.value);
                                                }
                                            }}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleApply}
                                >
                                    Submit
                                </button>
                                <button
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={handleClose}
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

const FilterPopup = ({ open, handleClose, searchOptions, setSearchOptions, getData }) => {
    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${open ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen px-4 text-center">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-5/6 lg:w-1/3">
                    <div className="bg-white p-6 rounded w-full">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg my-4 leading-6 font-semibold text-gray-900">Filter Options</h3>
                                <div className="mt-2">
                                    <div className="mb-4">
                                        <div className="block font-medium text-gray-700">Job Type</div>
                                        <div className="flex items-center">
                                            <input
                                                id='fullt'
                                                type="checkbox"
                                                className="mr-2 cursor-pointer"
                                                checked={searchOptions.jobType.fullTime}
                                                onChange={(e) => setSearchOptions({
                                                    ...searchOptions,
                                                    jobType: { ...searchOptions.jobType, fullTime: e.target.checked }
                                                })}
                                            />
                                            <label htmlFor='fullt' className='cursor-pointer'>Full Time</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id='partt'
                                                type="checkbox"
                                                className="mr-2 cursor-pointer"
                                                checked={searchOptions.jobType.partTime}
                                                onChange={(e) => setSearchOptions({
                                                    ...searchOptions,
                                                    jobType: { ...searchOptions.jobType, partTime: e.target.checked }
                                                })}
                                            />
                                            <label htmlFor='partt' className='cursor-pointer'>Part Time</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id='wfh'
                                                type="checkbox"
                                                className="mr-2 cursor-pointer"
                                                checked={searchOptions.jobType.wfh}
                                                onChange={(e) => setSearchOptions({
                                                    ...searchOptions,
                                                    jobType: { ...searchOptions.jobType, wfh: e.target.checked }
                                                })}
                                            />
                                            <label htmlFor='wfh' className='cursor-pointer'>Work From Home</label>
                                        </div>
                                    </div>
                                    {/* <div className="mb-4">
                                        <label className="block text-gray-700">Salary</label>
                                        <input
                                            type="range"
                                            className="w-full"
                                            value={searchOptions.salary}
                                            min="0"
                                            max="100000"
                                            step="500"
                                            onChange={(e) => setSearchOptions({
                                                ...searchOptions,
                                                salary: e.target.value
                                            })}
                                        />
                                        <div className="text-center">{searchOptions.salary}</div>
                                    </div> */}
                                    <div className="mb-4">
                                        <label className="block font-medium text-gray-700">Duration</label>
                                        <input
                                            type="range"
                                            className="w-full"
                                            value={searchOptions.duration}
                                            min="0"
                                            max="7"
                                            step="1"
                                            onChange={(e) => setSearchOptions({
                                                ...searchOptions,
                                                duration: e.target.value
                                            })}
                                        />
                                        <div className="text-center">{searchOptions.duration !== '0' ? `${searchOptions.duration} month` : 'Flexible'}</div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block font-medium text-gray-700">Rating</label>
                                        <input
                                            type="range"
                                            className="w-full"
                                            value={searchOptions.rating}
                                            min="0"
                                            max="5"
                                            step="0.5"
                                            onChange={(e) => setSearchOptions({
                                                ...searchOptions,
                                                rating: e.target.value
                                            })}
                                        />
                                        <div className="text-center">{searchOptions.rating}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => {
                                getData();
                                handleClose();
                            }}
                        >
                            Apply
                        </button>
                        <button
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
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
    const [searchOptions, setSearchOptions] = useState({
        query: '',
        jobType: {
            fullTime: false,
            partTime: false,
            wfh: false
        },
        salary: [0, 100],
        duration: '0',
        sort: {
            salary: {
                status: false,
                desc: false
            },
            duration: {
                status: false,
                desc: false
            },
            rating: {
                status: false,
                desc: false
            }
        }
    });
    const [open, setOpen] = useState(false);

    const getData = async () => {
        let searchParams = [];
        if (searchOptions.query !== '') searchParams.push(`q=${searchOptions.query}`);
        if (searchOptions.jobType.fullTime) searchParams.push('jobType=Full%20Time');
        if (searchOptions.jobType.partTime) searchParams.push('jobType=Part%20Time');
        if (searchOptions.jobType.wfh) searchParams.push('jobType=Work%20From%20Home');
        searchParams.push(`salary[gte]=0&salary[lte]=${searchOptions.salary}`);
        searchParams.push(`duration[gte]=0&duration[lte]=${searchOptions.duration}`);
        searchParams.push(`rating[gte]=0&rating[lte]=${searchOptions.rating}`);

        if (searchOptions.sort.salary.status) {
            searchParams.push(`sort=salary:${searchOptions.sort.salary.desc ? 'desc' : 'asc'}`);
        }
        if (searchOptions.sort.duration.status) {
            searchParams.push(`sort=duration:${searchOptions.sort.duration.desc ? 'desc' : 'asc'}`);
        }
        if (searchOptions.sort.rating.status) {
            searchParams.push(`sort=rating:${searchOptions.sort.rating.desc ? 'desc' : 'asc'}`);
        }

        const queryString = searchParams.join('&');

        try {
            const response = await fetch(`${apiList.jobs}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log(`${apiList.jobs}?${queryString}`)

            const json = await response.json();

            if (json.success) {
                setJobs(json.data);
            }
            else {
                toast.error(json.message);
            }
        }
        catch (err) {
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
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border py-1 px-4 text-lg rounded-lg mr-2"
                        value={searchOptions.query}
                        onChange={(e) => setSearchOptions({ ...searchOptions, query: e.target.value })}
                    />
                    <button className="bg-blue-500 text-white text-lg py-1 px-4 rounded-md" onClick={getData}>
                        Search
                    </button>
                </div>
                <button className="bg-blue-500 text-white text-lg py-1 px-4 rounded-md" onClick={() => { setOpen(true); document.body.style.overflowY = "hidden"; }}>
                    Filter
                </button>
            </div>
            <div className='lg:grid grid-cols-3 gap-4'>
                {jobs.length > 0 ? (
                    jobs.map((job) => <JobTile key={job._id} job={job} />)
                ) : (
                    <div>No jobs found</div>
                )}
            </div>
            <FilterPopup open={open} handleClose={() => { setOpen(false); document.body.style.overflowY = "auto"; }} searchOptions={searchOptions} setSearchOptions={setSearchOptions} getData={getData} />
        </div>
    );
};

export default AllJobs;