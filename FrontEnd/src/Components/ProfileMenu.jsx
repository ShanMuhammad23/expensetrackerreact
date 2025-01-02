import React from "react";

const ProfileMenu = () => {
  return (
    <section id="ProfileMenu" className="bg-white rounded-xl h-max w-[95%] mt-4 m-auto ">
      <div className="flex items-center p-4 gap-4 border-b-2 cursor-pointer">
        <div className="p-2 bg-[#EEE5FF] rounded-xl border hover:bg-slate-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#7f3dff"
            className="bi bi-wallet"
            viewBox="0 0 16 16"
          >
            <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a2 2 0 0 1-1-.268M1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1" />
          </svg>
        </div>

        <span className="font-medium text-lg">Account</span>
      </div>
      <div className="flex items-center p-4 gap-4 border-b-2 cursor-pointer">
        <div className="p-2 bg-[#EEE5FF] rounded-xl border">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#7f3dff"
            className="bi bi-gear-fill"
            viewBox="0 0 16 16"
          >
            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
          </svg>
        </div>
        <span className="font-medium text-lg">Settings</span>
      </div>
      <div className="flex items-center p-4 gap-4 border-b-2 cursor-pointer">
        <div className="p-2 bg-[#EEE5FF] rounded-xl border ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#7f3dff"
            className="bi bi-arrow-up-circle"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"
            />
          </svg>
        </div>
        <span className="font-medium text-lg">Export Data</span>
      </div>
      <div className="flex items-center p-4 gap-4 cursor-pointer">
        <div className="p-2 bg-[#EEE5FF] rounded-xl border ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="green"
            className="bi bi-file-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11" />
          </svg>
        </div>
        <span className="font-medium text-lg">About Us</span>
      </div>
    </section>
  );
};

export default ProfileMenu;
