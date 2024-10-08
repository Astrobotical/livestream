import React, { useState } from 'react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    createdAt: string;
    amountSpent: string;
  };
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen,onClose, user }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 sm:ml-5">
      <div className="bg-gray-600 rounded-lg shadow-lg w-3/4  sm:h-1/2 md:h-3/4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">User Profile</h2>
          <button onClick={onClose} className="text-white hover:text-gray-900">X</button>
        </div>
                {/* User Info - Inline Block Layout */}
           <div className="inline-block w-full">
          <p className="font-semibold inline-block w-1/3 text-white">Name:</p>
          <span className="inline-block w-1/2 text-white">{user.name}</span>
        </div>
        <div className="inline-block w-full mt-2">
          <p className="font-semibold inline-block w-1/3 text-white">Email:</p>
          <span className="inline-block w-1/2 text-white">{user.email}</span>
        </div>
        <div className="inline-block w-full mt-2">
          <p className="font-semibold inline-block w-1/2 text-white">Account Created:</p>
          <span className="inline-block w-1/2">{user.createdAt}</span>
        </div>
        <div className="inline-block w-full mt-2">
          <p className="font-semibold inline-block w-1/2 text-white">Amount Spent:</p>
          <span className="inline-block w-1/2">{user.amountSpent}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;