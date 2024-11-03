import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

import logo from "../../assets/logo.jpg";
import Search from "./Search";
import CartIcon from "./CartIcon";
import { useAuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";
const Navbar = () => {
  const location = useLocation();
  const { user } = useAuthContext();
  const { loading, logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const toggleMobileCategories = () => {
    setIsMobileCategoriesOpen(!isMobileCategoriesOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close menu on link click
  };
  const active = "text-black py-1 px-2 bg-white rounded-lg";
  const hover =
    "hover:text-black text-white py-1 px-2 hover:bg-white rounded-lg";
  return (
    <nav className="bg-gradient-to-b  from-purple-400 via-purple-600 to-purple-800 p-0.5 fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold flex gap-3">
          <img src={logo} className="h-10 rounded-xl" alt="Shoppers Logo" />
          Shoppers
        </div>
        <div className="hidden md:flex space-x-4 items-center gap-5 mr-20">
          <Link
            to="/"
            className={`${location.pathname == "/" ? active : hover}`}
          >
            Home
          </Link>
          <div className="relative">
            <button
              onClick={toggleCategories}
              className={`${hover} text-white flex items-center`}
            >
              Categories <ChevronDownIcon className="h-5 w-5 mt-1" />
            </button>
            {isCategoriesOpen && (
              <div className="absolute align-middle mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-20">
                <Link
                  onClick={() => {
                    setIsCategoriesOpen(false);
                  }}
                  to="/products/all"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  All
                </Link>
                <Link
                  onClick={() => {
                    setIsCategoriesOpen(false);
                  }}
                  to="/products/shirts"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Shirts
                </Link>
                <Link
                  onClick={() => {
                    setIsCategoriesOpen(false);
                  }}
                  to="/products/jeans"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Jeans
                </Link>
                <Link
                  onClick={() => {
                    setIsCategoriesOpen(false);
                  }}
                  to="/products/shoes"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Shoes
                </Link>
                <Link
                  onClick={() => {
                    setIsCategoriesOpen(false);
                  }}
                  to="/products/jackets"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Jackets
                </Link>
              </div>
            )}
          </div>
          {user ? (
            <Link className="text-white" onClick={logout}>
              <ArrowLeftOnRectangleIcon className="w-7 h-7" />
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className={`${location.pathname == "/login" ? active : hover} `}
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                className={`${
                  location.pathname == "/sign-up" ? active : hover
                }`}
              >
                Sign Up
              </Link>
            </>
          )}
          {/* <Search /> */}
        </div>
        {user ? (
          <Link to="/dashboard" className="text-white">
            Welcome {user.fullName}
          </Link>
        ) : (
          <Link className="text-white">Welcome Guest</Link>
        )}

        <CartIcon />
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden px-4 py-2">
          <Link
            to="/"
            onClick={handleLinkClick}
            className="block text-gray-300 hover:text-white py-2"
          >
            Home
          </Link>
          <button
            onClick={toggleMobileCategories}
            className="text-gray-300 hover:text-white flex items-center py-2 w-full text-left"
          >
            Categories
            <span className="ml-auto">
              {isMobileCategoriesOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </span>
          </button>
          {isMobileCategoriesOpen && (
            <div className="ml-4">
              <Link
                to="/products"
                onClick={handleLinkClick}
                className="block text-gray-300 hover:text-white py-1"
              >
                All
              </Link>
              <Link
                to="/products/shoes"
                onClick={handleLinkClick}
                className="block text-gray-300 hover:text-white py-1"
              >
                Shoes
              </Link>
              <Link
                to="/products/shirts"
                onClick={handleLinkClick}
                className="block text-gray-300 hover:text-white py-1"
              >
                Shirts
              </Link>
              <Link
                to="/products/jeans"
                onClick={handleLinkClick}
                className="block text-gray-300 hover:text-white py-1"
              >
                Jeans
              </Link>
              <Link
                to="/products/jackets"
                onClick={handleLinkClick}
                className="block text-gray-300 hover:text-white py-1"
              >
                Jackets
              </Link>
            </div>
          )}
          {user ? (
            <Link className="text-white" onClick={logout}>
              <ArrowLeftOnRectangleIcon className="w-7 h-7" />
            </Link>
          ) : (
            <div className="flex flex-col gap-3">
              <Link className="text-white">Login</Link>
              <Link className="text-white">Sign Up</Link>
            </div>
          )}
          {/* <Search /> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
