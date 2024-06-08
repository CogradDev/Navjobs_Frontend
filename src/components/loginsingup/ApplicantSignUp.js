import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import applicantBGImage from "../Images/Resume folder-bro.png";
import apiList from "../../libs/apiLists";
import authContext from "../../context/auth/authContext";
import { server } from "../../libs/apiLists";



const ApplicantSignUp = () => {
  let navigate = useNavigate();
  const context = useContext(authContext);
  const { setIsloggedin, setUserType ,setUserData} = context;


  const [signupDetails, setSignupDetails] = useState({
    type: "applicant",
    uName: "",
    uEmail: "",
    password: "",
    confirmPassword: "",
    phone: "",
    resume: null,
    profile: null,
    education: [],
    skills: [],
    otp: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isOTPSend, setIsOTPSend] = useState(false);
  // const [isClicked, setIsClicked] = useState(false);

  const handleChange = (key, value) => {
    if (key === "resume" || key === "profile") {
      setSignupDetails({
        ...signupDetails,
        [key]: value[0],
      });
    } else {
      setSignupDetails({
        ...signupDetails,
        [key]: value,
      });
    }
  };

  const validateForm = () => {
    const { uName, uEmail, password, confirmPassword, resume, profile } =
      signupDetails;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!uName.trim()) {
      toast.warn("Please Enter User Name");
      return false;
    }
    if (!uEmail || !emailRegex.test(uEmail)) {
      toast.warn("Please Enter a valid Email");
      return false;
    }
    if (password.length < 8) {
      toast.warn("Password should be at least 8 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      toast.warn("Passwords do not match");
      return false;
    }
    if (!resume) {
      toast.warn("Please upload your resume");
      return false;
    }
    if (!profile) {
      toast.warn("Please upload your profile picture");
      return false;
    }

    return true;
  };

  const sendOTP = async () => {
    if (!validateForm()) return;
    try {
      const response = await fetch(apiList.sendotp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signupDetails.uEmail,
        }),
      });

      const json = await response.json();

      if (json.success) {
        setIsOTPSend(true);
        toast.success("OTP sent successfully");
      } else {
        toast.error(json.message || "Error sending OTP");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      toast.error("Failed to send OTP");
    }
  };

  const handleApplicant = async () => {
    try {
      const formData = new FormData();
      formData.append("name", signupDetails.uName);
      formData.append("email", signupDetails.uEmail);
      formData.append("password", signupDetails.password);
      formData.append("type", signupDetails.type);
      formData.append("resume", signupDetails.resume);
      formData.append("profile", signupDetails.profile);
      formData.append("education", JSON.stringify(signupDetails.education));
      formData.append("skills", JSON.stringify(signupDetails.skills));
      formData.append("rating", -1);

      const response = await fetch(apiList.signup, {
        method: "POST",
        body: formData,
      });

      return response;
    } catch (err) {
      console.error("Error signing up applicant:", err);
      throw new Error("Internal Server Error");
    }
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      const otpVerificationResponse = await fetch(apiList.verifyotp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signupDetails.uEmail,
          otp: signupDetails.otp,
        }),
      });

      const otpVerificationJson = await otpVerificationResponse.json();

      if (otpVerificationJson.success) {
        const response = await handleApplicant();
        const json = await response.json();
        if (json.success) {
          toast.success(
            `Applicant account created for ${signupDetails.uEmail}`
          );
          // Redirect or handle success as needed
          setIsloggedin(true);
          setUserType(json.type);
          setUserData({
            profilePhoto : `${server}${json.userData.profile.replace("./", "/")}`,
            username : json.userData.name
          });
          localStorage.setItem("token", json.token);
          localStorage.setItem("type", json.type);
          localStorage.setItem("user", JSON.stringify({
            profilePhoto: `${server}${json.userData.profile.replace("./", "/")}`,
            username: json.userData.name,
        }));
        
       
          navigate("/");
        } else {
          toast.error(json.message || "Error signing up applicant");
        }
      } else {
        toast.warn("OTP verification failed. Please enter the correct OTP.");
      }
    } catch (err) {
      console.error("Error signing up applicant:", err);
      toast.error("Internal Server Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-xl flex">
        <div className="w-1/2 hidden lg:block">
          <img
            //src="https://source.unsplash.com/random/800x600"
            src={applicantBGImage}
            alt="Sign Up"
            className="w-full h-full object-contain rounded-l-xl"
          />
        </div>
        <div className="w-full lg:w-1/2 p-8 space-y-8">
          <div className="space-y-2">
            <h2 className="text-center text-3xl font-extrabold text-blue-700">
              Applicant Sign up
            </h2>
            <p className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-700 hover:underline">
                Login
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="uName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="uName"
                  name="uName"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-blue-700 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                  placeholder="Enter Your Name"
                  value={signupDetails.uName}
                  onChange={(e) => handleChange("uName", e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="uEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="uEmail"
                  name="uEmail"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-blue-700 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                  placeholder="Enter Your Email"
                  value={signupDetails.uEmail}
                  onChange={(e) => handleChange("uEmail", e.target.value)}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-blue-700 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                  placeholder="Enter Password"
                  value={signupDetails.password}
                  onChange={(event) =>
                    handleChange("password", event.target.value)
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 top-6 right-5 flex items-center focus:outline-none z-10 text-black"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2 12s5.5-10 12-10 12 10 12 10-5.5 10-12 10-12-10-12-10z"
                      />
                    </svg>
                  ) : (
                    <img
                      src="https://static-00.iconduck.com/assets.00/eye-password-hide-icon-512x512-iv45hct9.png"
                      alt="eye-close"
                      className="w-5 h-5"
                    />
                  )}
                </button>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-blue-700 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  value={signupDetails.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="resume"
                  className="block text-sm font-medium text-gray-700"
                >
                  Resume
                </label>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-blue-700 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                  onChange={(e) => handleChange("resume", e.target.files)}
                />
              </div>
              <div>
                <label
                  htmlFor="profile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image
                </label>
                <input
                  id="profile"
                  name="profile"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-blue-700 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                  onChange={(e) => handleChange("profile", e.target.files)}
                />
              </div>
              {isOTPSend && (
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    OTP
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    autoComplete="one-time-code"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-blue-700 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                    placeholder="Enter OTP"
                    value={signupDetails.otp}
                    onChange={(e) => handleChange("otp", e.target.value)}
                  />
                </div>
              )}
              <div>
                <button
                  type="button"
                  className={`${
                    isOTPSend ? "animate-pulse" : "animate-none"
                  } group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 space-x-2`}
                  onClick={isOTPSend ? handleSignup : sendOTP}
                >
                  {isOTPSend
                    ? "Verify OTP and Create Account"
                    : "Send OTP on Email"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicantSignUp;
