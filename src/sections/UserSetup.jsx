import { useState } from "react";
import { useUser } from "./ExpenseContext";
import { EditUserForm } from "../constants";
const UserSetup = () => {
  const [showAddUser,setShowadduser]=useState(true)
  const { addUser } = useUser();
  //  const [showUserForm, setShowUserForm] = useState();
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
    setShowadduser(false);
    EditUserForm.value=false;
  };
if(showAddUser){
  return (
    <div className="absolute flex items-center justify-center w-full h-full ">
      <form
        className="flex flex-col p-8 bg-white border border-[#8a8484] rounded-xl gap-2 w-2/3"
        onSubmit={handleSubmit}
      >
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
    </div>
  )};
};

export default UserSetup;
