import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [open, setOpen] = useState(false);
    const [isCartOpen, setCartOpen] = useState(false);

    const getClose = () => {
        if (open) {
            setOpen(false);
        }
        if (isCartOpen) {
            setCartOpen(false);
        }
    }

    let navLinks = [
        { name: "Home", link: "/" },
        { name: "Jobs", link: "/jobs" },
        { name: "Application", link: "/application" },
        { name: "Profile", link: "/profile" }
    ];

    return (
        <>
            <section className='bg-blue-700 text-gray-200 sticky top-0 left-0 w-full z-50 p-4'>

                <div className={`lg:flex items-center justify-between lg:px-3`}>
                    <div className='flex items-center justify-center text-lg'>
                        <Link to="/" className="hidden mr-4 lg:flex title-font font-medium items-center justify-center md:mb-0">
                            <div className="relative lg:cursor-pointer ml-3 text-xl overflow-hidden group"><span className="invisible">NavJob Portal</span><span className="absolute top-0 left-0 group-hover:-translate-y-full transition-transform ease-in-out duration-500 hover:duration-300">NavJob Portal</span><span className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform ease-in-out duration-500 hover:duration-300">NavJob Portal</span></div>
                        </Link>

                        <nav className={`lg:flex hidden text-center lg:w-auto lg:pt-0 absolute lg:static border-l-2 border-blue-500`}>

                            {
                                navLinks.map((myLink) => (
                                    <li key={myLink.name} className='lg:ml-4 xl:ml-7 lg:my-0 my-3 list-none relative after:absolute after:bg-blue-500 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 lg:hover:after:origin-bottom-left lg:hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 lg:cursor-pointer'>
                                        <Link onClick={getClose} to={myLink.link}>{myLink.name}</Link>
                                    </li>
                                ))
                            }

                        </nav>

                    </div>

                    <div className='flex justify-between items-center lg:hidden font-bold cursor-default p-1 px-3'>
                        <Link to="/" className="myIcon flex items-center justify-center space-x-1" onClick={getClose}>
                            <span className='text-lg font-serif' id="spanHeading">NavJob Portal</span>
                        </Link>

                        <div className='lg:hidden flex items-center justify-center space-x-6'>
                            <Link to="/"><i className="fa fa-search" aria-hidden="true"></i></Link>

                            <svg onClick={() => { setOpen(!open) }} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>


                    <div className='lg:flex hidden'>

                        <div className='flex items-center justify-between space-x-10'>

                            <Link to="/login" className='border px-2 py-1 rounded-lg hover:bg-blue-800'>
                                Login
                            </Link>
                            <Link to="/signup" className='border px-2 py-1 rounded-lg hover:bg-blue-800'>
                                Signup
                            </Link>

                        </div>

                    </div>

                </div>

                <div className={`fixed top-0 right-0 w-full h-full transform ${open ? '-translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out flex backdrop-blur-[1.5px] text-gray-700`}
                >

                    <div className='bg-gray-100 w-[80%] overflow-y-auto'>
                        <Link to="/userlogin" onClick={getClose} className='flex items-center justify-between bg-blue-500 z-20 p-6 sticky top-0 left-0'>
                            <div className="flex items-center justify-center space-x-2">
                                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" className='w-10 h-10'/>
                                <h2 className="text-2xl font-semibold w-full">Guest User</h2>

                            </div>
                        </Link>

                        <div>
                            <div onClick={getClose} className='flex flex-col justify-center font-medium bg-gray-100'>

                                {
                                    navLinks.map((myLink, index) => (
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