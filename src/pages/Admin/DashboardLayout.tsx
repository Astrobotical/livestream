import { Link, Outlet } from "react-router-dom";
import { RootState } from "../../redux/store";
import { HiOutlineXCircle } from "react-icons/hi2";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { CiStreamOn } from "react-icons/ci";
import { FaUser, FaCog, FaTachometerAlt } from "react-icons/fa";  // Ad
import { useState } from "react";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);  // Manage sidebar visibility

  const toggleSidebar = () => {
    console.log('clicked');
    setIsSidebarOpen(!isSidebarOpen);
  };

  
  return (
    <div className="flex min-h-screen bg-gray-700">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "menu-width"
        } bg-gray-800 text-white flex flex-col transition-all duration-300 ease-in-out`}
      >
        <div
          className={`p-4 text-2xl font-semibold ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          {isAdmin ? "Admin Dashboard" : "Dashboard"}
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          {/* Dashboard Link */}
          <Link to="/dashboard"
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md"
          >
            <FaTachometerAlt className="text-xl" />
            <span
              className={`ml-4 ${
                isSidebarOpen ? "inline" : "hidden"
              } transition-all duration-300`}
            >
              Dashboard
            </span>
          </Link>
          {/*Stream Setup Page*/}
          {/*to="/dashboard/streamsetup" */}
          <li
           className="menu p-0 hover:bg-gray-700 rounded-md" 
           onClick={()=>isSidebarOpen?toggleSidebar:toggleSidebar} 
           >
            <details open={isSidebarOpen}>
            <summary >
            <CiStreamOn className="text-xl" />
            <span
              className={`ml-2 ${
                isSidebarOpen ? "inline" : "hidden"
              } transition-all duration-300`}
            >
              Streams
            </span>
            </summary>
            <ul className="bg-gray-800 rounded-t-none p-2">
              <li><Link to="/dashboard/stream/setup" className='text-white btn btn-ghost justify-start
              '>Stream Setup</Link></li>
              <li><Link to="/dashboard/stream/list" className='text-white btn btn-ghost justify-start'>Streams</Link></li>
            </ul>
            </details>
           </li>

          {/* Users Link */}
          <Link to="/dashboard/users"
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md"
          >
            <FaUser className="text-xl" />
            <span
              className={`ml-4 ${
                isSidebarOpen ? "inline" : "hidden"
              } transition-all duration-300`}
            >
              Users
            </span>
          </Link>

          {/* Settings Link */}
          <Link to="/dashboard/settings"
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md"
          >
            <FaCog className="text-xl" />
            <span
              className={`ml-4 ${
                isSidebarOpen ? "inline" : "hidden"
              } transition-all duration-300`}
            >
              Settings
            </span>
          </Link>

          {/* Sidebar Toggle Button */}
          <div className="mt-4">
            <button
              className="flex items-center text-center justify-between w-full px-4 py-2 hover:bg-gray-600 rounded-md"
              onClick={toggleSidebar}
            >
              <span>{isSidebarOpen ? "Collapse Sidebar" : ""}</span>
              {isSidebarOpen ? <HiOutlineXCircle size={40} /> : <HiOutlineArrowCircleRight size={40} />}
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1">
        <main className="p-1">
          <Outlet /> {/* This will render the nested routes */}
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
