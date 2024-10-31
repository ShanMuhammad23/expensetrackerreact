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
const HomePage = ({ showAddUserState }) => {
  const { expenses } = useExpense();
  const [Adduser, setAddUser] = useState(showAddUserState);
  const { user } = useUser();
  const [totalExpense, setTotalExpense] = useState(0);

  const AccountBalance = user.income - totalExpense;
  let BalancePercentage = (AccountBalance / user.income) * 100;

  useEffect(() => {
    const sum = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpense(sum);
    alert(Adduser)
  }, [expenses]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) setAddUser(true);
  }, []);

  return (
    <>
      {Adduser && <UserSetup />}
      <motion.section
        initial={{ opacity: 0.5 }}
        whileInView={{ opacity: 1 }}
        className="bg-[#C6C6C6] min-h-screen max-h-screen py-8"
      >
        <div className="bg-gradient-to-r from-[#ebe3d3] via-[#f4e5c9] to-[#e0d7c5] p-4 rounded-b-xl ">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl">{currentDate}</p>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>
              <img
                src={UserImage}
                alt="User Picture"
                className="h-[60px] w-[60px] border-4 border-violet-900 rounded-full"
              />
            </div>
          </div>

          <hr className="bg-black mt-4" />

          <div className="flex flex-col items-center mt-6">
            <p className="text-[14px] text-[#91919F]">Account Balance</p>
            <p
              className={`font-semibold text-[40px] 
                ${BalancePercentage > 70 ? "text-green-500" : ""} 
                ${
                  BalancePercentage <= 70 && BalancePercentage > 30
                    ? "text-yellow-500"
                    : ""
                } 
                ${BalancePercentage <= 30 ? "text-red-500" : ""}`}
            >
              {AccountBalance || "Set Profile"}
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
                  {user.income || "Set Income"}
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

        <div className="p-4 ">
          {/* Recent Transactions Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Recent Transactions</h2>
            <Link to="/AllTransactions" className="text-blue-600">
              View All
            </Link>
          </div>

          <RecentTransactions />
        </div>
      </motion.section>
      <Menu />
    </>
  );
};

export default HomePage;
