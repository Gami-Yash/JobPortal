import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-teal-500 p-2 mt-0 w-full">
      <div className="container mx-auto flex flex-wrap items-center">
        <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
          <a
            className="text-white no-underline hover:text-white hover:no-underline"
            href="/"
          >
            <span className="text-2xl pl-2">
              <i className="em em-grinning"></i> Job Lelo
            </span>
          </a>
        </div>
        <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
            <li className="mr-3">
              <a
                className="inline-block py-2 px-4 text-white no-underline"
                href="/home"
              >
                Home
              </a>
            </li>
            <li className="mr-3">
              <a
                className="inline-block py-2 px-4 text-white no-underline"
                href="/jobs"
              >
                Jobs
              </a>
            </li>
            <li className="mr-3">
              <a
                className="inline-block py-2 px-4 text-white no-underline"
                href="/profile"
              >
                User Profile
              </a>
            </li>
            <li className="mr-3">
              <button
                className="inline-block bg-teal-800 text-white font-bold py-2 px-4 rounded border border-transparent hover:bg-gray-800 hover:border-teal-500 transition-colors duration-300"
                onClick={() => alert("Logout")}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;