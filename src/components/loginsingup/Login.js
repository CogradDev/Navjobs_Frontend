import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiList from '../../libs/apiLists';
import authContext from '../../context/auth/authContext';

const Login = () => {

    let navigate = useNavigate();
    const context = useContext(authContext);
    const { setIsloggedin, setUserType } = context;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        try {
            if (!email) {
                return toast.warn('Please enter the email address');
            }
            else if (email) {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regex.test(email)) {
                    return toast.warn("Enter a valid Email type.");
                }
            }

            if (!password) {
                return toast.warn('Please enter the password');
            }

            else if (password.length < 8) {
                return toast.warn('Password should be of 8 characters');
            }

            if (!isClicked) {
                setIsClicked(true);
                const response = await fetch(apiList.login, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email, password: password })
                });

                const json = await response.json();

                if (json.success) {
                    setIsClicked(false);
                    toast.success(`Logged in successfully..!`);
                    setIsloggedin(true);
                    setUserType(json.type);
                    localStorage.setItem('token', json.token);
                    localStorage.setItem('type', json.type);

                    navigate("/");
                }
                else {
                    toast.warn(json.message);
                    setIsClicked(false);
                }
            }
        }
        catch (err) {
            toast.error('Internal Server Error Occured.');
            setIsClicked(false);
        }

    };

    return (
        <div className={`h-[38rem] flex items-center justify-center px-4`}>
            <div className={`max-w-md w-full p-4 space-y-4 shadow-lg rounded-xl`}>
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
                    <h2 className={`text-center text-3xl font-extrabold`}>Sign in to your account</h2>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label htmlFor="email" className="block ml-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="Enter your email address"
                            className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="block ml-1">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                            autoComplete='password'
                            required
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 top-7 right-5 flex items-center focus:outline-none z-10 text-black"
                            onClick={togglePasswordVisibility}
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
                                <img src='https://static-00.iconduck.com/assets.00/eye-password-hide-icon-512x512-iv45hct9.png' alt='eye-close' className='w-5 h-5' />
                            )
                            }
                        </button>
                    </div>

                    <div>
                        <button
                            type="button"
                            className={`${isClicked ? "animate-pulse" : "animate-none"} w-full my-6 px-4 py-2 font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:outline-none focus:bg-blue-600`}
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default Login;