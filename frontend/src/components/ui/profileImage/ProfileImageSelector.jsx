import React from "react";
import { Upload, Trash2, User } from "lucide-react";

const ProfileImageSelector = ({ image, setImage }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // prevent click bubbling
    e.preventDefault(); // prevent triggering file input
    setImage(null);
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="relative w-24 h-24">
        <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-300">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-8 h-8 text-gray-400" />
          )}
        </div>

        {image ? (
          <button
            type="button"
            onClick={handleDelete}
            className="absolute -bottom-1 -right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow-md"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        ) : (
          <label className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-1 shadow-md cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <Upload className="w-4 h-4" />
          </label>
        )}
      </div>
    </div>
  );
};

export default ProfileImageSelector;
