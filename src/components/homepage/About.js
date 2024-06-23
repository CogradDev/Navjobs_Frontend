import React, { useEffect } from "react";
import Carousel from "./Carousel";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section class="text-gray-600 body-font relative">
      <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-6xl flex justify-center font-semibold text-transparent mt-9 lg:w-[95%] ">
        About Us
      </h1>
      {/* <div className='flex items-center justify-center'>
                    <p className='xl:w-4/6 w-full lg:text-center'>Nav Job Portal is a leading online platform designed to revolutionize the way employers and job seekers connect. Founded on the principle of empowering individuals to find their ideal career paths, we strive to create a seamless and efficient recruitment experience for all users.</p>
                </div> */}
      <div className=" text-xl md:text-4xl font-semibold mx-auto mt-9 py-5 pb-20 text-center text-blue-600">
        Nav Job Portal is a leading online platform
        <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
          {" "}
          designed to revolutionize
        </span>
        the way employers and job seekers connect.
        <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
          Founded on the principle of empowering individuals to find their ideal
          career paths, we strive to create a seamless and efficient recruitment
          experience for all users.
        </span>
      </div>
      <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-center">
        <div className="my-24 flex lg:w-[40%] flex-col gap-10">
          <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
            Our Vision
          </h1>
          <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
            At Nav Job Portal, we believe in the transformative power of
            employment. Whether you're a seasoned professional seeking new
            challenges or a recent graduate embarking on your career journey,
            we're here to support you every step of the way. Join us today and
            embark on a journey toward success with Nav Job Portal.
          </p>
        </div>
        <div className="my-24 flex lg:w-[40%] flex-col gap-10">
          <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
            Our Mission
          </h1>
          <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
            Our mission is to provide a dynamic and inclusive space where
            recruiters can post job openings, and applicants can discover and
            apply for opportunities that align with their skills and
            aspirations. With innovative features and cutting-edge technology,
            Nav Job Portal facilitates meaningful connections between employers
            and talented professionals.
          </p>
        </div>
      </div>
      <Carousel />

      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="text-6xl mb-5 bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
            Contact Us
          </h1>
          <p class="lg:w-2/3 mx-auto text-2xl ">
            For any inquiries or support, please reach out to us at
            [email/contact form]. Our team is here to assist you with all your
            job portal needs.
          </p>
        </div>
        <div class="lg:w-1/2 md:w-2/3 mx-auto">
          <div class="flex flex-wrap -m-2">
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="name" class="leading-7 text-2xl text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="email" class="leading-7 text-2xl text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-full">
              <div class="relative">
                <label for="message" class="leading-7 text-2xl text-gray-600">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div class="p-2 w-full">
              <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Button
              </button>
            </div>
            <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
              <a class="text-indigo-500">example@email.com</a>
              <p class="leading-normal my-5">
                49 Smith St. Saint Cloud, MN 56301
                {/* <br>Saint Cloud, MN 56301<br/> */}
              </p>
              <span class="inline-flex">
                <a class="text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a class="ml-4 text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a class="ml-4 text-gray-500">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
                <a class="ml-4 text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
