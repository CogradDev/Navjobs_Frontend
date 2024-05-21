import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

    const sliderDet = [
        { name: "Web Development", imgLink: "https://static.vecteezy.com/system/resources/thumbnails/011/153/368/small_2x/3d-website-developer-working-on-laptop-illustration-png.png" },
        { name: "MERN Developer", imgLink: "https://almablog-media.s3.ap-south-1.amazonaws.com/MERN_Title_image_f86d24f764.png" },
        { name: "Content Writer", imgLink: "https://static.vecteezy.com/system/resources/thumbnails/003/042/125/small/content-writer-or-blogger-start-new-blog-writing-article-online-vector.jpg" },
        { name: "Human Resource", imgLink: "https://static.vecteezy.com/system/resources/previews/039/331/980/non_2x/human-resources-line-grey-icon-vector.jpg" },
        { name: "React Developer", imgLink: "https://static.vecteezy.com/system/resources/previews/013/951/764/non_2x/computer-science-flat-icon-free-vector.jpg" },
        { name: "Office Assistent", imgLink: "https://static.vecteezy.com/system/resources/previews/004/725/569/non_2x/business-woman-work-on-laptop-on-office-desk-concept-with-icons-related-free-vector.jpg" },
        { name: "Web Designer", imgLink: "https://i.pinimg.com/736x/16/77/39/16773937289929e294930bd0ab9894e3.jpg" },
        { name: "Data Entry", imgLink: "https://static.vecteezy.com/system/resources/previews/022/046/272/non_2x/data-entry-icon-style-vector.jpg" },
        { name: "Graphics Designer", imgLink: "https://static.vecteezy.com/system/resources/previews/005/084/689/non_2x/graphic-designer-learning-program-software-painting-on-computer-free-vector.jpg" },
        { name: "IOS Developer", imgLink: "https://static.vecteezy.com/system/resources/previews/009/300/321/non_2x/3d-illustration-of-web-development-png.png" },
        { name: "Data Scientist", imgLink: "https://static.vecteezy.com/system/resources/previews/005/877/715/non_2x/science-research-modern-flat-concept-for-web-banner-design-scientist-studies-brain-and-analyzes-data-on-computer-screen-doing-neurobiology-research-illustration-with-isolated-people-scene-vector.jpg" }
    ];

    const anothersliderDet = [
        { name: "Data Scientist", imgLink: "https://static.vecteezy.com/system/resources/previews/005/877/715/non_2x/science-research-modern-flat-concept-for-web-banner-design-scientist-studies-brain-and-analyzes-data-on-computer-screen-doing-neurobiology-research-illustration-with-isolated-people-scene-vector.jpg" },
        { name: "IOS Developer", imgLink: "https://static.vecteezy.com/system/resources/previews/009/300/321/non_2x/3d-illustration-of-web-development-png.png" },
        { name: "Graphics Designer", imgLink: "https://static.vecteezy.com/system/resources/previews/005/084/689/non_2x/graphic-designer-learning-program-software-painting-on-computer-free-vector.jpg" },
        { name: "Data Entry", imgLink: "https://static.vecteezy.com/system/resources/previews/022/046/272/non_2x/data-entry-icon-style-vector.jpg" },
        { name: "Web Designer", imgLink: "https://i.pinimg.com/736x/16/77/39/16773937289929e294930bd0ab9894e3.jpg" },
        { name: "Office Assistent", imgLink: "https://static.vecteezy.com/system/resources/previews/004/725/569/non_2x/business-woman-work-on-laptop-on-office-desk-concept-with-icons-related-free-vector.jpg" },
        { name: "React Developer", imgLink: "https://static.vecteezy.com/system/resources/previews/013/951/764/non_2x/computer-science-flat-icon-free-vector.jpg" },
        { name: "Human Resource", imgLink: "https://static.vecteezy.com/system/resources/previews/039/331/980/non_2x/human-resources-line-grey-icon-vector.jpg" },
        { name: "Content Writer", imgLink: "https://static.vecteezy.com/system/resources/thumbnails/003/042/125/small/content-writer-or-blogger-start-new-blog-writing-article-online-vector.jpg" },
        { name: "MERN Developer", imgLink: "https://almablog-media.s3.ap-south-1.amazonaws.com/MERN_Title_image_f86d24f764.png" },
        { name: "Web Development", imgLink: "https://static.vecteezy.com/system/resources/thumbnails/011/153/368/small_2x/3d-website-developer-working-on-laptop-illustration-png.png" }
    ];

    return (
        <>
            <div className="bg-white pb-6 sm:pb-8 lg:pb-4">
                <section className="mx-auto max-w-screen-2xl px-4 md:px-8 my-2">
                    <div className="mb-8 flex flex-wrap justify-between md:mb-16">
                        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-3/5 lg:pb-10 lg:pt-40">
                            <h1 className="mb-4 text-4xl md:text-5xl font-bold md:mb-8 text-gray-700">Welcome to <span className='text-blue-600'>Nav Job Portal</span> Connecting Talent with Opportunities</h1>

                            <p className="max-w-full text-justify  text-gray-500 xl:text-lg">At Nav Job Portal, we are dedicated to bridging the gap between employers and job seekers.</p>
                        </div>

                        <div className="mb-12 flex w-full md:mb-16 lg:w-2/5 relative">
                            <div className="relative left-12 top-12 z-10 -ml-12 md:left-16 md:top-16 lg:ml-0">
                                <img src="https://media.licdn.com/dms/image/D4D12AQHVjB5XicIQiQ/article-cover_image-shrink_600_2000/0/1674193372174?e=2147483647&v=beta&t=X11D4QFqXFTEUE2Fi9PH2hVmLEVFoogHMXXl0i4MIrw" loading="lazy" alt="Sec Front View" className="h-full w-full object-contain object-center" />
                            </div>

                            <div className="">
                                <img src="https://www.shutterstock.com/image-vector/recruitment-concept-search-choice-worker-600nw-1954350781.jpg" loading="lazy" alt="Front View" className="h-full w-full object-contain object-center" />
                            </div>
                            <div className='absolute top-0 -left-4 w-44 md:w-72 h-44 md:h-72 filter blur-3xl opacity-70 bg-purple-300 rounded-full animate-blob mix-blend-multiply'></div>
                            <div className='absolute top-0 -right-4 w-44 md:w-72 h-44 md:h-72 filter blur-3xl opacity-70 bg-pink-200 rounded-full animate-blob animation-delay-2000 mix-blend-multiply'></div>
                            <div className='absolute -bottom-20 left-20 w-44 md:w-72 h-44 md:h-72 filter blur-3xl opacity-70 bg-yellow-200 rounded-full animate-blob animation-delay-4000 mix-blend-multiply'></div>
                        </div>
                        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                            <div className="flex h-12 w-64 divide-x divide-gray-400 overflow-hidden rounded-lg border border-gray-400 relative">
                                <Link to="/login" className="flex w-1/3 items-center justify-center transition duration-100 hover:bg-blue-600 hover:text-white">Login</Link>
                                <Link to="/applicantsignup" className="flex w-1/3 items-center justify-center transition duration-100 hover:bg-blue-600 hover:text-white">Signup</Link>
                                <Link to="/" className="flex w-1/3 items-center justify-center transition duration-100 hover:bg-blue-600 hover:text-white">About</Link>
                            </div>
                        </div>
                    </div>

                </section>
            </div>

            <div className='flex flex-col px-4 overflow-hidden'>
                <div className='flex flex-col'>
                    <div className='flex flex-col lg:flex-row items-center'>
                        <div className='m-4 w-full'>
                            <h1 className='text-4xl md:text-5xl font-bold text-gray-700 my-4'>
                                Your job search ends here!
                            </h1>
                        </div>

                        <div className='border border-gray-400 relative m-4 p-4 h-56 w-full rounded-xl bg-gradient-to-t from-green-200'>
                            <h2 className='font-semibold text-2xl my-4'>Jobs for Freshers</h2>
                            <Link to="/alljobs" class="absolute bottom-12 left-4 border border-gray-400 px-1.5 text-sm py-1 rounded-lg bg-green-500 hover:bg-green-600 text-white group transition ease-in-out duration-200">See More <span aria-hidden="true" class="inline-block translate-x-0 group-hover:translate-x-1 transition-transform ease-in-out duration-200">&gt;</span></Link>
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/010/872/229/small_2x/3d-job-applicant-illustration-png.png" alt="" className='absolute bottom-0 -right-2 w-52 h-44' />
                        </div>
                        <div className='border border-gray-400 relative m-4 p-4 h-56 w-full rounded-xl bg-gradient-to-t from-red-200'>
                            <h2 className='font-semibold text-2xl my-4'>Work from home Jobs</h2>
                            <Link to="/alljobs" class="absolute bottom-12 left-4 border border-gray-400 px-1.5 text-sm py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white group transition ease-in-out duration-200">See More <span aria-hidden="true" class="inline-block translate-x-0 group-hover:translate-x-1 transition-transform ease-in-out duration-200">&gt;</span></Link>
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/024/222/409/small_2x/male-freelancer-working-from-home-3d-character-illustration-png.png" alt="" className='absolute -bottom-4 right-0 w-48 h-48' />
                        </div>
                    </div>
                    <div className='flex flex-col lg:flex-row items-center'>
                        <div className='border border-gray-400 relative m-4 p-4 h-56 w-full rounded-xl bg-gradient-to-t from-cyan-200'>
                            <h2 className='font-semibold text-2xl my-4'>Work at site Jobs</h2>
                            <Link to="/alljobs" class="absolute bottom-12 left-4 border border-gray-400 px-1.5 text-sm py-1 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white group transition ease-in-out duration-200">See More <span aria-hidden="true" class="inline-block translate-x-0 group-hover:translate-x-1 transition-transform ease-in-out duration-200">&gt;</span></Link>
                            <img src="https://static.vecteezy.com/system/resources/previews/032/187/756/non_2x/employees-and-office-workers-cartoon-characters-free-png.png" alt="" className='absolute bottom-4 right-2 w-44 h-36' />
                        </div>
                        <div className='border border-gray-400 relative m-4 p-4 h-56 w-full rounded-xl bg-gradient-to-t from-purple-200'>
                            <h2 className='font-semibold text-2xl my-4'>Part time Jobs</h2>
                            <Link to="/alljobs" class="absolute bottom-12 left-4 border border-gray-400 px-1.5 text-sm py-1 rounded-lg bg-purple-500 hover:bg-purple-600 text-white group transition ease-in-out duration-200">See More <span aria-hidden="true" class="inline-block translate-x-0 group-hover:translate-x-1 transition-transform ease-in-out duration-200">&gt;</span></Link>
                            <img src="https://storage.googleapis.com/joblist-content/hero-images/part-time-jobs.jpg" alt="" className='absolute bottom-5 -right-2 mix-blend-darken w-48 h-36' />
                        </div>
                        <div className='border border-gray-400 relative m-4 p-4 h-56 w-full rounded-xl bg-gradient-to-t from-orange-200'>
                            <h2 className='font-semibold text-2xl my-4'>Full time Jobs</h2>
                            <Link to="/alljobs" class="absolute bottom-12 left-4 border border-gray-400 px-1.5 text-sm py-1 rounded-lg bg-orange-500 hover:bg-orange-600 text-white group transition ease-in-out duration-200">See More <span aria-hidden="true" class="inline-block translate-x-0 group-hover:translate-x-1 transition-transform ease-in-out duration-200">&gt;</span></Link>
                            <img src="https://static.vecteezy.com/system/resources/previews/019/152/947/non_2x/busy-employees-with-busy-scheludes-finish-work-targets-on-time-man-busy-work-schedule-free-png.png" alt="" className='absolute bottom-4 right-2 w-40 h-36' />
                        </div>
                    </div>
                </div>

                {/* <div>
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
                </div> */}
            </div>

            <div className='my-10'>
                <div>
                    <h2 className='text-4xl md:text-5xl text-gray-700 font-bold px-4 md:px-8 '>Job roles on Nav Job Portal</h2>
                    <div className='overflow-hidden'>
                        <div className="scrolling-wrapper flex">
                            {sliderDet.map((detail, index) => (
                                <div key={index} className="flex-shrink-0 border border-gray-400 rounded-lg shadow-lg shadow-gray-400 m-8 overflow-hidden mx-5 md:mx-12 flex items-center justify-center w-60">
                                    <img src={detail.imgLink} alt='Job Slider' className="w-full h-20 object-contain" />
                                    <div className='w-full p-2'>{detail.name}</div>
                                </div>
                            ))}
                            {sliderDet.map((detail, index) => (
                                <div key={index} className="flex-shrink-0 border border-gray-400 rounded-lg shadow-lg shadow-gray-400 m-8 overflow-hidden mx-5 md:mx-12 flex items-center justify-center w-60">
                                    <img src={detail.imgLink} alt='Job Slider' className="w-full h-20 object-contain" />
                                    <div className='w-full p-2'>{detail.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='overflow-hidden'>
                        <div className="scrolling-wrapper flex ml-40">
                            {anothersliderDet.map((detail, index) => (
                                <div key={index} className="flex-shrink-0 border border-gray-400 rounded-lg shadow-lg shadow-gray-400 m-8 overflow-hidden mx-5 md:mx-12 flex items-center justify-center w-60">
                                    <img src={detail.imgLink} alt='Job Slider' className="w-full h-20 object-contain" />
                                    <div className='w-full p-2'>{detail.name}</div>
                                </div>
                            ))}
                            {anothersliderDet.map((detail, index) => (
                                <div key={index} className="flex-shrink-0 border border-gray-400 rounded-lg shadow-lg shadow-gray-400 m-8 overflow-hidden mx-5 md:mx-12 flex items-center justify-center w-60">
                                    <img src={detail.imgLink} alt='Job Slider' className="w-full h-20 object-contain" />
                                    <div className='w-full p-2'>{detail.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className='border border-black my-12 rounded-2xl flex items-center justify-center flex-col lg:flex-row bg-gradient-to-tl from-blue-100 to-gray-50 mx-4 lg:mx-12'>
                <div className='w-full h-[20rem] py-2 md:py-4'>
                    <img src="https://recruiterflow.com/blog/wp-content/uploads/2022/10/recruiting-challanges.png" alt="" className='w-full h-full object-contain mix-blend-darken' />
                </div>

                <div className='flex flex-col h-[20rem] w-full p-2'>
                    <h2 className='text-xl text-blue-600 font-semibold px-4 lg:my-4'>NAV JOB PORTAL FOR EMPLOYERS</h2>

                    <div className='my-12 px-4'>
                        <h1 className='text-4xl font-bold text-blue-700'>Want to hire?</h1>
                        <p className='mb-10 font-semibold text-gray-800'>Find the best candidates from active job seekers at our portal!</p>
                        <Link to="/" className='border border-blue-400 py-2 px-10 rounded-lg text-xl font-semibold text-blue-700 bg-blue-100 hover:bg-gray-200'>Post job &gt;</Link>
                    </div>

                </div>
            </div>

            <div class="bg-blue-300 pt-4 sm:pt-10 lg:pt-12">
                <footer class="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <div class="flex flex-col items-center justify-between gap-4 border-t border-blue-600 rounded-md border-b py-6 md:flex-row">
                        <nav class="flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start md:gap-6">
                            <Link to="/" class="transition duration-100 hover:text-blue-700 hover:scale-105">About</Link>
                            <Link to="/" class="transition duration-100 hover:text-blue-700 hover:scale-105">Investor Relations</Link>
                            <Link to="/" class="transition duration-100 hover:text-blue-700 hover:scale-105">Jobs</Link>
                            <Link to="/" class="transition duration-100 hover:text-blue-700 hover:scale-105">Press</Link>
                            <Link to="/" class="transition duration-100 hover:text-blue-700 hover:scale-105">Blog</Link>
                        </nav>
                        
                        <div class="flex gap-4 text-gray-700">
                            <Link to="/" target="_blank" class="transition duration-100 hover:text-pink-500">
                                <svg class="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </Link>

                            <Link to="/" target="_blank" class="transition duration-100 hover:text-blue-500">
                                <svg class="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </Link>

                            <Link to="/" target="_blank" class="transition duration-100 hover:text-blue-700">
                                <svg class="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </Link>

                            <Link to="/" target="_blank" class="transition duration-100 hover:text-gray-700">
                                <svg class="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div class="py-8 text-center text-sm">© 2024 - NavJobs. All rights reserved.</div>
                </footer>
            </div>

        </>
    )
}

export default Home;