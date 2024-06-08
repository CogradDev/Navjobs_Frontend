import React from "react";
import { Link } from "react-router-dom";
import Job from "../Images/job.png"

const Home = () => {
  const sliderDet = [
    {
      name: "Web Development",
      imgLink:
        "https://static.vecteezy.com/system/resources/thumbnails/011/153/368/small_2x/3d-website-developer-working-on-laptop-illustration-png.png",
    },
    {
      name: "MERN Developer",
      imgLink:
        "https://almablog-media.s3.ap-south-1.amazonaws.com/MERN_Title_image_f86d24f764.png",
    },
    {
      name: "Content Writer",
      imgLink:
        "https://static.vecteezy.com/system/resources/thumbnails/003/042/125/small/content-writer-or-blogger-start-new-blog-writing-article-online-vector.jpg",
    },
    {
      name: "Human Resource",
      imgLink:
        "https://static.vecteezy.com/system/resources/previews/039/331/980/non_2x/human-resources-line-grey-icon-vector.jpg",
    },
    {
      name: "React Developer",
      imgLink:
        "https://static.vecteezy.com/system/resources/previews/013/951/764/non_2x/computer-science-flat-icon-free-vector.jpg",
    },
    {
      name: "Office Assistent",
      imgLink:
        "https://static.vecteezy.com/system/resources/previews/004/725/569/non_2x/business-woman-work-on-laptop-on-office-desk-concept-with-icons-related-free-vector.jpg",
    },
    {
      name: "Web Designer",
      imgLink:
        "https://i.pinimg.com/736x/16/77/39/16773937289929e294930bd0ab9894e3.jpg",
    },
    {
      name: "Data Entry",
      imgLink:
        "https://static.vecteezy.com/system/resources/previews/022/046/272/non_2x/data-entry-icon-style-vector.jpg",
    },
    {
      name: "Graphics Designer",
      imgLink:
        "https://static.vecteezy.com/system/resources/previews/005/084/689/non_2x/graphic-designer-learning-program-software-painting-on-computer-free-vector.jpg",
    },
    {
      name: "IOS Developer",
      imgLink:
        "https://static.vecteezy.com/system/resources/previews/009/300/321/non_2x/3d-illustration-of-web-development-png.png",
    },
    {
      name: "Data Scientist",
      imgLink:
        "https://static.vecteezy.com/system/resources/previews/005/877/715/non_2x/science-research-modern-flat-concept-for-web-banner-design-scientist-studies-brain-and-analyzes-data-on-computer-screen-doing-neurobiology-research-illustration-with-isolated-people-scene-vector.jpg",
    },
  ];

  const anothersliderDet = [
    {
      name: "Data Scientist",
      imgLink:
        "https://static.vecteezy.com/system/resources/previews/005/877/715/non_2x/science-research-modern-flat-concept-for-web-banner-design-scientist-studies-brain-and-analyzes-data-on-computer-screen-doing-neurobiology-research-illustration-with-isolated-people-scene-vector.jpg",
    },
    {
      name: "IOS Developer",
      imgLink:
        "https://static.vecteezy.com/system/resources/previews/009/300/321/non_2x/3d-illustration-of-web-development-png.png",
    },
    {
      name: "Graphics Designer",
      imgLink:
        "https://static.vecteezy.com/system/resources/previews/005/084/689/non_2x/graphic-designer-learning-program-software-painting-on-computer-free-vector.jpg",
    },
    {
      name: "Data Entry",
      imgLink:
        "https://static.vecteezy.com/system/resources/previews/022/046/272/non_2x/data-entry-icon-style-vector.jpg",
    },
    {
      name: "Web Designer",
      imgLink:
        "https://i.pinimg.com/736x/16/77/39/16773937289929e294930bd0ab9894e3.jpg",
    },
    {
      name: "Office Assistent",
      imgLink:
        "https://static.vecteezy.com/system/resources/previews/004/725/569/non_2x/business-woman-work-on-laptop-on-office-desk-concept-with-icons-related-free-vector.jpg",
    },
    {
      name: "React Developer",
      imgLink:
        "https://static.vecteezy.com/system/resources/previews/013/951/764/non_2x/computer-science-flat-icon-free-vector.jpg",
    },
    {
      name: "Human Resource",
      imgLink:
        "https://static.vecteezy.com/system/resources/previews/039/331/980/non_2x/human-resources-line-grey-icon-vector.jpg",
    },
    {
      name: "Content Writer",
      imgLink:
        "https://static.vecteezy.com/system/resources/thumbnails/003/042/125/small/content-writer-or-blogger-start-new-blog-writing-article-online-vector.jpg",
    },
    {
      name: "MERN Developer",
      imgLink:
        "https://almablog-media.s3.ap-south-1.amazonaws.com/MERN_Title_image_f86d24f764.png",
    },
    {
      name: "Web Development",
      imgLink:
        "https://static.vecteezy.com/system/resources/thumbnails/011/153/368/small_2x/3d-website-developer-working-on-laptop-illustration-png.png",
    },
  ];

  return (
    <>
      <div className="bg-white pb-6 sm:pb-8 lg:pb-4">
        <section className="mx-auto max-w-screen-2xl px-4 md:px-8 my-2">
          <div className="mb-8 flex flex-wrap justify-between md:mb-16">
            <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-3/5 lg:pb-10 lg:pt-40">
              <h1 className="mb-4 text-4xl md:text-5xl font-bold md:mb-8 text-gray-700">
                Welcome to <span className="text-blue-600">Nav Job Portal</span>{" "}
                Connecting Talent with Opportunities
              </h1>

              <p className="max-w-full text-justify  text-gray-500 xl:text-lg">
                At Nav Job Portal, we are dedicated to bridging the gap between
                employers and job seekers.
              </p>
            </div>

            <div className="mb-12 flex w-full md:mb-16 lg:w-2/5 relative">
              <div className="relative left-12 top-12 z-10 -ml-12 md:left-16 md:top-16 lg:ml-0">
                <img
                  src="https://media.licdn.com/dms/image/D4D12AQHVjB5XicIQiQ/article-cover_image-shrink_600_2000/0/1674193372174?e=2147483647&v=beta&t=X11D4QFqXFTEUE2Fi9PH2hVmLEVFoogHMXXl0i4MIrw"
                  loading="lazy"
                  alt="Sec Front View"
                  className="h-full w-full object-contain object-center"
                />
              </div>

              <div className="">
                <img
                  src="https://www.shutterstock.com/image-vector/recruitment-concept-search-choice-worker-600nw-1954350781.jpg"
                  loading="lazy"
                  alt="Front View"
                  className="h-full w-full object-contain object-center"
                />
              </div>
              <div className="absolute top-0 -left-4 w-44 md:w-72 h-44 md:h-72 filter blur-3xl opacity-70 bg-purple-300 rounded-full animate-blob mix-blend-multiply"></div>
              <div className="absolute top-0 -right-4 w-44 md:w-72 h-44 md:h-72 filter blur-3xl opacity-70 bg-pink-200 rounded-full animate-blob animation-delay-2000 mix-blend-multiply"></div>
              <div className="absolute -bottom-20 left-20 w-44 md:w-72 h-44 md:h-72 filter blur-3xl opacity-70 bg-yellow-200 rounded-full animate-blob animation-delay-4000 mix-blend-multiply"></div>
            </div>
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <div className="flex h-12 w-64 divide-x divide-gray-400 overflow-hidden rounded-lg border border-gray-400 relative">
                <Link
                  to="/login"
                  className="flex w-1/3 items-center justify-center transition duration-100 hover:bg-blue-600 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/applicantsignup"
                  className="flex w-1/3 items-center justify-center transition duration-100 hover:bg-blue-600 hover:text-white"
                >
                  Signup
                </Link>
                <Link

                  // to="/"
                  // className="flex w-1/3 items-center justify-center transition duration-100 hover:bg-blue-600 hover:text-white"
                  to="/recruitersignup"
                  className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-blue-600 hover:text-white"
                >
                  HR
                </Link>
                <Link
                  to="/About"
                  className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-blue-600 hover:text-white"

                  // to="/"
                  // className="flex w-1/3 items-center justify-center transition duration-100 hover:bg-blue-600 hover:text-white"

                >
                  About
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="flex flex-col px-4 overflow-hidden">
        <div className="flex flex-col">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="m-4 w-full">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-700 my-4">
                Your job search ends here!
              </h1>
            </div>

            <div className="border border-gray-400 relative m-4 p-4 h-56 w-full rounded-xl bg-gradient-to-t from-green-200">
              <h2 className="font-semibold text-2xl my-4">Jobs for Freshers</h2>
              <Link
                to="/"
                className="absolute bottom-12 left-4 border border-gray-400 px-1.5 text-sm py-1 rounded-lg bg-green-500 hover:bg-green-600 text-white group transition ease-in-out duration-200"
              >
                See More{" "}
                <span
                  aria-hidden="true"
                  className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform ease-in-out duration-200"
                >
                  &gt;
                </span>
              </Link>
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/010/872/229/small_2x/3d-job-applicant-illustration-png.png"
                alt=""
                className="absolute bottom-0 -right-2 w-52 h-44"
              />
            </div>
            <div className="border border-gray-400 relative m-4 p-4 h-56 w-full rounded-xl bg-gradient-to-t from-red-200">
              <h2 className="font-semibold text-2xl my-4">
                Work from home Jobs
              </h2>
              <Link
                to="/"
                className="absolute bottom-12 left-4 border border-gray-400 px-1.5 text-sm py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white group transition ease-in-out duration-200"
              >
                See More{" "}
                <span
                  aria-hidden="true"
                  className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform ease-in-out duration-200"
                >
                  &gt;
                </span>
              </Link>
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/024/222/409/small_2x/male-freelancer-working-from-home-3d-character-illustration-png.png"
                alt=""
                className="absolute -bottom-4 right-0 w-48 h-48"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center">
            <div className="border border-gray-400 relative m-4 p-4 h-56 w-full rounded-xl bg-gradient-to-t from-cyan-200">
              <h2 className="font-semibold text-2xl my-4">Work at site Jobs</h2>
              <Link
                to="/"
                className="absolute bottom-12 left-4 border border-gray-400 px-1.5 text-sm py-1 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white group transition ease-in-out duration-200"
              >
                See More{" "}
                <span
                  aria-hidden="true"
                  className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform ease-in-out duration-200"
                >
                  &gt;
                </span>
              </Link>
              <img
                src="https://static.vecteezy.com/system/resources/previews/032/187/756/non_2x/employees-and-office-workers-cartoon-characters-free-png.png"
                alt=""
                className="absolute bottom-4 right-2 w-44 h-36"
              />
            </div>
            <div className="border border-gray-400 relative m-4 p-4 h-56 w-full rounded-xl bg-gradient-to-t from-purple-200">
              <h2 className="font-semibold text-2xl my-4">Part time Jobs</h2>
              <Link
                to="/"
                className="absolute bottom-12 left-4 border border-gray-400 px-1.5 text-sm py-1 rounded-lg bg-purple-500 hover:bg-purple-600 text-white group transition ease-in-out duration-200"
              >
                See More{" "}
                <span
                  aria-hidden="true"
                  className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform ease-in-out duration-200"
                >
                  &gt;
                </span>
              </Link>
              <img
                src="https://storage.googleapis.com/joblist-content/hero-images/part-time-jobs.jpg"
                alt=""
                className="absolute bottom-5 -right-2 mix-blend-darken w-48 h-36"
              />
            </div>
            <div className="border border-gray-400 relative m-4 p-4 h-56 w-full rounded-xl bg-gradient-to-t from-orange-200">
              <h2 className="font-semibold text-2xl my-4">Full time Jobs</h2>
              <Link
                to="/"
                className="absolute bottom-12 left-4 border border-gray-400 px-1.5 text-sm py-1 rounded-lg bg-orange-500 hover:bg-orange-600 text-white group transition ease-in-out duration-200"
              >
                See More{" "}
                <span
                  aria-hidden="true"
                  className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform ease-in-out duration-200"
                >
                  &gt;
                </span>
              </Link>
              <img
                src="https://static.vecteezy.com/system/resources/previews/019/152/947/non_2x/busy-employees-with-busy-scheludes-finish-work-targets-on-time-man-busy-work-schedule-free-png.png"
                alt=""
                className="absolute bottom-4 right-2 w-40 h-36"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="my-10">
        <div>
          <h2 className="text-4xl md:text-5xl text-gray-700 font-bold px-4 md:px-8 ">
            Job roles on Nav Job Portal
          </h2>
          <div className="overflow-hidden">
            <div className="scrolling-wrapper flex">
              {sliderDet.map((detail, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 border border-gray-400 rounded-lg shadow-lg shadow-gray-400 m-8 overflow-hidden mx-5 md:mx-12 flex items-center justify-center w-60"
                >
                  <img
                    src={detail.imgLink}
                    alt="Job Slider"
                    className="w-full h-20 object-contain"
                  />
                  <div className="w-full p-2">{detail.name}</div>
                </div>
              ))}
              {sliderDet.map((detail, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 border border-gray-400 rounded-lg shadow-lg shadow-gray-400 m-8 overflow-hidden mx-5 md:mx-12 flex items-center justify-center w-60"
                >
                  <img
                    src={detail.imgLink}
                    alt="Job Slider"
                    className="w-full h-20 object-contain"
                  />
                  <div className="w-full p-2">{detail.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="scrolling-wrapper flex ml-40">
              {anothersliderDet.map((detail, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 border border-gray-400 rounded-lg shadow-lg shadow-gray-400 m-8 overflow-hidden mx-5 md:mx-12 flex items-center justify-center w-60"
                >
                  <img
                    src={detail.imgLink}
                    alt="Job Slider"
                    className="w-full h-20 object-contain"
                  />
                  <div className="w-full p-2">{detail.name}</div>
                </div>
              ))}
              {anothersliderDet.map((detail, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 border border-gray-400 rounded-lg shadow-lg shadow-gray-400 m-8 overflow-hidden mx-5 md:mx-12 flex items-center justify-center w-60"
                >
                  <img
                    src={detail.imgLink}
                    alt="Job Slider"
                    className="w-full h-20 object-contain"
                  />
                  <div className="w-full p-2">{detail.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border border-black my-12 rounded-2xl flex items-center justify-center flex-col lg:flex-row bg-gradient-to-tl from-blue-100 to-gray-50 mx-4 lg:mx-12">
        <div className="w-full h-[20rem] py-2 md:py-4">
          <img
            src="https://recruiterflow.com/blog/wp-content/uploads/2022/10/recruiting-challanges.png"
            alt=""
            className="w-full h-full object-contain mix-blend-darken"
          />
        </div>

        <div className="flex flex-col h-[20rem] w-full p-2">
          <h2 className="text-xl text-blue-600 font-semibold px-4 lg:my-4">
            NAV JOB PORTAL FOR EMPLOYERS
          </h2>

          <div className="my-12 px-4">
            <h1 className="text-4xl font-bold text-blue-700">Want to hire?</h1>
            <p className="mb-10 font-semibold text-gray-800">
              Find the best candidates from active job seekers at our portal!
            </p>
            <Link
              to="/"
              className="border border-blue-400 py-2 px-10 rounded-lg text-xl font-semibold text-blue-700 bg-blue-100 hover:bg-gray-200"
            >
              Post job &gt;
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-blue-300 pt-4 sm:pt-10 lg:pt-12">

        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-wrap">
            <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
              <div className="w-full sm:p-4 px-4 mb-6">
                <h1 className="title-font font-medium text-xl mb-2 text-gray-900">
                  Moon hashtag pop-up try-hard offal truffaut
                </h1>
                <div className="leading-relaxed">
                  Pour-over craft beer pug drinking vinegar live-edge gastropub,
                  keytar neutra sustainable fingerstache kickstarter.
                </div>
              </div>
              <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  2.7K
                </h2>
                <p className="leading-relaxed">Students</p>
              </div>
              <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  100+
                </h2>
                <p className="leading-relaxed">Recuiters</p>
              </div>
              <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  35
                </h2>
                <p className="leading-relaxed">Got Job</p>
              </div>
              <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  20
                </h2>
                <p className="leading-relaxed">Onborded</p>
              </div>
            </div>
            <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
              <img
                className="object-cover object-center w-full h-full"
                src={Job}
                alt="stats"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
