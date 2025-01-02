import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useExpense } from "./ExpenseContext"; // Import the context hook
import { ArrowLeft } from "../constants";
import Alert from "../Components/Alert";
import { motion } from "framer-motion";

const AddExpense = () => {

  const { addExpense } = useExpense();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    timeStamp: new Date().toLocaleDateString(),
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
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-b from-[#7F3DFF]/5 to-white"
    >
      <div className="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-gray-100">
        <Link to="/Homepage" className="flex items-center gap-3 p-5">
          <img src={ArrowLeft} alt="Back" className="w-5 h-5" />
          <h1 className="text-lg font-semibold text-gray-800">Add Transaction</h1>
        </Link>
      </div>

      {alert && <Alert message="Expense Added Successfully" type="success" />}

      <form onSubmit={handleSubmit} className="flex flex-col flex-1 max-w-2xl mx-auto">
        <div className="px-5 py-8">
          <div className="mb-8">
            <label htmlFor="amount" className="block text-2xl font-bold mb-4 text-gray-800">
              How Much?
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={`w-full rounded-xl p-4 bg-white border-2 focus:ring-2 focus:ring-[#7F3DFF]/20 transition-all ${
                errors.amount ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="0.00"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-2">{errors.amount}</p>
            )}
          </div>
        </div>

        <div className="flex-1 bg-white px-5 py-6 rounded-t-[32px] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="space-y-6">
            <div>
              <label htmlFor="category" className="block text-base font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full rounded-xl p-4 bg-white border-2 appearance-none focus:ring-2 focus:ring-[#7F3DFF]/20 transition-all ${
                  errors.category ? "border-red-500" : "border-gray-200"
                }`}
              >
                <option value="">Select a category</option>
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
                <option value="Rent">Rent</option>
                <option value="Others">Others</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-2">{errors.category}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-base font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full p-4 rounded-xl bg-white border-2 focus:ring-2 focus:ring-[#7F3DFF]/20 transition-all ${
                  errors.description ? "border-red-500" : "border-gray-200"
                } min-h-[120px] resize-none`}
                placeholder="What was this expense for?"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-2">{errors.description}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-[#7F3DFF] text-white font-medium px-6 py-4 rounded-xl hover:bg-[#6F2DFF] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#7F3DFF]/25"
          >
            Save Transaction
          </button>
        </div>
      </form>
    </motion.section>
  );
};

export default AddExpense;
