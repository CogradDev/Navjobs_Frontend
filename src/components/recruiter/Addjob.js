import React, { useState } from "react";
import apiList from "../../libs/apiLists";
import { toast } from "react-toastify";

const Addjobs = () => {
    const [newSkill, setNewSkill] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const [jobDetails, setJobDetails] = useState({
        title: "",
        maxApplicants: 10, // Change to numeric value
        maxPositions: 2, // Change to numeric value
        deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 16),
        skillsets: [],
        jobType: "Full Time",
        duration: 0, // Change to numeric value
        salary: 5000, // Change to numeric value
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

    const removeSkill = (indexToRemove) => {
        setJobDetails({
            ...jobDetails,
            skillsets: jobDetails.skillsets.filter((_, index) => index !== indexToRemove),
        });
    };

    const handleUpdate = async () => {
        setIsClicked(true);
        if (!jobDetails.title || !jobDetails.jobType) {
            toast.warn("Title and job type are required.");
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
                setIsClicked(false);
            }
        } catch (err) {
            setIsClicked(false);
            toast.error("Some Error occurred.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md my-8">
                <h2 className="text-2xl font-bold mb-4">Add Job</h2>
                <div className="space-y-2">
                    <div>
                        <label htmlFor="title" className="block ml-1">
                            Job Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Enter the title of the job"
                            value={jobDetails.title}
                            onChange={(event) => handleInput("title", event.target.value)}
                            className="appearance-none rounded-md relative block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="skill" className="block ml-1">
                            Skills
                        </label>
                        <input
                            type="text"
                            id="skill"
                            placeholder="Enter the desire skill sets"
                            value={newSkill}
                            onChange={handleSkillInputChange}
                            onKeyDown={handleSkillInputKeyDown}
                            className="appearance-none rounded-md relative block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                        />
                        <div className="absolute inset-y-0 -bottom-20 pointer-events-none left-1 flex items-center text-sm">
                            Press enter to add skills
                        </div>
                    </div>

                    <div className="flex space-x-3 flex-wrap pt-3">
                        {jobDetails.skillsets.map((skill, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className="border border-gray-500 px-2 rounded-l-full rounded-r-full m-1 relative"
                                >
                                    <div className="pointer-events-none">{skill}</div>
                                    <div className="absolute -top-2 -right-1 bg-gray-500 text-white rounded-full h-4 w-4 flex items-center justify-center cursor-pointer text-[0.6rem]" onClick={() => removeSkill(idx)}>X</div>
                                </div>
                            );
                        })}
                    </div>

                    <div>
                        <label htmlFor="jobtype" className="block ml-1">
                            Job Type
                        </label>
                        <select
                            id="jobtype"
                            value={jobDetails.jobType}
                            onChange={(event) => handleInput("jobType", event.target.value)}
                            className="rounded-md relative block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                        >
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Work From Home">Work From Home</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="jobduration" className="block ml-1">
                            Job Duration
                        </label>
                        <select
                            id="jobduration"
                            value={jobDetails.duration}
                            onChange={(event) =>
                                handleInput("duration", parseInt(event.target.value))
                            }
                            className="rounded-md relative block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                        >
                            <option value="0">Flexible</option>
                            <option value="1">1 Month</option>
                            <option value="2">2 Months</option>
                            <option value="3">3 Months</option>
                            <option value="4">4 Months</option>
                            <option value="5">5 Months</option>
                            <option value="6">6 Months</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="salary" className="block ml-1">
                            Job Salary
                        </label>
                        <input
                            id="salary"
                            type="number"
                            placeholder="Enter the salary"
                            value={jobDetails.salary}
                            onChange={(event) =>
                                handleInput("salary", parseInt(event.target.value))
                            }
                            className="appearance-none rounded-md relative block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="deadline" className="block ml-1">
                            Form filling deadline
                        </label>
                        <input
                            id="deadline"
                            type="datetime-local"
                            placeholder="Application Deadline"
                            value={jobDetails.deadline}
                            onChange={(event) => handleInput("deadline", event.target.value)}
                            className="appearance-none rounded-md relative block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="maxapplicant" className="block ml-1">
                            Max number of applicant
                        </label>
                        <input
                            id="maxapplicant"
                            type="number"
                            placeholder="Maximum Number Of Applicants"
                            value={jobDetails.maxApplicants}
                            onChange={(event) =>
                                handleInput("maxApplicants", parseInt(event.target.value))
                            }
                            className="appearance-none rounded-md relative block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="maxpos" className="block ml-1">
                            Max number of Available Position
                        </label>
                        <input
                            type="number"
                            id="maxpos"
                            placeholder="Number of Position Available"
                            value={jobDetails.maxPositions}
                            onChange={(event) =>
                                handleInput("maxPositions", parseInt(event.target.value))
                            }
                            className="appearance-none rounded-md relative block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                        />
                    </div>

                    <button
                        className={`${isClicked ? "animate-pulse" : "animate-none"} w-full my-6 px-4 py-2 font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:outline-none focus:bg-blue-600`}
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
