import { useState } from "react";
import { useUser } from "./ExpenseContext";
import { EditUserForm } from "../constants";
import { motion } from "framer-motion";
import { usePopup } from "./ExpenseContext";
const UserSetup = () => {
  const { showAddUserForm, toggleUserForm}=usePopup()
  const [showAddUser,setShowadduser]=useState(false)
  const { addUser } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    income: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      ...formData,
      name: formData.name,
      income: formData.income,
    };
    addUser(newUser);
    toggleUserForm();
    EditUserForm.value=false;
  };
  return (
    <motion.div className="absolute flex  items-center justify-center w-full h-full "
     initial={{opacity:0,scale:0.5}}
     whileInView={{opacity:1,scale:1}}
    >

      <form
        className="flex flex-col p-8 bg-white border border-[#8a8484] rounded-xl gap-2 w-[90%] m-auto"
        onSubmit={handleSubmit}
      >
                    <div onClick={toggleUserForm} className="flex justify-end px-4"><span className="flex items-center justify-center p-2 border border-red-500 rounded-full h-8 w-8 text-red-600 cursor-pointer hover:bg-red-600 hover:text-white hover:scale-[1.1]">X</span></div>

        <h2 className="text-xl text-center">Set Up Your Profile</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter your name"
          onChange={handleChange}
          className="w-full rounded-full p-3 bg-transparent border"
          required
        />
        <input
          type="number"
          name="income"
          value={formData.income}
          placeholder="Enter your income"
          onChange={handleChange}
          className="w-full rounded-full p-3 bg-transparent border"
          required
        />
        <button
          type="submit"
          className="mt-auto  w-full bg-[#7F3DFF] text-white text-xl py-3 rounded-xl hover:bg-[#6F2DFF] transition-colors"
        >
          Save
        </button>
      </form>
    </motion.div>
  );
};

export default UserSetup;
