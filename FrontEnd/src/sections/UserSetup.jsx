import React, { useState, useCallback, useRef } from "react";
import { useUser } from "./ExpenseContext";
import { usePopup } from "./ExpenseContext";
import { motion } from "framer-motion";

const UserSetup = () => {
  const { toggleUserForm } = usePopup();
  const { addUser } = useUser();
  
  const [formData, setFormData] = useState({
    name: "",
    income: "",
    profilePicture: null
  });

  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  }, [errors]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          profilePicture: "Invalid file type. Please upload JPG, PNG, or GIF."
        }));
        return;
      }

      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          profilePicture: "File size should be less than 5MB."
        }));
        return;
      }

      // Create preview and store file
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData(prev => ({
          ...prev,
          profilePicture: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    setPreviewImage(null);
    setFormData(prev => ({
      ...prev,
      profilePicture: null
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    if (!formData.income) {
      newErrors.income = "Income is required";
    } else if (parseFloat(formData.income) <= 0) {
      newErrors.income = "Income must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Prepare form data for upload
        const userDataToSubmit = {
          name: formData.name.trim(),
          income: parseFloat(formData.income),
          profilePicture: formData.profilePicture
        };

        await addUser(userDataToSubmit);
        
        toggleUserForm();
      } catch (error) {
        console.error("Error adding user:", error);
        setErrors(prev => ({
          ...prev,
          submit: "Failed to save profile. Please try again."
        }));
      }
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    toggleUserForm();
  };

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <form
          className="flex flex-col p-6 bg-white border border-[#8a8484] rounded-xl gap-4 relative shadow-xl"
          onSubmit={handleSubmit}
        >
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-2 right-2 p-2 text-red-500 hover:text-red-700 focus:outline-none"
            aria-label="Close"
            type="button"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center mb-4">
            <div className="relative">
              {previewImage ? (
                <div className="relative">
                  <img 
                    src={previewImage} 
                    alt="Profile preview" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-[#7F3DFF]"
                  />
                  <button
                    type="button"
                    onClick={removeProfilePicture}
                    className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                    aria-label="Remove profile picture"
                  >
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                </div>
              )}
            </div>
            
            <div className="mt-4 flex items-center">
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/jpeg,image/png,image/gif"
                className="hidden"
                id="profilePicture"
              />
              <label 
                htmlFor="profilePicture" 
                className="flex items-center px-4 py-2 bg-[#7F3DFF] text-white rounded-full cursor-pointer hover:bg-[#6F2DFF] transition-colors"
              >
                Upload Picture
              </label>
            </div>
            {errors.profilePicture && (
              <p className="text-red-500 text-sm mt-2">{errors.profilePicture}</p>
            )}
          </div>

          {/* Name Input */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter your name"
              onChange={handleChange}
              className={`w-full rounded-full p-3 bg-transparent border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Income Input */}
          <div>
            <input
              type="number"
              name="income"
              value={formData.income}
              placeholder="Enter your monthly income"
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`w-full rounded-full p-3 bg-transparent border ${
                errors.income ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.income && (
              <p className="text-red-500 text-sm mt-1">{errors.income}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full bg-[#7F3DFF] text-white text-xl py-3 rounded-xl hover:bg-[#6F2DFF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7F3DFF] focus:ring-opacity-50"
          >
            Save Profile
          </button>

          {/* Global Error Message */}
          {errors.submit && (
            <p className="text-red-500 text-sm text-center">{errors.submit}</p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UserSetup;