import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import apiList from "../../libs/apiLists";

const RecruiterSignUp = () => {

    let navigate = useNavigate();
    const [signupDetails, setSignupDetails] = useState({
        type: "recruiter",
        uName: "",
        uEmail: "",
        password: "",
        confirmPassword: "",
        bio: "",
        phone: "",
        otp: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isOTPSend, setIsOTPSend] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleChange = (key, value) => {
        setSignupDetails({
            ...signupDetails,
            [key]: value,
        });
    };

    const validateForm = () => {
        const { uName, uEmail, password, confirmPassword, phone } = signupDetails;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

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
        if (!phoneRegex.test(phone)) {
            toast.warn("Enter a valid 10-digit phone number");
            return false;
        }

        return true;
    };

    const sendOTP = async () => {
        if (!validateForm()) return;
        setIsClicked(true);
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
                setIsClicked(false);
                toast.success("OTP sent successfully");
            } else {
                toast.error(json.message || "Error sending OTP");
                setIsClicked(false);
            }
        } catch (err) {
            setIsClicked(false);
            toast.error("Failed to send OTP");
        }
    };

    const handleSignup = async () => {
        if (!validateForm()) return;
        setIsClicked(true);

        try {
            const response = await fetch(apiList.verifyotp, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: signupDetails.uEmail,
                    otp: signupDetails.otp,
                }),
            });

            const json = await response.json();

            if (json.success) {
                // OTP verified, proceed with signup
                const signupResponse = await fetch(apiList.signup, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: signupDetails.uName,
                        email: signupDetails.uEmail,
                        password: signupDetails.password,
                        type: signupDetails.type,
                        contactNumber: "+91" + signupDetails.phone,
                        bio: signupDetails.bio,
                    }),
                });

                const signupJson = await signupResponse.json();

                if (signupJson.success) {
                    toast.success(
                        `Recruiter account created for ${signupDetails.uEmail}`
                    );
                    setIsClicked(false);
                    localStorage.setItem('token', signupJson.token);
                    localStorage.setItem('type', signupJson.type);
                    navigate("/");
                } else {
                    toast.error(signupJson.message || "Error signing up recruiter");
                    setIsClicked(false);
                }
            } else {
                toast.error(json.message || "Error verifying OTP");
                setIsClicked(false);
            }
        } catch (err) {
            console.error("Error signing up recruiter:", err);
            toast.error("Internal Server Error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
            <div className="max-w-5xl w-full bg-white shadow-lg rounded-xl flex">
                <div className="w-full lg:w-1/2 p-8 space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-center text-3xl font-extrabold text-blue-700">
                            Recruiter Sign up
                        </h2>
                        <p className="text-center">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-700 font-semibold">
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
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter Your Email"
                                    value={signupDetails.uEmail}
                                    onChange={(e) => handleChange("uEmail", e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="block ml-1">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Confirm Password"
                                    value={signupDetails.confirmPassword}
                                    onChange={(e) =>
                                        handleChange("confirmPassword", e.target.value)
                                    }
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="phone" className="block ml-1">
                                    Contact Number
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-14"
                                    placeholder="Enter your 10 digits contact number"
                                    value={signupDetails.phone}
                                    onChange={(event) =>
                                        handleChange("phone", event.target.value)
                                    }
                                />
                                <div className='absolute inset-y-0 top-6 left-1 flex items-center focus:outline-none z-10 text-black"'>
                                    📱+91
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="bio"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Bio
                                </label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    autoComplete="bio"
                                    required
                                    rows="3"
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Tell us about yourself (upto 250 words)"
                                    value={signupDetails.bio}
                                    onChange={(e) => handleChange("bio", e.target.value)}
                                ></textarea>
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
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter OTP"
                                        value={signupDetails.otp}
                                        onChange={(e) => handleChange("otp", e.target.value)}
                                    />
                                </div>
                            )}

                            <div>
                                <button
                                    type="button"
                                    className={`${isClicked ? "animate-pulse" : "animate-none"
                                        } group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 space-x-2`}
                                    onClick={isOTPSend ? handleSignup : sendOTP}
                                    disabled={isClicked}
                                >
                                    {isOTPSend
                                        ? "Verify OTP and Create Account"
                                        : "Send OTP on Email"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="w-1/2 hidden lg:block">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/010/872/476/non_2x/3d-online-recruitment-illustration-png.png"
                        alt="Sign Up"
                        className="w-full h-full object-contain rounded-l-xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default RecruiterSignUp;