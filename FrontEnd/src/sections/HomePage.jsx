import RecentTransactions from "../Components/RecentTransactions";
import { downArrow, upArrow } from "../constants";
import Menu from "./Menu";
import { useState, useEffect } from "react";
import { useExpense } from "./ExpenseContext";
import { Link } from "react-router-dom";
import { currentDate, UserImage } from "../constants";
import { useUser } from "./ExpenseContext";
import UserSetup from "./UserSetup";
import { motion } from "framer-motion";
import { usePopup } from "./ExpenseContext";
import axios from "axios";

const HomePage = () => {
  const { expenses } = useExpense();
  const [expensesDB, setExpensesDB] = useState([]);
  const { showAddUserForm } = usePopup();
  const { user } = useUser();
  const [totalExpense, setTotalExpense] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:3001/api/expenses")
      .then((res) => {
        setExpensesDB(res.data);
      })
      .catch(error => {
        console.error("Error fetching expenses:", error);
      });
  }, []);
  // Safely calculate account balance
  const AccountBalance = user?.income ? user.income - totalExpense : 0;

  useEffect(() => {
    const sum = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpense(sum);
  }, [expenses]);

  return (
    <div className="relative h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Always show UserSetup if no user or showAddUserForm is true */}
      {(!user || showAddUserForm) && <UserSetup />}

      {/* Only render main content if user exists */}
      {user && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-grow overflow-hidden flex flex-col"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-violet-500 via-violet-600 to-violet-700 p-4 rounded-b-[12px] shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg text-white/90 font-medium">{currentDate}</p>
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-base text-white font-semibold">{user.name}</p>
                </div>
                <img
                  src={UserImage}
                  alt="User"
                  className="h-[50px] w-[50px] border-4 border-white/20 rounded-full shadow-md hover:scale-105 transition-transform"
                />
              </div>
            </div>

            <div className="h-[1px] bg-white/20 my-3" />

            {/* Account Balance Section */}
            <div className="flex flex-col items-center mt-4">
              <p className="text-[12px] text-white/70">Account Balance</p>
              <p className="font-bold text-[36px] text-white">
                {AccountBalance.toLocaleString()}
              </p>
            </div>

            {/* Income and Expense Cards */}
            <div className="flex justify-between gap-4 mt-6">
              {/* Income Card */}
              <div className="w-[184px] h-[80px] flex items-center bg-white/10 backdrop-blur-md rounded-2xl text-white p-3 gap-3 hover:bg-white/15 transition-colors">
                <img
                  src={downArrow}
                  className="h-[40px] w-[40px] rounded-full"
                  alt="Income Arrow"
                />
                <div>
                  <p className="text-white/70">Income</p>
                  <p className="font-semibold text-[22px]">
                    {user.income?.toLocaleString() || 0}
                  </p>
                </div>
              </div>
              
              {/* Expense Card */}
              <div className="w-[184px] h-[80px] flex items-center bg-white/10 backdrop-blur-md rounded-2xl text-white p-3 gap-3 hover:bg-white/15 transition-colors">
                <img
                  src={upArrow}
                  className="h-[40px] w-[40px] rounded-full"
                  alt="Expense Arrow"
                />
                <div>
                  <p className="text-white/70">Expenses</p>
                  <p className="font-semibold text-[22px]">
                    {totalExpense.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions Section */}
          <div className="flex-grow overflow-y-auto px-6 pt-6 pb-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-xl text-gray-800">Recent Transactions</h2>
              <Link 
                to="/AllTransactions" 
                className="text-violet-600 hover:text-violet-700 font-medium transition-colors"
              >
                View All
              </Link>
            </div>

            <RecentTransactions />
          </div>
        </motion.div>
      )}

      {/* Absolute positioned Menu to ensure it's always visible */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <Menu />
      </div>
    </div>
  );
};

export default HomePage;