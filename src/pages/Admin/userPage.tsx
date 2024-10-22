import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import UserProfileModal from "./user/userProfileModal";
import Alert from '../../components/reuseables/alerts';
import { AlertOptions } from "../../components/Models/Alerts/alertsModel";
import clsx from 'clsx';
const UsersPage = () => {
  interface UserModel {
    name: string;
    created_at: string;
    amountSpent: number;
    id: string;
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [isLoading, setLoading] = useState(true);
  const tokenSaved = useSelector((state: RootState) => state.auth.token);
  const userID = useSelector((state: RootState) => state.user.userID);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log(userID);
        const response = await fetch('http://localhost:8000/api/admin/getUsers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenSaved}`,
          },
        }
        );
        const data = await response.json();
        console.log(data);
        setUsers(data);
        setTimeout(() => {
          setLoading(false);// After some time, data is loaded
        }, 500);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [tokenSaved]);
  const handleViewProfile = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const handleUserBan = (userID: string) => {
    const alertsModel: AlertOptions = {
      type: 'ban',
      title: 'Account Updated',
      message: 'Your account was updated successfully!',
      userID: userID,
      token: tokenSaved
    }
    Alert(alertsModel);
  }
  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-2xl mb-4 text-white">User Management</h2>
      <div className="max-w-6xl mx-auto">
        {/* Card Container */}
        <div className="rounded-lg p-2">

          {/* Loading Animation */}
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span className="text-white ml-2">Loading...</span>
            </div>
          ) : (
            /* Table */
            <div className="overflow-x-auto">
              <table className="min-w-full text-left w-full">
                <thead>
                  <tr>
                    <th className="px-2 py-3 sm:px-6 text-white font-semibold text-xs sm:text-sm">
                      Name
                    </th>
                    <th className="px-2 py-3 sm:px-6 text-white font-semibold text-xs sm:text-sm">
                      Created Account Date
                    </th>
                    <th className="px-2 py-3 sm:px-6 text-white font-semibold text-xs sm:text-sm rounded-tr-lg">
                      Amount Spent
                    </th>
                    <th className="px-2 py-3 sm:px-6 text-white font-semibold text-xs sm:text-sm rounded-tr-lg text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.length > 0 ? (
                    users.map((user, index) => (
                      <tr
                        key={index}
                        className="bg-gray-700 border-t border-gray-200 hover:bg-gray-600"
                      >
                        <td className="px-2 py-4 sm:px-6 text-white text-xs sm:text-base">{user.name}</td>
                        <td className="px-2 py-4 sm:px-6 text-white text-xs sm:text-base">{formatDate(user.created_at)}</td>
                        <td className="px-2 py-4 sm:px-6 text-white text-xs sm:text-base">$30</td>
                        <td className="px-2 py-4 sm:px-6 text-white text-xs sm:text-base">
                          <button
                            type="button"
                            className="btn btn-outline btn-warning text-white mb-2 md:mb-0"
                            onClick={() => handleViewProfile(user)}
                          >
                            View Profile
                          </button>
                          <button
                            type="button"
                            className={clsx(
                              'btn btn-outline btn-error sm:mt-2 md:ml-2 !hover:text-white',
                              // eslint-disable-next-line eqeqeq
                              user.id == userID ? '!hidden' : 'block'
                            )}
                            onClick={() => handleUserBan(user.id)}
                          >
                            Ban User
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center text-white">
                        No Users Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedUser && (
        <UserProfileModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default UsersPage;