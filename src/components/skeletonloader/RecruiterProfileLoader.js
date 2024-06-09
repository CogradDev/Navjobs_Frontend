import React from 'react';

const RecruiterProfileLoader = () => {
    return (
        <div>
            <h3 className="text-lg md:text-xl font-semibold flex items-center">
                Hello, <span className="animate-pulse bg-gray-300 duration-75 w-32 h-6 ml-1.5 rounded-md inline-block"></span>
            </h3>
            <p className="text-sm md:text-lg text-gray-700 mt-2 flex items-center ">
                Contact Number: <span className="animate-pulse bg-gray-300 duration-75 w-32 h-6 ml-1.5 rounded-md inline-block"></span>
            </p>
            <p className="text-sm md:text-lg text-gray-700 mt-1 flex items-center">
                Bio: <span className="animate-pulse bg-gray-300 duration-75 w-96 h-6 ml-1.5 rounded-md inline-block"></span>
            </p>
            <p className="text-sm md:text-lg text-gray-700 mt-1 flex items-center">
                Type: <span className="animate-pulse bg-gray-300 duration-75 w-24 h-6 ml-1.5 rounded-md inline-block"></span>
            </p>
            <p className="text-sm md:text-lg text-gray-700 mt-1 flex items-center">
                Company Name: <span className="animate-pulse bg-gray-300 duration-75 w-32 h-6 ml-1.5 rounded-md inline-block"></span>
            </p>
            <p className="text-sm md:text-lg text-gray-700 mt-1 flex items-center">
                Location: <span className="animate-pulse bg-gray-300 duration-75 w-40 h-6 ml-1.5 rounded-md inline-block"></span>
            </p>
            <p className="text-sm md:text-lg text-gray-700 mt-1 flex items-center">
                Industry: <span className="animate-pulse bg-gray-300 duration-75 w-32 h-6 ml-1.5 rounded-md inline-block"></span>
            </p>
            <p className="text-sm md:text-lg text-gray-700 mt-1 flex items-center">
                Company Description: <span className="animate-pulse bg-gray-300 duration-75 w-40 h-6 ml-1.5 rounded-md inline-block"></span>
            </p>
        </div>
    )
}

export default RecruiterProfileLoader;