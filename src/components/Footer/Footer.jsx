import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-b mt-20 from-purple-400 via-purple-600 to-purple-800 text-white py-8 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="font-bold text-xl mb-4">About Us</h2>
            <p>
              At Shoppers, we're committed to bringing you top-quality products
              and a seamless shopping experience. Discover the best from around
              the globe with us. Happy shopping! 🛒✨
            </p>
          </div>
          <div>
            <h2 className="font-bold text-xl mb-4">Quick Links</h2>
            <ul>
              <li>
                <Link to="/" className="hover:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gray-400">
                  All Products
                </Link>
              </li>
              <li>
                <Link to={"/login"} className="hover:text-gray-400">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/sign-up" className="hover:text-gray-400">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-xl mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>&copy; 2024 Shopers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
