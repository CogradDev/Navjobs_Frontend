<<<<<<< HEAD
import React from 'react';

const Home = () => {
	return (
		<div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
			<div className="w-full max-w-lg relative pointer-events-none">
				<div className="absolute top-0 -left-4 w-44 md:w-72 h-44 md:h-72 filter blur-xl opacity-70 bg-purple-300 rounded-full animate-blob mix-blend-multiply"></div>
				<div className="absolute top-0 -right-4 w-44 md:w-72 h-44 md:h-72 filter blur-xl opacity-70 bg-yellow-300 rounded-full animate-blob animation-delay-2000 mix-blend-multiply"></div>
				<div className="absolute -bottom-20 left-20 w-44 md:w-72 h-44 md:h-72 filter blur-xl opacity-70 bg-pink-300 rounded-full animate-blob animation-delay-4000 mix-blend-multiply"></div>

				<div className="relative bg-gray-100 border p-4 m-4 rounded-lg shadow-lg shadow-gray-700 text-xl md:text-3xl text-center">
					Hey, this is to just check out the things on the web.
				</div>
			</div>
			<div className="text-justify max-w-lg">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor enim temporibus magni facere
				tenetur, obcaecati culpa suscipit, et delectus incidunt quidem autem ut dolorum voluptates
				tempora placeat aspernatur dolorem ipsa?
			</div>
		</div>
	);
};
=======
import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div class="bg-white pb-6 sm:pb-8 lg:pb-4">
                <section class="mx-auto max-w-screen-2xl px-4 md:px-8 my-2">
                    <div class="mb-8 flex flex-wrap justify-between md:mb-16">
                        <div class="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-3/5 lg:pb-10 lg:pt-40">
                            <h1 class="mb-4 text-4xl md:text-5xl font-bold md:mb-8 text-gray-700">Welcome to <span className='text-blue-600'>Nav Job Portal</span> Connecting Talent with Opportunities</h1>

                            <p class="max-w-full leading-relaxed text-gray-500 xl:text-lg">At Nav Job Portal, we are dedicated to bridging the gap between employers and job seekers. Whether you're a recruiter looking to fill a position with the perfect candidate or an applicant searching for your next career opportunity, our platform provides connection you need to succeed.</p>
                        </div>

                        <div class="mb-12 flex w-full md:mb-16 lg:w-2/5 relative">
                            <div class="relative left-12 top-12 z-10 -ml-12 md:left-16 md:top-16 lg:ml-0">
                                <img src="https://media.licdn.com/dms/image/D4D12AQHVjB5XicIQiQ/article-cover_image-shrink_600_2000/0/1674193372174?e=2147483647&v=beta&t=X11D4QFqXFTEUE2Fi9PH2hVmLEVFoogHMXXl0i4MIrw" loading="lazy" alt="Sec Front View" class="h-full w-full object-contain object-center" />
                            </div>

                            <div class="">
                                <img src="https://www.shutterstock.com/image-vector/recruitment-concept-search-choice-worker-600nw-1954350781.jpg" loading="lazy" alt="Front View" class="h-full w-full object-contain object-center" />
                            </div>
                            <div className='absolute top-0 -left-4 w-44 md:w-72 h-44 md:h-72 filter blur-3xl opacity-70 bg-purple-300 rounded-full animate-blob mix-blend-multiply'></div>
                            <div className='absolute top-0 -right-4 w-44 md:w-72 h-44 md:h-72 filter blur-3xl opacity-70 bg-pink-200 rounded-full animate-blob animation-delay-2000 mix-blend-multiply'></div>
                            <div className='absolute -bottom-20 left-20 w-44 md:w-72 h-44 md:h-72 filter blur-3xl opacity-70 bg-yellow-200 rounded-full animate-blob animation-delay-4000 mix-blend-multiply'></div>
                        </div>
                        <div class="flex flex-col items-center justify-between gap-8 md:flex-row">
                            <div class="flex h-12 w-64 divide-x divide-gray-400 overflow-hidden rounded-lg border border-gray-400">
                                <Link to="/login" class="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-blue-600 hover:text-white">Login</Link>
                                <Link to="/signup" class="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-blue-600 hover:text-white">Signup</Link>
                                <Link to="/" class="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-blue-600 hover:text-white">About</Link>
                            </div>
                        </div>
                    </div>

                </section>
            </div>

            <div className='min-h-screen flex flex-col px-4 overflow-hidden'>
                <h1 className='text-center text-4xl font-bold text-gray-700 my-4'>
                    About Us
                </h1>
                <div className='flex items-center justify-center'>
                    <p className='xl:w-4/6 w-full lg:text-center'>Nav Job Portal is a leading online platform designed to revolutionize the way employers and job seekers connect. Founded on the principle of empowering individuals to find their ideal career paths, we strive to create a seamless and efficient recruitment experience for all users.</p>
                </div>
                <div>
                    <div className='flex items-center justify-center flex-col p-4 my-4'>
                        <div className='border shadow-lg shadow-gray-500 border-gray-700 m-4 rounded-lg flex flex-col lg:flex-row overflow-hidden lg:w-4/5'>
                            <div className='h-48 lg:w-1/3 lg:h-44'>
                                <img src="https://upload.tanca.io/api/upload/news/6343ec644389eb527e064b59?name=6343ec64668f0NftG1780608-recruitment-process-1.jpeg" alt="" className='object-cover w-full h-full' />
                            </div>
                            <p className='p-2 lg:w-2/3 flex items-center justify-center'>Our mission is to provide a dynamic and inclusive space where recruiters can post job openings, and applicants can discover and apply for opportunities that align with their skills and aspirations. With innovative features and cutting-edge technology, Nav Job Portal facilitates meaningful connections between employers and talented professionals.</p>
                        </div>
                        <div className='border shadow-lg shadow-gray-500 border-gray-700 m-4 rounded-lg flex flex-col lg:flex-row-reverse overflow-hidden lg:w-4/5'>
                            <div className='h-48 lg:w-1/3 lg:h-44'>
                                <img src="https://www.paychex.com/sites/default/files/styles/medium_hq/public/image/2020-09/employee-retention-strategic-employee-recruitment.png?itok=vkuT_MMI" alt="" className='object-cover w-full h-full' />
                            </div>
                            <p className='p-2 lg:w-2/3 flex items-center justify-center'>At Nav Job Portal, we believe in the transformative power of employment. Whether you're a seasoned professional seeking new challenges or a recent graduate embarking on your career journey, we're here to support you every step of the way.

                                Join us today and embark on a journey toward success with Nav Job Portal.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
>>>>>>> 7c5ea8846cb34df827f11837a0cdb82002ea6905

export default Home;
