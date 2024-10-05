import RecentTransactions from "../Components/RecentTransactions";
import { downArrow, upArrow } from "../constants";
import Menu from "./Menu";
import { useState, useEffect } from "react";
import { useExpense } from "./ExpenseContext";
import { Link } from "react-router-dom";
import { currentDate } from "../constants";

const HomePage = () => {
  const { expenses } = useExpense();
  const [income, setIncome] = useState(50000);
  const [totalExpense, setTotalExpense] = useState(0);
  const buttons = ["Today", "Weekly", "Monthly"];
  const [activeButton, setActiveButton] = useState(0);


  useEffect(() => {
    const sum = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpense(sum);
  }, [expenses]);

  return (
    <section className="bg-[#C6C6C6] min-h-screen max-h-screen overflow-auto">
      <div className="bg-gradient-to-r from-[#ebe3d3] via-[#f4e5c9] to-[#e0d7c5] p-4 rounded-b-xl">
        <div className="flex justify-between">
          <p className="text-xl">{currentDate}</p>
          <div>
            <p className="text-lg">Shan</p>
          </div>
        </div>
        <hr className="bg-black mt-4" />
        <div className="flex flex-col items-center mt-6">
          <p className="text-[14px] text-[#91919F]">Account Balance</p>
          <p className="font-semibold text-[40px]">{income - totalExpense}</p>
        </div>

        <div className="flex justify-between gap-4 mt-6">
          <div className="w-[184px] h-[90px] flex items-center bg-[#00A86B] rounded-xl text-white p-2 gap-2">
            <img
              src={downArrow}
              className="h-[50px] w-[60px]  rounded-full"
              alt="Income Arrow"
            />
            <div>
              <p>Income</p>
              <p className="font-semibold text-[22px]">{income}</p>
            </div>
          </div>
          <div className="w-[184px] h-[90px] flex items-center bg-[#FD3C4A] rounded-xl text-white p-2 gap-2">
            <img
              src={upArrow}
              className="h-[50px] w-[60px]  rounded-full"
              alt="Expense Arrow"
            />
            <div>
              <p>Expenses</p>
              <p className="font-semibold text-[22px]">{totalExpense}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="text-white w-full flex justify-between gap-2 mb-6 border-2 border-white rounded-full">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={() => setActiveButton(index)}
              className={`flex-1 px-4 py-2 rounded-full text-white font-bold transition-colors
                ${activeButton === index ? "bg-black" : "bg-transparent"}`}
            >
              {button}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Recent Transactions</h2>
          <Link to="/HomePage/AllTransactions" className="text-blue-600">
            View All
          </Link>
        </div>
        <RecentTransactions />
      </div>

      <Menu />
    </section>
  );
};

export default HomePage;
