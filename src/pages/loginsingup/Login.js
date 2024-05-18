import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginImg from "../../Images/Login-bro.png"
import apiList from "../../libs/apiLists";

const Login = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        return toast.warn("Please enter the email address");
      } else if (email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
          return toast.warn("Enter a valid Email type.");
        }
      }

      if (!password) {
        return toast.warn("Please enter the password");
      } else if (password.length < 8) {
        return toast.warn("Password should be of 8 characters");
      }

      if (!isClicked) {
        setIsClicked(true);
        const response = await fetch(apiList.login, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        });

        const json = await response.json();

        if (json.success) {
          localStorage.setItem("jobportal", json.authtoken);

          toast.success(`Logged in successfully..!`);
          setIsClicked(false);
          localStorage.setItem("token", json.token);
          localStorage.setItem("type", json.type);

          navigate("/");
        } else {
          toast.warn(json.message);
          setIsClicked(false);
        }
      }
    } catch (err) {
      toast.error("Internal Server Error Occurred.");
      setIsClicked(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex items-center justify-center mb-4">
          <img
            src={loginImg}
            alt="Login Image"
            className="w-1/3 h-1/3 "
          />
        </div>
        <h1 className=" text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white text-blue-700 mb-4">
          Sign in to your account
        </h1>
        
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="name@company.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              autoComplete="current-password"
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
                <img
                  src="https://static-00.iconduck.com/assets.00/eye-password-hide-icon-512x512-iv45hct9.png"
                  alt="eye-close"
                  className="w-5 h-5"
                />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="remember"
                  className="text-gray-500 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
            </div>
            <Link
              to="#"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="button"
            className={`w-full my-6 px-4 py-2 font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:outline-none focus:bg-blue-600`}
            onClick={handleLogin}
          >
            {isClicked ? "Signing in..." : "Sign In"}
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link
              to="####"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
