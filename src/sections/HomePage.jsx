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

const HomePage = () => {
  const { expenses } = useExpense();
  const { showAddUserForm } = usePopup();
  const { user } = useUser();
  const [totalExpense, setTotalExpense] = useState(0);
  
  // Ensure user exists and has income before calculating account balance
  const AccountBalance = user?.income ? user.income - totalExpense : 0;

  useEffect(() => {
    const sum = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpense(sum);
  }, [expenses]);

  // Add null check for user to prevent errors
  if (!user) {
    return <UserSetup />;
  }

  return (
    <div className="relative h-screen flex flex-col bg-[#C6C6C6]">
      {showAddUserForm && <UserSetup />}

      <motion.div 
        initial={{ opacity: 0.5 }}
        whileInView={{ opacity: 1 }}
        className="flex-grow overflow-hidden flex flex-col"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#ebe3d3] via-[#f4e5c9] to-[#e0d7c5] p-4 rounded-b-xl">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl">{currentDate}</p>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>
              <img
                src={UserImage}
                alt="User"
                className="h-[60px] w-[60px] border-4 border-violet-900 rounded-full"
              />
            </div>
          </div>

          <hr className="bg-black mt-4" />

          {/* Account Balance Section */}
          <div className="flex flex-col items-center mt-6">
            <p className="text-[14px] text-[#91919F]">Account Balance</p>
            <p className="font-semibold text-[40px]">
              {AccountBalance.toLocaleString()}
            </p>
          </div>

          {/* Income and Expense Cards */}
          <div className="flex justify-between gap-4 mt-6">
            {/* Income Card */}
            <div className="w-[184px] h-[90px] flex items-center bg-[#00A86B] rounded-xl text-white p-2 gap-2">
              <img
                src={downArrow}
                className="h-[50px] w-[60px] rounded-full"
                alt="Income Arrow"
              />
              <div>
                <p>Income</p>
                <p className="font-semibold text-[22px]">
                  {user.income?.toLocaleString() || 0}
                </p>
              </div>
            </div>
            
            {/* Expense Card */}
            <div className="w-[184px] h-[90px] flex items-center bg-[#FD3C4A] rounded-xl text-white p-2 gap-2">
              <img
                src={upArrow}
                className="h-[50px] w-[60px] rounded-full"
                alt="Expense Arrow"
              />
              <div>
                <p>Expenses</p>
                <p className="font-semibold text-[22px]">
                  {totalExpense.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions Section */}
        <div className="flex-grow overflow-y-auto px-4 pt-4 pb-24">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Recent Transactions</h2>
            <Link to="/AllTransactions" className="text-blue-600">
              View All
            </Link>
          </div>

          <RecentTransactions />
        </div>
      </motion.div>

      {/* Absolute positioned Menu to ensure it's always visible */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <Menu />
      </div>
    </div>
  );
};

export default HomePage;