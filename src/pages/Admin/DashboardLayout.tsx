import { Link, Outlet } from "react-router-dom";
import { RootState } from "../../redux/store";
import { HiOutlineXCircle } from "react-icons/hi2";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { CiStreamOn } from "react-icons/ci";
import { FaUser, FaCog, FaTachometerAlt } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs"; // Dropdown indicator
import { RiLiveLine } from "react-icons/ri";
import { useState } from "react";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isStreamsOpen, setIsStreamsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsStreamsOpen(false); // Close Streams dropdown when sidebar collapses
  };

  const toggleStreams = () => {
    setIsStreamsOpen((prev) => !prev);
  };
  return (
    <div className="flex min-h-screen bg-gray-700">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gray-800 text-white flex flex-col transition-all duration-300 ease-in-out`}
      >
        {/* Sidebar Header */}
        <div
          className={`p-4 text-2xl font-semibold ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          {isAdmin ? "Admin Dashboard" : "Dashboard"}
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-2">
          <Link to="/dashboard" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
            <FaTachometerAlt className="text-xl" />
            <span className={`ml-4 ${isSidebarOpen ? "inline" : "hidden"} transition-all duration-300`}>
              Dashboard
            </span>
          </Link>

          {/* Streams Dropdown */}
          <div className="menu px-0 hover:bg-gray-700 rounded-md">
            <div
              className="flex items-center justify-between px-4  cursor-pointer"
              onClick={toggleStreams}
            >
              <div className="flex items-center ">
                <RiLiveLine className="text-xl" />
                <span className={`ml-4 ${isSidebarOpen ? "inline" : "hidden"} transition-all duration-300`}>
                  Streams
                </span>
              </div>
              <BsChevronDown
                className={`transition-transform duration-300 ${
                  isStreamsOpen ? "rotate-180" : ""
                } ${isSidebarOpen ? "inline-block" : "hidden"}`}
              />
            </div>
            {/* Dropdown Menu */}
            <ul
              className={`bg-gray-800 rounded-t-none pt-2 overflow-hidden transition-all duration-300 ${
                isStreamsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
              style={{
                display: isSidebarOpen || isStreamsOpen ? "block" : "none", // Visible only if sidebar or dropdown is open
              }}
            >
              <li>
                <Link
                  to="/dashboard/stream/setup"
                  className="text-white px-4 py-2 block hover:bg-gray-600 rounded-md"
                >
                  Stream Setup
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/stream/list"
                  className="text-white px-4 py-2 block hover:bg-gray-600 rounded-md"
                >
                  Streams
                </Link>
              </li>
            </ul>
          </div>

          <Link to="/dashboard/users" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
            <FaUser className="text-xl" />
            <span className={`ml-4 ${isSidebarOpen ? "inline" : "hidden"} transition-all duration-300`}>
              Users
            </span>
          </Link>

          <Link to="/dashboard/settings" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
            <FaCog className="text-xl" />
            <span className={`ml-4 ${isSidebarOpen ? "inline" : "hidden"} transition-all duration-300`}>
              Settings
            </span>
          </Link>

          {/* Sidebar Toggle Button */}
          <div className="mt-4">
            <button
              className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-600 rounded-md"
              onClick={toggleSidebar}
            >
              <span>{isSidebarOpen ? "Collapse Sidebar" : ""}</span>
              {isSidebarOpen ? <HiOutlineXCircle size={40} /> : <HiOutlineArrowCircleRight size={40} />}
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 p-4">
        <Outlet /> {/* Nested Routes */}
      </div>
    </div>
  );
};

export default DashboardLayout;