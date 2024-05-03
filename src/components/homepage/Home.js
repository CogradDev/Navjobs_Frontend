import React from 'react'

const Home = () => {
    return (
        <div className='bg-gray-50 min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden'>
            <div className='w-full max-w-lg relative pointer-events-none'>
                <div className='absolute top-0 -left-4 w-44 md:w-72 h-44 md:h-72 filter blur-xl opacity-70 bg-purple-300 rounded-full animate-blob mix-blend-multiply'></div>
                <div className='absolute top-0 -right-4 w-44 md:w-72 h-44 md:h-72 filter blur-xl opacity-70 bg-yellow-300 rounded-full animate-blob animation-delay-2000 mix-blend-multiply'></div>
                <div className='absolute -bottom-20 left-20 w-44 md:w-72 h-44 md:h-72 filter blur-xl opacity-70 bg-pink-300 rounded-full animate-blob animation-delay-4000 mix-blend-multiply'></div>

                <div className='relative bg-gray-100 border p-4 m-4 rounded-lg shadow-lg shadow-gray-700 text-xl md:text-3xl text-center'>
                    Hey, this is to just check out the things on the web.
                </div>
            </div>
            <div className='text-justify max-w-lg'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor enim temporibus magni facere tenetur, obcaecati culpa suscipit, et delectus incidunt quidem autem ut dolorum voluptates tempora placeat aspernatur dolorem ipsa?
            </div>
        </div>
    )
}

export default Home;