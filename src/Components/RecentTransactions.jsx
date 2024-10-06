import { useState } from "react";
import { upArrow } from "../constants";
import { useExpense } from "../sections/ExpenseContext";
import { delay, motion } from "framer-motion";

// Utility functions for filtering
const filterDaily = (expenses) => {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  return expenses.filter((expense) => expense.date === today);
};

const filterWeekly = (expenses) => {
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7); // 7 days ago
  return expenses.filter((expense) => new Date(expense.date) >= weekAgo);
};

const filterMonthly = (expenses) => {
  const today = new Date();
  const monthAgo = new Date(today);
  monthAgo.setMonth(today.getMonth() - 1); // 1 month ago
  return expenses.filter((expense) => new Date(expense.date) >= monthAgo);
};

const RecentTransactions = () => {
  const buttons = ["Today", "Weekly", "Monthly"];
  const [activeButton, setActiveButton] = useState(0); // Default to "Today"
  const { expenses } = useExpense();
  const [expenseDetails, setExpenseDetails] = useState(null);

  // Filter the expenses based on the active filter
  let filteredExpenses;
  if (activeButton === 0) {
    filteredExpenses = filterDaily(expenses);
  } else if (activeButton === 1) {
    filteredExpenses = filterWeekly(expenses);
  } else {
    filteredExpenses = filterMonthly(expenses);
  }

  const toggleDetails = (index) => {
    setExpenseDetails((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col gap-4 mb-24">
      {/* Filter Buttons */}
      <div className="text-white w-full flex justify-between gap-2 mb-6 border-2 border-white rounded-full">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => setActiveButton(index)} // Set the active filter based on button click
            className={`flex-1 px-4 py-2 rounded-full text-white font-bold transition-colors
              ${activeButton === index ? "bg-black" : "bg-transparent"}`}
          >
            {button}
          </button>
        ))}
      </div>

      {/* Display Filtered Expenses */}
      {filteredExpenses.length === 0 ? (
        <p className="text-center mt-6 text-red-500 font-bold ">No expenses found</p>
      ) : (
        filteredExpenses.map((expense, index) => (
          <div key={index} className="flex flex-col gap-2 ">
            <motion.div
            initial={{translateY:10}}
            whileInView={{translateY:0}}

              className="flex items-center justify-between bg-[#D9D9D9] py-2 px-4 rounded-md cursor-pointer"
              onClick={() => toggleDetails(index)}
            >
              <div className="flex items-center gap-4">
                <img src={upArrow} className="h-[40px]" alt={expense.category} />
                <p className="font-semibold text-lg">{expense.amount}</p>
              </div>
              <p className="text-gray-600">{expense.category}</p>
            </motion.div>

            {expenseDetails === index && (
              <div className="bg-gray-200 p-4 rounded-md shadow-md">
                <p><strong>Date:</strong> {expense.date}</p>
                <p><strong>Description:</strong> {expense.description || "No description available"}</p>
                <p><strong>Category:</strong> {expense.category}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RecentTransactions;
