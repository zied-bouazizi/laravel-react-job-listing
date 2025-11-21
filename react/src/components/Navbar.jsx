import { useState } from "react";
import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-black text-white rounded-md px-3 py-2 block"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 block";

  const { userToken, setCurrentUser, setUserToken } = useStateContext();
  const isAuthenticated = !!userToken;

  const logout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setCurrentUser({});
      setUserToken(null);
    });
  };

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <NavLink className="flex items-center" to="/">
            <img className="h-10 w-auto" src={logo} alt="Job Listing" />
            <span className="hidden md:block text-white text-2xl font-bold ml-2">
              Job Listing
            </span>
          </NavLink>

          {/* Hamburger Button (Mobile) */}
          <button
            className="md:hidden text-white text-3xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-3 ml-auto">
            {isAuthenticated ? (
              <>
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/jobs" className={linkClass}>
                  Jobs
                </NavLink>
                <NavLink to="/add-job" className={linkClass}>
                  Add Job
                </NavLink>
                <NavLink to="/manage-jobs" className={linkClass}>
                  Manage Jobs
                </NavLink>
                <NavLink to="/profile" className={linkClass}>
                  Profile
                </NavLink>
                <button
                  onClick={(ev) => logout(ev)}
                  className="text-white hover:bg-gray-900 rounded-md px-3 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/jobs" className={linkClass}>
                  Jobs
                </NavLink>
                <NavLink to="/login" className={linkClass}>
                  Login
                </NavLink>
                <NavLink to="/register" className={linkClass}>
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4 space-y-2">
            {isAuthenticated ? (
              <>
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/jobs" className={linkClass}>
                  Jobs
                </NavLink>
                <NavLink to="/add-job" className={linkClass}>
                  Add Job
                </NavLink>
                <NavLink to="/manage-jobs" className={linkClass}>
                  Manage Jobs
                </NavLink>
                <NavLink to="/profile" className={linkClass}>
                  Profile
                </NavLink>
                <button
                  onClick={(ev) => logout(ev)}
                  className="text-white hover:bg-gray-900 rounded-md px-3 py-2 w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/jobs" className={linkClass}>
                  Jobs
                </NavLink>
                <NavLink to="/login" className={linkClass}>
                  Login
                </NavLink>
                <NavLink to="/register" className={linkClass}>
                  Register
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
