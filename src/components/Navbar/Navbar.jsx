import React, { useContext, useEffect, useState } from "react";
import Style from "./Navbar.module.css";
import logo from "../../assets/images/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartProductContext } from "../../Context/CartProductContext";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const { userLogin, setUserLogin } = useContext(UserContext);
  const { cartCount } = useContext(CartProductContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle mobile menu
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle logout
  const logOut = () => {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
    setIsOpen(false); // Close the mobile menu after logout
  };

  return (
    <>
    <nav className="bg-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <div className="flex items-center flex-shrink-0">
          <Link to="/">
            <img src={logo} width={120} alt="fresh cart logo" />
          </Link>
        </div>
        {/* Mobile Menu Toggle Button */}
        <div className="block lg:hidden">
          <button
            onClick={handleToggle}
            className="flex items-center px-3 py-2 border rounded text-gray-800 border-gray-400 hover:text-gray-600 hover:border-gray-600"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        {/* Menu Items */}
        <div
          className={`w-full lg:flex lg:items-center lg:w-auto ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="lg:flex lg:items-center lg:justify-between w-full">
            <div className="text-sm lg:flex-grow lg:flex lg:items-center lg:space-x-4">
              {userLogin !== null && (
                <ul className="flex flex-col lg:flex-row items-center lg:space-x-4 m-0 py-2 lg:py-0">
                  <li className="text-md text-slate-900 font-normal nav-item">
                    <NavLink
                      to="/"
                      activeClassName="active"
                      className="block py-2 lg:py-0 lg:px-2"
                      onClick={handleToggle}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="text-md text-slate-900 font-normal nav-item">
                    <NavLink
                      to="/about"
                      activeClassName="active"
                      className="block py-2 lg:py-0 lg:px-2"
                      onClick={handleToggle}
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="text-md text-slate-900 font-normal nav-item">
                    <NavLink
                      to="/categories"
                      activeClassName="active"
                      className="block py-2 lg:py-0 lg:px-2"
                      onClick={handleToggle}
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li className="text-md text-slate-900 font-normal nav-item">
                    <NavLink
                      to="/brands"
                      activeClassName="active"
                      className="block py-2 lg:py-0 lg:px-2"
                      onClick={handleToggle}
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li className="text-md text-slate-900 font-normal nav-item">
                    <NavLink
                      to="/products"
                      activeClassName="active"
                      className="block py-2 lg:py-0 lg:px-2"
                      onClick={handleToggle}
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className="text-md text-slate-900 font-normal nav-item">
                    <NavLink
                      to="/wishlist"
                      className="relative group"
                      onClick={handleToggle}
                    >
                      <FaHeart className="text-2xl text-red-500 transition-transform transform group-hover:scale-125 group-hover:rotate-12 group-hover:text-red-700" />
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
            {/* Right Side Menu Items */}
            <div className="flex items-center lg:space-x-4">
              {userLogin === null ? (
                <>
                  <NavLink
                    to="/login"
                    activeClassName="active"
                    className="block py-2 lg:py-0 lg:px-2 text-md text-slate-900 font-normal nav-item"
                    onClick={handleToggle}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    activeClassName="active"
                    className="block py-2 lg:py-0 lg:px-2 text-md text-slate-900 font-normal nav-item"
                    onClick={handleToggle}
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <span
                  onClick={logOut}
                  className="block py-2 lg:py-0 lg:px-2 text-md text-slate-900 font-normal nav-item cursor-pointer"
                >
                  Logout
                </span>
              )}
              {/* Social Icons - Hidden on small screens */}
              <div className="hidden lg:flex items-center space-x-2">
                <i className="fab fa-facebook text-md text-slate-900"></i>
                <i className="fab fa-twitter text-md text-slate-900"></i>
                <i className="fab fa-instagram text-md text-slate-900"></i>
                <i className="fab fa-tiktok text-md text-slate-900"></i>
                <i className="fab fa-youtube text-md text-slate-900"></i>
              </div>
              {/* Cart Icon */}
              {userLogin !== null && (
                <NavLink
                  to="/cart"
                  className="relative group"
                  onClick={handleToggle}
                >
                  <FaShoppingCart className="text-2xl text-gray-800 transition-transform transform group-hover:scale-125 group-hover:rotate-12 group-hover:text-green-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1 py-0.5 shadow-md">
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}
