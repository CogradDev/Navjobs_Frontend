import { useState } from "react";
import apiList from '../../libs/apiLists';
import { toast } from "react-toastify";

const Addjobs = () => {

    const [newSkill, setNewSkill] = useState("");

    const [jobDetails, setJobDetails] = useState({
        title: "",
        maxApplicants: "",
        maxPositions: "",
        deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 16),
        skillsets: [],
        jobType: "Full Time",
        duration: "Flexible",
        salary: ""
    });

    const handleInput = (key, value) => {
        setJobDetails({
            ...jobDetails,
            [key]: value,
        });
        console.log("Key is :  ", key, "And value is :  ", value);
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
    }


    const handleUpdate = async () => {
        try {
            const response = await fetch(apiList.jobs, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(jobDetails)
            });
            console.log("This is stringify details \n", JSON.stringify(jobDetails));

            const json = await response.json();
            if (json.success) {
                toast.success(json.message);
            }
            else {
                toast.warn(json.message);
            }

        }
        catch (err) {
            toast.error("Some Error occured.");
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Add Job</h2>
                    <div className="space-y-4">
                        {/* <input
                            type="text"
                            placeholder="Title of the job"
                            value={jobDetails.title}
                            onChange={(event) => handleInput("title", event.target.value)}
                            className="w-full p-2 border rounded-md outline-none"
                        /> */}
                        <input type="text" placeholder="Add Title" value={jobDetails.title} onChange={(event) => handleInput("title", event.target.value)} className="w-full p-2 border rounded-md outline-none" />
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Add the Skills"
                                value={newSkill}
                                onChange={handleSkillInputChange}
                                onKeyDown={handleSkillInputKeyDown}
                                className="w-full p-2 border rounded-md outline-none"
                            />
                            <div className='absolute inset-y-0 -bottom-14 pointer-events-none left-1 flex items-center text-sm'>Press enter to add skills</div>
                        </div>
                        <div className="flex space-x-3 flex-wrap">
                            {
                                jobDetails.skillsets.map((skill, idx) => {
                                    return <div key={idx} className="border border-gray-500 px-2 rounded-l-full rounded-r-full m-1">
                                        <div className="pointer-events-none">{skill}</div>
                                    </div>
                                })
                            }
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
                            onChange={(event) => handleInput("duration", event.target.value)}
                            className="w-full p-2 border rounded-md outline-none"
                        >
                            <option value="Flexible">Flexible</option>
                            <option value="1 Month">1 Month</option>
                            <option value="2 Months">2 Months</option>
                            <option value="3 Months">3 Months</option>
                            <option value="4 Months">4 Months</option>
                            <option value="5 Months">5 Months</option>
                            <option value="6 Months">6 Months</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Enter the salary"
                            value={jobDetails.salary}
                            onChange={(event) => handleInput("salary", event.target.value)}
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
                            onChange={(event) => handleInput("maxApplicants", event.target.value)}
                            className="w-full p-2 border rounded-md outline-none"
                        />
                        <input
                            type="number"
                            placeholder="Number of Position Available"
                            value={jobDetails.maxPositions}
                            onChange={(event) => handleInput("maxPositions", event.target.value)}
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
        </>
    );
};

export default Addjobs;