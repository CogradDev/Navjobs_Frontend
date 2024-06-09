import React from 'react';

const myjobsloader = () => {
    return (
        <>
            {
                [1, 2, 3, 4, 5, 6, 7].map(() => {
                    return <div className='p-6 my-5 bg-white shadow-lg rounded-lg w-full'>
                        <div className="flex flex-col md:flex-row">
                            <div className="w-3/4 space-y-2">
                                <div className="animate-pulse bg-gray-300 duration-75 w-40 h-7 rounded-md text-2xl font-bold text-blue-700"></div>
                                <div className="animate-pulse bg-gray-300 duration-75 w-20 h-5 rounded-md flex items-center space-x-2"></div>
                                <div className="animate-pulse bg-gray-300 duration-75 w-28 h-5 rounded-md text-gray-600"></div>
                                <div className="animate-pulse bg-gray-300 duration-75 w-24 h-5 rounded-md text-gray-600"></div>
                                <div className="animate-pulse bg-gray-300 duration-75 w-32 h-5 rounded-md text-gray-600 flex items-center"></div>
                                <div className="animate-pulse bg-gray-300 duration-75 w-24 h-5 rounded-md text-gray-600"></div>
                                <div className="animate-pulse bg-gray-300 duration-75 w-32 h-5 rounded-md text-gray-600 flex items-center"></div>
                                <div className="animate-pulse bg-gray-300 duration-75 w-28 h-5 rounded-md text-gray-600 flex items-center"></div>
                                <div className='flex flex-wrap gap-2'>
                                    {
                                        [1, 2, 3, 4].map(() => {
                                            return <div className="animate-pulse bg-gray-300 duration-75 w-12 h-5 rounded-md"></div>
                                        })
                                    }
                                </div>
                            </div>
                            <div className="w-full md:w-1/4 flex flex-col space-y-2 mt-4">
                                <button className="animate-pulse bg-gray-300 duration-75 w-full h-10 rounded-md"></button>
                                <button className="animate-pulse bg-gray-300 duration-75 w-full h-10 rounded-md"></button>
                                <button className="animate-pulse bg-gray-300 duration-75 w-full h-10 rounded-md"></button>
                            </div>
                        </div>
                    </div>
                })
            }
        </>
    )
}

export default myjobsloader;
