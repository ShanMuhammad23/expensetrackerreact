import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useExpense } from "./ExpenseContext"; // Import the context hook
import { ArrowLeft } from "../constants";
import Alert from "../Components/Alert";

const AddExpense = () => {
  const { addExpense } = useExpense();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  let currentHours = new Date().getHours();
  let currentMinute = new Date().getMinutes();
  let meridium = currentHours >= 12 ? "PM" : "AM";
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    timeStamp: `${currentHours >= 12 ? 12 - currentHours : currentHours}:${
      currentMinute < 10
        ? "0" + currentMinute + "" + meridium
        : currentMinute + "" + meridium
    }`,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }
    if (!formData.category) {
      newErrors.category = "Please select a category";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Please enter a description";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newExpense = {
        ...formData,
        amount: parseFloat(formData.amount),
        date: new Date().toISOString().split("T")[0],
      };

      // Use the addExpense function from context
      addExpense(newExpense);
      setAlert(true);
      setTimeout(() => {
        navigate("/HomePage");
      }, 4000);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#FFF6E5] via-[#FFF6E5] to-[#F8EDD8] flex flex-col">
      <Link to="/Homepage" className="flex items-center gap-4 p-4 md:p-6">
        <img src={ArrowLeft} alt="Back" className="w-6 h-6" />
        <h1 className="text-xl font-bold">Add a Transaction</h1>
      </Link>
      {alert && <Alert message="Expense Added Successfully" type="success" />}
      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <div className="px-4 md:px-6 py-8">
          <div className="mb-6">
            <label htmlFor="amount" className="block text-xl font-bold mb-2">
              How Much?
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={`w-full rounded-full p-3 bg-transparent border ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter amount"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>
        </div>

        <div className="flex-1 bg-white rounded-t-3xl px-4 md:px-6 py-6 flex flex-col gap-6">
          <div>
            <label htmlFor="category" className="block text-lg mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full rounded-full p-3 bg-transparent border ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a category</option>
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Rent">Rent</option>
              <option value="Others">Others</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-lg mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full p-3 rounded-2xl bg-transparent border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } min-h-[100px]`}
              placeholder="Enter description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-auto mb-8 w-full bg-[#7F3DFF] text-white text-xl py-3 rounded-xl hover:bg-[#6F2DFF] transition-colors"
          >
            Continue
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddExpense;
