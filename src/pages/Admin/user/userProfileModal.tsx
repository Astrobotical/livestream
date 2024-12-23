import React, { useState, useEffect } from "react";
import { UserModel } from "../../../components/Models/User/UserModel";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode?: boolean; // Added to toggle between view and edit modes
  tagSearch: string;
  setTagSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  availableTags: string[];
  handleTagAdd: (tag: string) => void;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    amountSpent: string;
    Role: string;
    status: string[]; // Status is an array of strings (tags
    tags: string[];
  };
  onUpdate: () => Promise<void>;
  token: string; // Pass the token for API requests
}
const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  isEditMode = false, // Default to view-only mode
  user,
  token,
  onUpdate
}) => {
  const [editMode, setEditMode] = useState(isEditMode);
  const [name, setName] = useState(user?.name || "");
  const [role, setRole] = useState(user?.Role || "viewer");
  const [tags, setTags] = useState<string[]>(Array.isArray(user?.status) ? user?.status : []);
  const [tagInput, setTagInput] = useState("");
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [tagCatalog, setTagCatalog] = useState<string[]>([]); // Store existing tags

  useEffect(() => {
    setEditMode(isEditMode);
  }, [isEditMode]);

  // Fetch suggested tags as the user types
  useEffect(() => {
    //Setting previous tags

    if (tagInput.trim() === "") {
      setSuggestedTags([]);
      return;
    }

    const fetchTags = async () => {
      try {
        const response = await fetch(
          `REACT_APP_API_BASE_URL/api/admin/tags/search?query=${tagInput}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        setSuggestedTags(data.tags || []);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, [tagInput, token]);

  useEffect(() => {
    // Fetch the existing tags in the catalog (on mount)
    const fetchCatalog = async () => {
      try {
        const response = await fetch(
          `REACT_APP_API_BASE_URL/api/admin/tags`, // Adjust the endpoint if necessary
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setTagCatalog(data.tags || []);
      } catch (error) {
        console.error("Error fetching tag catalog:", error);
      }
    };

    fetchCatalog();
  }, [token]);

  if (!isOpen) return null;

  const handleSave = async () => {
    const updatedUser = {
      name,
      role,
      tags,
    };

    try {

      const response = await fetch(
        `REACT_APP_API_BASE_URL/api/admin/updateUser/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        alert("User updated successfully!");
        await onUpdate();
        onClose(); // Close modal after saving
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleAddTag = async (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setTagInput("");
    setSuggestedTags([]);

    // Send the tag to the backend if it's new
    if (!tagCatalog.includes(tag)) {
      try {
        const response = await fetch(
          `REACT_APP_API_BASE_URL/api/admin/tags`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: tag }),
          }
        );

        if (!response.ok) {
          console.error("Failed to add new tag to catalog");
        }
      } catch (error) {
        console.error("Error adding tag to catalog:", error);
      }
    }
  };

  const addUserTags = async (tag: string) => {
    try {
      const response = await fetch(
        `REACT_APP_API_BASE_URL/api/admin/users/${user.id}/tags`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ tags: tag }),
        }
      );

      if (!response.ok) {
        console.error("Failed to add tag to user");
      }
    } catch (error) {
      console.error("Error adding tag to user:", error);
    }
  }
  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      handleAddTag(tagInput.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-gray-600 rounded-lg shadow-lg w-3/4 sm:h-auto md:h-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            {editMode ? "Edit User Profile" : "View User Profile"}
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-900">
            X
          </button>
        </div>

        {/* User Info Fields */}
        <div className="mt-4">
          <label className="block text-white font-semibold">Name:</label>
          <input
            type="text"
            value={name}
            readOnly
            className="w-full mt-1 p-2 rounded-md bg-gray-700 text-white"
          />
        </div>

        <div className="mt-4">
          <label className="block text-white font-semibold">Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={!editMode}
            className="w-full mt-1 p-2 rounded-md bg-gray-700 text-white"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Tags Section */}
        <div className="mt-4">
          <label className="block text-white font-semibold">Tags:</label>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {Array.isArray(tags) && tags.length > 0 ? (
              tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full"
                >
                  {tag}
                  {editMode && (
                    <button
                      type="button"
                      className="ml-2 text-sm"
                      onClick={() =>
                        setTags(tags.filter((existingTag) => existingTag !== tag))
                      }
                    >
                      ✕
                    </button>
                  )}
                </span>
              ))
            ) : (
              <span className="text-white">No tags available</span>
            )}
          </div>
          {editMode && (
            <>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  placeholder="Add a tag"
                  className="w-full p-2 rounded-md bg-gray-700 text-white"
                />
                <button
                  onClick={() => handleAddTag(tagInput.trim())}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add Tag
                </button>
              </div>
              {suggestedTags.length > 0 && (
                <ul className="bg-gray-800 text-white mt-1 rounded-md">
                  {suggestedTags.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-700"
                      onClick={() => handleAddTag(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          {editMode ? (
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Edit Profile
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserProfileModal;