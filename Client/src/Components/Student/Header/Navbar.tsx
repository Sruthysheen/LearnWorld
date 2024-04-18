import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { studentLogout } from '../../../Utils/config/axios.PostMethods';
import { logout } from '../../../Slices/studentSlice/studentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

function Navbar() {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { student } = useSelector((state: any) => state.student);

  useEffect(() => {
    const data = localStorage.getItem('Token');
    const isVerified = localStorage.getItem('isVerified');
    if (data && isVerified) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [student, isLogout]);

  const handleLogout = async () => {
    try {
      const response: any = await studentLogout();
      console.log(response, 'THIS IS RESPONSE');

      if (response.status === 200) {
        localStorage.removeItem('Token');
        localStorage.removeItem('isVerified');
        dispatch(logout());
        setIsLogout(!isLogout);
      } else {
        toast.error('Something went wrong..!');
      }
    } catch (error) {
      console.log('Logout error', error);
    }
  };

  const handleSearch = () => {
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <>
       <nav className="border-t-4 bg-indigo-100">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between">
        <div className="flex space-x-7">
          <div>
            <a href="#" className="flex items-center py-4 px-2">
              <img
                src="public/Logo.png"
                alt="Logo"
                className="rounded-full h-8 w-8 mr-2"
              />

                  <span className="font-semibold text-sky-800 text-2xl">
                    LearnWorld
                  </span>
                </a>
              </div>
            </div>
              {/* Search Bar */}
              <div className="hidden md:flex items-center space-x-1">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="border border-blue-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-sky-500 bg-white"
              />
              <button
                onClick={handleSearch}
                className="bg-sky-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition duration-300"
              >
                Search
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="" className="py-4 px-2 text-sky-800 font-semibold">
                Home
              </a>
              <a href="" className="py-4 px-2 text-sky-800 font-semibold">
                Courses
              </a>
              <Link to="/tutor/tutorregister" className="py-4 px-2 text-sky-800 font-semibold">
                For Instructor
              </Link>
              <a href="" className="py-4 px-2 text-sky-800 font-semibold">
                Blog
              </a>
             
               
              {loggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-sky-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition duration-300"
                >
                  Logout
                </button>
              ) :(
              <>
              <Link
                to="/register"
                className="bg-sky-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition duration-300"
              >
                SignUp
              </Link>
              <Link
                to="/login"
                className="bg-sky-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition duration-300"
              >
                SignIn
              </Link>
              </>
              )}
                

            </div>
           
            <div className="mr-10 flex md:hidden">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="inline-flex items-center justify-center p-2 rounded-md text-dark"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path>
                </svg>
              </button>
            </div>
          
          </div>
        </div>
        {showMenu && (
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 md:hidden">
            <a
              href=""
              className="cursor-pointer text-blue-500 block px-3 py-2 hover:text-blue-500 rounded-md text-base font-medium transition duration-300"
            >
              Home{' '}
            </a>
            <a
              href=""
              className="cursor-pointer text-blue-500 block px-3 py-2 hover:text-blue-500 rounded-md text-base font-medium transition duration-300"
            >
              Courses{' '}
            </a>
            <a
              href=""
              className="cursor-pointer text-blue-500 block px-3 py-2 hover:text-blue-500 rounded-md text-base font-medium transition duration-300"
            >
              For Instructor{' '}
            </a>
            <a
              href=""
              className="cursor-pointer text-blue-500 block px-3 py-2 hover:text-blue-500 rounded-md text-base font-medium transition duration-300"
            >
              Blog{' '}
            </a>
            <Link
              to="/register"
              className="cursor-pointer bg-purple-600 text-white block px-3 py-2 hover:bg-purple-800 rounded-md text-base font-medium transition duration-300"
            >
              SignUp
            </Link>
            <a
              href="/login"
              className="cursor-pointer bg-purple-600 text-white block px-3 py-2 hover:bg-purple-800 rounded-md text-base font-medium transition duration-300"
            >
              SignIn
            </a>
          </div>
        )}
      </nav>
    </>
  );

}

export default Navbar;
