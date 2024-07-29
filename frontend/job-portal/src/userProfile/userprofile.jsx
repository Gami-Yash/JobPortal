import React, { useState } from "react";

const UserProfileCard = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave(editData);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={editData.username}
              onChange={handleChange}
              className="border p-1"
            />
          ) : (
            user.username
          )}
        </h2>
        <p className="text-gray-700 mb-4">
          <strong>Experience:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              name="experience"
              value={editData.experience}
              onChange={handleChange}
              className="border p-1"
            />
          ) : (
            user.experience
          )}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Email:</strong>{" "}
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editData.email}
              onChange={handleChange}
              className="border p-1"
            />
          ) : (
            user.email
          )}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Education:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              name="education"
              value={editData.education}
              onChange={handleChange}
              className="border p-1"
            />
          ) : (
            user.education
          )}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Location:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              name="location"
              value={editData.location}
              onChange={handleChange}
              className="border p-1"
            />
          ) : (
            user.location
          )}
        </p>
        <div className="flex justify-end">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-teal-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gray-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
