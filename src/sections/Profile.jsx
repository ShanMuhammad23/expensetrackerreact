import ProfileMenu from "../Components/ProfileMenu";
import Menu from "./Menu";
import UserSetup from "./UserSetup";
import { UserImage } from "../constants";
import { useUser } from "./ExpenseContext";
import { usePopup } from "./ExpenseContext";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Profile = () => {
  const { user } = useUser();
  const { showAddUserForm, toggleUserForm } = usePopup();
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    // Check both user context and localStorage
    const savedUser = localStorage.getItem("user");
    const parsedUser = savedUser ? JSON.parse(savedUser) : null;

    if (!parsedUser) {
      setIsNewUser(true);
      toggleUserForm(true);
    }
  }, [toggleUserForm]);

  return (
    <>
      {/* Always show UserSetup if isNewUser is true */}
      {(showAddUserForm || isNewUser) && <UserSetup />}

      <motion.section 
        initial={{ opacity: 0.5 }}
        whileInView={{ opacity: 1 }}
        id="Profile"
        className="bg-gradient-to-r from-[#c7bda8] via-[#d0c9bd] to-[#d5c29b] min-h-screen flex flex-col fixed inset-0"
      >
        {/* Fixed Header Section */}
        <section className="flex-none p-2">
          <div className="flex items-center w-[95%] rounded-xl mx-auto justify-between bg-slate-300 bg-opacity-25 px-4 py-8 my-8">
            <div>
              <img
                src={UserImage}
                alt="User"
                className="h-[100px] w-[100px] border-4 border-violet-900 rounded-full"
              />
            </div>
            <div className="flex flex-col">
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

        {/* Scrollable Menu Section */}
        <div className="flex-1 overflow-y-auto">
          <ProfileMenu />
        </div>

        {/* Fixed Bottom Menu */}
        <div className="flex-none">
          <Menu />
        </div>
      </motion.section>
    </>
  );
};

export default Profile;