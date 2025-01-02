import { useState } from "react";
import { upArrow } from "../constants";
import { useExpense } from "../sections/ExpenseContext";
import {  motion } from "framer-motion";

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
    <div className="flex flex-col gap-6 pb-24 max-w-2xl mx-auto w-full">
      {/* Filter Buttons */}
      <div className="bg-gray-800/30 p-1.5 backdrop-blur-sm w-full flex justify-between gap-2 rounded-xl">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => setActiveButton(index)}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
              ${activeButton === index 
                ? "bg-white text-gray-900 shadow-lg" 
                : " hover:text-white hover:bg-white/10"}`}
          >
            {button}
          </button>
        ))}
      </div>

      {/* Transactions List */}
      {filteredExpenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <svg className="w-16 h-16 mb-4 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="font-medium">No transactions found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredExpenses.map((expense, index) => (
            <div key={index} className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-center justify-between bg-white hover:bg-gray-100
                  transition-all duration-200 py-2 px-6 rounded-2xl cursor-pointer shadow-xl
                  border"
                onClick={() => toggleDetails(index)}
              >
                <div className="flex items-center gap-5">
                  <div className="bg-emerald-500/10 p-3 rounded-xl">
                    <img src={upArrow} className="h-5 w-5 text-emerald-500" alt={expense.category} />
                  </div>
                  <div>
                    <p className="font-semibold text-[22px]  tracking-tight">{expense.amount}</p>
                    <p className="text-sm text-emerald-400/90 font-medium">{expense.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-400 font-medium">{expense.date}</p>
                </div>
              </motion.div>

              {expenseDetails === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#1A1A1A] mt-2 p-5 rounded-xl space-y-3
                    border border-zinc-800/50"
                >
                  <p className="text-sm text-zinc-300">
                    <span className="text-zinc-400 font-medium">Description:</span> {expense.description || "No description available"}
                  </p>
                  <p className="text-sm text-zinc-300">
                    <span className="text-zinc-400 font-medium">Category:</span> {expense.category}
                  </p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
