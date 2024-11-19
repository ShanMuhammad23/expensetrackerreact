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
  const { showAddUserForm, toggleUserForm } = usePopup();
  const { user } = useUser();
  const [totalExpense, setTotalExpense] = useState(0);
  const [isNewUser, setIsNewUser] = useState(false);

  // Add null checks for user object
  const income = user?.income || 0;
  const AccountBalance = user ? (income - totalExpense) : 0;
  const BalancePercentage = income ? (AccountBalance / income) * 100 : 0;

  useEffect(() => {
    const sum = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpense(sum);
  }, [expenses]);

  useEffect(() => {
    // Check both user context and localStorage
    const savedUser = localStorage.getItem("user");
    const parsedUser = savedUser ? JSON.parse(savedUser) : null;

    if (!parsedUser) {
      setIsNewUser(true);
      toggleUserForm(true);
    }
  }, [toggleUserForm]);

  // Helper function to render balance text with appropriate styling
  const renderBalanceText = () => {
    if (!user) return "Set Profile";
    return AccountBalance;
  };

  // Helper function to get balance color
  const getBalanceColor = () => {
    if (!user) return "text-gray-500";
    if (BalancePercentage > 70) return "text-green-500";
    if (BalancePercentage > 30) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <>
      {/* Always show UserSetup if isNewUser is true */}
      {(showAddUserForm || isNewUser) && <UserSetup />}
      
      <motion.section
        initial={{ opacity: 0.5 }}
        whileInView={{ opacity: 1 }}
        className="bg-[#C6C6C6] h-screen flex flex-col fixed inset-0 overflow-hidden"
      >
        {/* Rest of the component remains the same as in previous version */}
        <div className="bg-gradient-to-r from-[#ebe3d3] via-[#f4e5c9] to-[#e0d7c5] p-4 rounded-b-xl flex-none">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl">{currentDate}</p>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-lg font-semibold">{user?.name || "Guest"}</p>
              </div>
              <img
                src={UserImage}
                alt="User"
                className="h-[60px] w-[60px] border-4 border-violet-900 rounded-full"
              />
            </div>
          </div>

          <hr className="bg-black mt-4" />

          <div className="flex flex-col items-center mt-6">
            <p className="text-[14px] text-[#91919F]">Account Balance</p>
            <p className={`font-semibold text-[40px] ${getBalanceColor()}`}>
              {renderBalanceText()}
            </p>
          </div>

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
                  {user?.income || "Set Income"}
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
                <p className="font-semibold text-[22px]">{totalExpense}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Transactions Section */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <div className="p-4">
            {/* Recent Transactions Section */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Recent Transactions</h2>
              <Link to="/AllTransactions" className="text-blue-600">
                View All
              </Link>
            </div>

            <RecentTransactions />
          </div>
        </div>

        {/* Fixed Menu at Bottom */}
        <div className="flex-none">
          <Menu />
        </div>
      </motion.section>
    </>
  );
};

export default HomePage;