import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
import { toast } from 'react-toastify';

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const [isCartOpen, setCartOpen] = useState(false);

    const context = useContext(authContext);
    const { islogedin, userType, setIsloggedin, setUserType } = context;

    const navigate = useNavigate();

    useEffect(() => {
        setIsloggedin(localStorage.getItem("token"));
        setUserType(localStorage.getItem("type"));
    })

    const [open, setOpen] = useState(false);
    const [isCartOpen, setCartOpen] = useState(false);

	let navLinks = [
		{ name: 'Home', link: '/' },
		{ name: 'Add Jobs', link: '/addjobs' },
		{ name: 'Application', link: '/application' },
		{ name: 'Profile', link: '/hr-profile' }
	];

    let recruiterLink = [
        { name: "Home", link: "/" },
        { name: "Add Jobs", link: "/addjobs" },
        { name: "Application", link: "/application" },
        { name: "Profile", link: "/profile" }
    ];

    let applicantLink = [
        { name: "Home", link: "/" },
        { name: "Jobs", link: "/addjobs" },
        { name: "Profile", link: "/profile" }
    ];

    const handleLogout = () => {
        localStorage.removeItem("type");
        localStorage.removeItem("token");
        setIsloggedin(localStorage.getItem("token"));
        setUserType(localStorage.getItem("type"));
        toast.success("Logged out successfully");
        navigate("/");
    }

    return (
        <>
            <section className='bg-blue-700 text-gray-200 sticky top-0 left-0 w-full z-50 p-4'>

					<div className="flex justify-between items-center lg:hidden font-bold cursor-default p-1 px-3">
						<Link
							to="/"
							className="myIcon flex items-center justify-center space-x-1"
							onClick={getClose}
						>
							<span className="text-lg font-serif" id="spanHeading">
								NavJob Portal
							</span>
						</Link>

						<div className="lg:hidden flex items-center justify-center space-x-6">
							<Link to="/">
								<i className="fa fa-search" aria-hidden="true"></i>
							</Link>

                            {
                                islogedin ? (
                                    userType === "recruiter" ? (
                                        recruiterLink.map((myLink) => (
                                            <li key={myLink.name} className='lg:ml-4 xl:ml-7 lg:my-0 my-3 list-none relative after:absolute after:bg-blue-500 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 lg:hover:after:origin-bottom-left lg:hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 lg:cursor-pointer'>
                                                <Link onClick={getClose} to={myLink.link}>{myLink.name}</Link>
                                            </li>
                                        ))
                                    ) : (
                                        applicantLink.map((myLink) => (
                                            <li key={myLink.name} className='lg:ml-4 xl:ml-7 lg:my-0 my-3 list-none relative after:absolute after:bg-blue-500 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 lg:hover:after:origin-bottom-left lg:hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 lg:cursor-pointer'>
                                                <Link onClick={getClose} to={myLink.link}>{myLink.name}</Link>
                                            </li>
                                        ))
                                    )

                                ) : (
                                    <div>
                                        <Link to="/" className='lg:ml-4 xl:ml-7 lg:my-0 my-3 list-none relative after:absolute after:bg-blue-500 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 lg:hover:after:origin-bottom-left lg:hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 lg:cursor-pointer'>
                                            Home
                                        </Link>
                                        <Link to="/" className='lg:ml-4 xl:ml-7 lg:my-0 my-3 list-none relative after:absolute after:bg-blue-500 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 lg:hover:after:origin-bottom-left lg:hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 lg:cursor-pointer'>
                                            About
                                        </Link>
                                    </div>
                                )

                            }

					<div className="lg:flex hidden">
						<div className="flex items-center justify-between space-x-10">
							<Link to="/login" className="border px-2 py-1 rounded-lg hover:bg-blue-800">
								Login
							</Link>
							<Link to="/signup" className="border px-2 py-1 rounded-lg hover:bg-blue-800">
								Signup
							</Link>
						</div>
					</div>
				</div>

				<div
					className={`fixed top-0 right-0 w-full h-full transform ${
						open ? '-translate-x-0' : '-translate-x-full'
					} transition-transform duration-200 ease-in-out flex backdrop-blur-[1.5px] text-gray-700`}
				>
					<div className="bg-gray-100 w-[80%] overflow-y-auto">
						<Link
							to="/userlogin"
							onClick={getClose}
							className="flex items-center justify-between bg-blue-500 z-20 p-6 sticky top-0 left-0"
						>
							<div className="flex items-center justify-center space-x-2">
								<img
									src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
									alt=""
									className="w-10 h-10"
								/>
								<h2 className="text-2xl font-semibold w-full">Guest User</h2>
							</div>
						</Link>

                    <div className='flex justify-between items-center lg:hidden font-bold cursor-default'>
                        <Link to="/" className="myIcon flex items-center justify-center space-x-1" onClick={getClose}>
                            <span className='text-lg font-serif' id="spanHeading">NavJob Portal</span>
                        </Link>

                        <div className='lg:hidden flex items-center justify-center space-x-6'>
                            {
                                islogedin ? <div>
                                    <button className='border px-2 py-1 rounded-lg hover:bg-blue-800 text-sm font-normal' onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div> :
                                    <div>
                                        <Link to="/login" className='border px-2 py-1 rounded-lg hover:bg-blue-800 text-sm font-normal'>
                                            Login
                                        </Link>
                                    </div>
                            }

					<div className="h-full w-[20%]" onClick={getClose}></div>
				</div>
			</section>
		</>
	);
};


                    <div className='lg:flex hidden'>

                        {
                            !islogedin ?
                                <div className='flex items-center justify-between space-x-10'>

                                    <Link to="/login" className='border px-2 py-1 rounded-lg hover:bg-blue-800'>
                                        Login
                                    </Link>
                                    <Link to="/signup" className='border px-2 py-1 rounded-lg hover:bg-blue-800'>
                                        Signup
                                    </Link>

                                </div> :
                                <button className='border px-2 py-1 rounded-lg hover:bg-blue-800' onClick={handleLogout}>
                                    Logout
                                </button>
                        }

                    </div>

                </div>

                <div className={`fixed top-0 right-0 w-full h-full transform ${open ? '-translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out flex backdrop-blur-[1.5px] text-gray-700`}
                >

                    <div className='bg-gray-100 w-[80%] overflow-y-auto'>
                        <Link to="/userlogin" onClick={getClose} className='flex items-center justify-between bg-blue-500 z-20 p-6 sticky top-0 left-0'>
                            <div className="flex items-center justify-center space-x-2">
                                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" className='w-10 h-10' />
                                <h2 className="text-2xl font-semibold w-full">Guest User</h2>

                            </div>
                        </Link>

                        <div>
                            <div onClick={getClose} className='flex flex-col justify-center font-medium bg-gray-100'>

                                {
                                    islogedin ? (
                                        userType === "recruiter" ? (
                                            recruiterLink.map((myLink, index) => (
                                                <Link key={index} to={myLink.link} className={`flex items-center justify-between p-4 border-b border-gray-300`}>
                                                    <div className='flex items-center space-x-4'>
                                                        <span className='text-xl'>{myLink.name}</span>
                                                    </div>

                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                            <path d="M18.59 13.41l-6-6c-.39-.39-1.03-.39-1.42 0-.39.39-.39 1.02 0 1.41L15.17 12l-4.59 4.59c-.39.39-.39 1.02 0 1.41.39.39 1.03.39 1.42 0l6-6c.39-.39.39-1.02 0-1.41z" />
                                                        </svg>


                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            applicantLink.map((myLink, index) => (
                                                <Link key={index} to={myLink.link} className={`flex items-center justify-between p-4 border-b border-gray-300`}>
                                                    <div className='flex items-center space-x-4'>
                                                        <span className='text-xl'>{myLink.name}</span>
                                                    </div>

                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                            <path d="M18.59 13.41l-6-6c-.39-.39-1.03-.39-1.42 0-.39.39-.39 1.02 0 1.41L15.17 12l-4.59 4.59c-.39.39-.39 1.02 0 1.41.39.39 1.03.39 1.42 0l6-6c.39-.39.39-1.02 0-1.41z" />
                                                        </svg>


                                                    </div>
                                                </Link>
                                            ))
                                        )

                                    ) : (
                                        <div>
                                            <Link to="/" className={`flex items-center justify-between p-4 border-b border-gray-300`}>
                                                <div className='flex items-center space-x-4'>
                                                    <span className='text-xl'>Home</span>
                                                </div>

                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                        <path d="M18.59 13.41l-6-6c-.39-.39-1.03-.39-1.42 0-.39.39-.39 1.02 0 1.41L15.17 12l-4.59 4.59c-.39.39-.39 1.02 0 1.41.39.39 1.03.39 1.42 0l6-6c.39-.39.39-1.02 0-1.41z" />
                                                    </svg>


                                                </div>
                                            </Link>
                                            <Link to="/" className={`flex items-center justify-between p-4 border-b border-gray-300`}>
                                                <div className='flex items-center space-x-4'>
                                                    <span className='text-xl'>About</span>
                                                </div>

                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                        <path d="M18.59 13.41l-6-6c-.39-.39-1.03-.39-1.42 0-.39.39-.39 1.02 0 1.41L15.17 12l-4.59 4.59c-.39.39-.39 1.02 0 1.41.39.39 1.03.39 1.42 0l6-6c.39-.39.39-1.02 0-1.41z" />
                                                    </svg>


                                                </div>
                                            </Link>
                                        </div>
                                    )

                                }
                            </div>
                        </div>
                    </div>

                    <div className='h-full w-[20%]' onClick={getClose}></div>

                </div>

            </section>
        </>
    )
}

export default Navbar;
