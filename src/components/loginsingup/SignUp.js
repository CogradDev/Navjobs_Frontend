import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiList from '../../libs/apiLists';

const Signup = () => {

    const [signupDetails, setSignupDetails] = useState({
        type: "applicant",
        uName: "",
        uEmail: "",
        password: "",
        confirmPassword: "",
        otp: "",
        bio: "",
        phone: "",
        resume: "",
        profile: "",
        education: [],
        skills: []
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isOTPSend, setIsOTPSend] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleChange = (key, value) => {
        setSignupDetails({
            ...signupDetails,
            [key]: value
        });
    };

    const handleApplicant = async () => {
        const response = await fetch(apiList.signup, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: signupDetails.uName, email: signupDetails.uEmail, password: signupDetails.password, type: signupDetails.type, resume: signupDetails.resume, profile: signupDetails.profile, education: signupDetails.education, skills: signupDetails.skills, rating: -1 })
        });

        return response;
    }

    const handleRecruiter = async () => {
        const response = await fetch(apiList.signup, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: signupDetails.uName, email: signupDetails.uEmail, password: signupDetails.password, type: signupDetails.type, contactNumber: "+91" + signupDetails.phone, bio: signupDetails.bio })
        });

        return response;
    }

    const handleLogin = async () => {
        if (!signupDetails.uName) {
            return toast.warn('Please Enter User Name');
        }

        else if (!signupDetails.password) {
            return toast.warn('Please enter the password');
        }

        else if (signupDetails.password.length < 8) {
            return toast.warn('Password should be of 8 characters');
        }

        else if (!signupDetails.confirmPassword) {
            return toast.warn('Please fill the confirm password section');
        }

        else if (signupDetails.password !== signupDetails.confirmPassword) {
            return toast.warn('Confirm Password do not match !');
        }

        else if (!signupDetails.phone || signupDetails.phone.length < 10 || signupDetails.phone.length > 10) {
            return toast.warn("Enter 10 digits phone number");
        }

        try {
            if (!isClicked) {
                setIsClicked(true);

                if (!isOTPSend) {
                    let response = null;
                    try {
                        if(signupDetails.type === "applicant"){
                            response = await handleApplicant();
                        }
                        else{
                            response = await handleRecruiter();
                        }

                        const json = await response.json();
                        if (json.success) {
                            toast.success(`OTP send to ${signupDetails.uEmail}`);
                            setIsClicked(false);
                            setIsOTPSend(!isOTPSend);
                        }
                        else {
                            toast.error(json.message);
                            setIsClicked(false);
                        }

                    }
                    catch (err) {
                        toast.warn("Internal Server Error");
                        setIsClicked(false);
                    }

                }
                else if (isOTPSend) {
                    if (!signupDetails.otp) {
                        setIsClicked(false);
                        return toast.warn("Enter the otp");
                    }

                    try {
                        const response = await fetch(apiList.verifyotp, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ email: signupDetails.uEmail, otp: signupDetails.otp })
                        });

                        const json = await response.json();
                        if (json.success) {
                            toast.success("Otp verified successfully");
                            localStorage.setItem('token', json.token);
                            localStorage.setItem('type', json.type);
                            setIsClicked(false);
                        }
                        else {
                            toast.warn(json.message);
                            setIsClicked(false);
                        }

                    }
                    catch (err) {
                        toast.error("Some Error occured.");
                        setIsClicked(false);
                    }
                }
            }

        }
        catch (err) {
            toast.error('Internal Server Error Occured.');
            setIsClicked(false);
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className={`max-w-md w-full space-y-8 shadow-lg rounded-xl p-4 pb-8`}>
                <div className='space-y-2'>
                    <div className="flex justify-center mt-2">
                        <div className="w-16 h-16 overflow-hidden rounded-full shadow-lg shadow-black">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <h2 className={`text-center text-3xl font-extrabold`}>Sign up for an account</h2>
                    <p className={`text-center`}>Or <Link to="/login" className='text-blue-500'>Login</Link></p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className={`space-y-2`}>

                        <div className="flex items-center justify-center space-x-4">
                            <div className="flex items-center mr-4">
                                <input
                                    type="radio"
                                    id="applicant"
                                    name="option"
                                    value="applicant"
                                    checked={signupDetails.type === 'applicant'}
                                    onChange={(event) => handleChange('type', event.target.value)}
                                    className="form-radio h-4 w-4 text-blue-700"
                                />
                                <label htmlFor="applicant" className="ml-2 text-sm text-gray-700 cursor-pointer">Applicant</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="recruiter"
                                    name="option"
                                    value="recruiter"
                                    checked={signupDetails.type === 'recruiter'}
                                    onChange={(event) => handleChange('type', event.target.value)}
                                    className="form-radio h-4 w-4 text-blue-700"
                                />
                                <label htmlFor="recruiter" className="ml-2 text-sm text-gray-700 cursor-pointer">Recruiter</label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="signupDetails.uName" className="block ml-1">
                                Name
                            </label>
                            <input
                                id="signupDetails.uName"
                                name="signupDetails.uName"
                                type="text"
                                autoComplete="signupDetails.uName"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter Your Name"
                                value={signupDetails.uName}
                                onChange={(event) => handleChange('uName', event.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="phone" className="block ml-1">Email</label>
                            <div className='flex'>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Enter your email address"
                                    className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                    value={signupDetails.uEmail}
                                    onChange={(event) => handleChange('uEmail', event.target.value)}
                                />
                            </div>
                        </div>

                        <div className='relative'>
                            <label htmlFor="password" className="block ml-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter Password"
                                value={signupDetails.password}
                                onChange={(event) => handleChange('password', event.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 top-6 right-5 flex items-center focus:outline-none z-10 text-black"
                                onClick={() => { setShowPassword(!showPassword) }}
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
                                ) : (<img src='https://static-00.iconduck.com/assets.00/eye-password-hide-icon-512x512-iv45hct9.png' alt='eye-close' className='w-5 h-5' />)
                                }
                            </button>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block ml-1">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter password again"
                                value={signupDetails.confirmPassword}
                                onChange={(event) => handleChange('confirmPassword', event.target.value)}
                            />
                        </div>

                        {
                            signupDetails.type === "applicant" ?
                                <div className='space-y-2'>
                                    <div>
                                        <label htmlFor="resume" className="block ml-1">
                                            Resume
                                        </label>
                                        <input
                                            id="resume"
                                            name="resume"
                                            type="file"
                                            required
                                            placeholder="Enter password again"
                                            value={signupDetails.resume}
                                            onChange={(event) => handleChange('confirmPassword', event.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="image" className="block ml-1">
                                            Image
                                        </label>
                                        <input
                                            id="image"
                                            name="image"
                                            type="file"
                                            required
                                            placeholder="Enter password again"
                                            value={signupDetails.image}
                                            onChange={(event) => handleChange('image', event.target.value)}
                                        />
                                    </div>
                                </div> :
                                <div className='space-y-2'>
                                    <div>
                                        <label htmlFor="confirmPassword" className="block ml-1">
                                            Bio
                                        </label>
                                        <textarea id="bio"
                                            name="bio"
                                            type="text"
                                            required
                                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Bio (upto 250 words)"
                                            value={signupDetails.bio}
                                            onChange={(event) => handleChange('bio', event.target.value)} />
                                    </div>

                                    <div className='relative'>
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
                                            onChange={(event) => handleChange('phone', event.target.value)}
                                        />
                                        <div className='absolute inset-y-0 top-6 left-1 flex items-center focus:outline-none z-10 text-black"'>
                                            📱+91
                                        </div>
                                    </div>
                                </div>
                        }


                        <div>
                            <label htmlFor="otp" className="block ml-1">
                                OTP
                            </label>
                            <input
                                id="otp"
                                name="confirmPassword"
                                type="number"
                                autoComplete="new-password"
                                required
                                disabled={!isOTPSend}
                                className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${isOTPSend ? "cursor-auto" : "cursor-not-allowed"}`}
                                placeholder="Enter the otp"
                                value={signupDetails.otp}
                                onChange={(event) => handleChange('otp', event.target.value)}
                            />
                        </div>

                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`${isClicked ? "animate-pulse" : "animate-none"} group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 space-x-2`}
                            onClick={handleLogin}
                        >
                            {
                                isOTPSend ? <span>Verify OTP and Create Account</span> : <span>Send OTP on Email</span>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;