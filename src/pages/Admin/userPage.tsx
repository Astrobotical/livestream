import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import UserProfileModal from "./user/userProfileModal";
import Alert from "../../components/reuseables/alerts";
import { AlertOptions } from "../../components/Models/Alerts/alertsModel";
import clsx from "clsx";
import { UserModel } from "../../components/Models/User/UserModel";

const UsersPage = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [tagSearch, setTagSearch] = useState("");
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  const tokenSaved = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/admin/getUsers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenSaved}`,
          },
        });
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [tokenSaved]);

  useEffect(() => {
    if (tagSearch.trim() === "") {
      setAvailableTags([]);
      return;
    }

    const fetchTags = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/tags?query=${tagSearch}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenSaved}`,
            },
          }
        );
        const data = await response.json();
        setAvailableTags(data.tags || []);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, [tagSearch, tokenSaved]);

  const handleViewProfile = (user: UserModel) => {
    console.log("Viewing profile for user:", user); // Check user data
    setSelectedUser(user);
    setIsProfileModalOpen(true);
  };

  const handleBanUser = (userID: string) => {
    const alertsModel: AlertOptions = {
      type: "ban",
      title: "Account Updated",
      message: "Your account was updated successfully!",
      userID: userID,
      token: tokenSaved,
    };
    Alert(alertsModel);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userID
          ? { ...user, status: ["Banned"] } // Update the status locally
          : user
      )
    );
    setIsBanModalOpen(false);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
    setSelectedUser(null);
  };

  const handleTagAdd = (tag: string) => {
    if (!selectedUser || selectedUser.tags.includes(tag)) return;

    const updatedTags = [...selectedUser.tags, tag];
    setSelectedUser({ ...selectedUser, tags: updatedTags });

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser.id ? { ...user, tags: updatedTags } : user
      )
    );
  };

  const handleUpdateUser = async () => {
    setLoading(true);
    setUsers([]);
    try {
      
      console.log("Recalling updates"); // Check updated user data
          const response = await fetch("http://localhost:8000/api/admin/getUsers", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenSaved}`,
            },
          });
          const data = await response.json();
          
          setUsers(data);
          setLoading(false);
        
        handleCloseProfileModal();

    } catch (error) {
      console.error("update failed:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    if (statusFilter === "All") return true;
    if(statusFilter === "admin" || statusFilter === "Admin") return user.status.includes("admin");
    if(statusFilter === "banned" || statusFilter === "Banned") return user.status.includes("banned");
    return user.status.includes(statusFilter);
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-2xl mb-4 text-white">User Management</h2>

      {/* Inline Filter Section */}
      <div className="flex justify-between items-center mb-4 space-x-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-700 text-white px-4 py-2 rounded-md"
        >
          <option value="All">All Users</option>
          <option value="Admin">Admin</option>
          <option value="Banned">Banned</option>
        </select>
      </div>

      <div className="w-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <svg
              className="animate-spin h-8 w-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <span className="text-white ml-2">Loading...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-white font-semibold text-xs sm:text-sm">
                    Name
                  </th>
                  <th className="px-4 py-3 text-white font-semibold text-xs sm:text-sm">
                    Created Account Date
                  </th>
                  <th className="px-4 py-3 text-white font-semibold text-xs sm:text-sm">
                    Amount Spent
                  </th>
                  <th className="px-4 py-3 text-white font-semibold text-xs sm:text-sm">
                    Status
                  </th>
                  <th className="px-4 py-3 text-white font-semibold text-xs sm:text-sm text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr
                      key={index}
                      className="bg-gray-700 border-t border-gray-200 hover:bg-gray-600"
                    >
                      <td className="px-4 py-4 text-white text-xs sm:text-base">
                        {user.name}
                      </td>
                      <td className="px-4 py-4 text-white text-xs sm:text-base">
                        {formatDate(user.created_at)}
                      </td>
                      <td className="px-4 py-4 text-white text-xs sm:text-base">
                        ${user.amountSpent ?? 0}
                      </td>
                      <td className="px-4 py-4 text-white text-xs sm:text-base">
                        {(Array.isArray(user.status) ? user.status : []).map(
                          (statusTag, i) => (
                            <span
                              key={i}
                              className={clsx(
                                "px-2 mx-1 py-1 rounded-full text-sm",
                                statusTag === "Admin"||statusTag ==="admin"
                                  ? "bg-blue-500 text-white"
                                  : statusTag === "Banned"||statusTag === "banned"
                                  ? "bg-red-500 text-white"
                                  : "bg-green-500 text-white"
                              )}
                            >
                              {statusTag}
                            </span>
                          )
                        )}
                      </td>
                      <td className="px-4 py-4 text-white text-xs sm:text-base text-center">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                          onClick={() => handleViewProfile(user)}
                        >
                          View Profile
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-md"
                          onClick={() => handleBanUser(user.id)}
                        >
                          Ban User
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-white">
                      No Users Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedUser && (
        <UserProfileModal
          isOpen={isProfileModalOpen}
          onClose={handleCloseProfileModal}
          isEditMode={false}
          tagSearch={tagSearch}
          setTagSearch={(e) => setTagSearch(e.target.value)}
          availableTags={availableTags}
          handleTagAdd={handleTagAdd}
          user={selectedUser}
          onUpdate={handleUpdateUser}
          token={tokenSaved ?? ''}
        />
      )}
    </div>
  );
};

export default UsersPage;