import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import useLogout from "../../hooks/useLogout";
const Sidebar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useLogout();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true); // Open for laptop screens and up
      } else {
        setIsOpen(false); // Closed for mobile screens
      }
    };

    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize); // Add listener for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup listener
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`fixed top-1/4.5 left-0 w-64 bg-gradient-to-t  from-purple-400 via-purple-600 to-purple-800  text-white h-full transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out z-50`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleSidebar} className="text-white">
            <XMarkIcon className="h-8 w-8" />
          </button>
        </div>
        <div className="flex flex-col justify-between px-5 gap-4">
          <h2 className="text-2xl font-bold">Menu</h2>
          <nav>
            <ul className="flex flex-col justify-between  gap-10">
              <Link
                className="bg-gray-700 font-bold p-3 rounded-md hover:bg-gray-700"
                to="/dashboard"
              >
                Dashboard
              </Link>
              <Link
                className="bg-gray-700 font-bold p-3 rounded-md hover:bg-gray-700"
                to="/dashboard/orders"
              >
                Orders
              </Link>
              {user.isAdmin && (
                <Link
                  to="/dashboard/products"
                  className="bg-gray-700 font-bold p-3 rounded-md hover:bg-gray-700"
                >
                  Products
                </Link>
              )}
              {user.isAdmin && (
                <Link
                  to="/dashboard/users"
                  className="bg-gray-700 font-bold p-3 rounded-md hover:bg-gray-700"
                >
                  Users
                </Link>
              )}

              <Link className="text-white" onClick={logout}>
                <ArrowLeftOnRectangleIcon className="w-7 h-7" />
              </Link>
            </ul>
          </nav>
        </div>
      </div>
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-20 left-4 text-black z-50"
        >
          <Bars3Icon className="h-8 w-8" />
        </button>
      )}
    </>
  );
};

export default Sidebar;
