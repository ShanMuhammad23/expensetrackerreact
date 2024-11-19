import React, { memo } from 'react';
import ProfileMenu from "../Components/ProfileMenu";
import Menu from "./Menu";
import UserSetup from "./UserSetup";
import { UserImage } from "../constants";
import { useUser } from "./ExpenseContext";
import { usePopup } from "./ExpenseContext";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useUser();
  const { showAddUserForm, toggleUserForm } = usePopup();

  return (
    <div className="relative min-h-screen flex flex-col">
      {showAddUserForm && <UserSetup />}

      <motion.div 
        initial={{ opacity: 0.5 }}
        whileInView={{ opacity: 1 }}
        className="flex-grow bg-gradient-to-r from-[#c7bda8] via-[#d0c9bd] to-[#d5c29b] overflow-y-auto pb-[80px]" // Add padding at bottom for menu
      >
        {/* Profile Header */}
        <section className="px-4 py-6">
          <div className="flex items-center w-full rounded-xl justify-between bg-slate-300 bg-opacity-25 px-4 py-6">
            <div>
              <img
                src={UserImage}
                alt="User"
                className="h-[100px] w-[100px] border-4 border-violet-900 rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col flex-grow ml-4">
              <p className="text-[14px] text-[#91919F]">username</p>
              <p className="text-[24px] font-semibold">{user?.name || "Guest"}</p>
            </div>
            <button
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={toggleUserForm}
              aria-label="Edit Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </button>
          </div>
        </section>

        {/* Profile Menu Content */}
        <div className="px-4">
          <ProfileMenu />
        </div>
      </motion.div>

      {/* Fixed Bottom Menu */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <Menu />
      </div>
    </div>
  );
};

export default Profile;