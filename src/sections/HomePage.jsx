import { downArrow, expenses, upArrow } from "../constants";
import Menu from "./Menu";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [income, setIncome] = useState(120000);
  const [totalExpense, setTotalExpense] = useState(0);
  const buttons = ["Today", "Weekly", "Monthly"];
  const [activeButton, setActiveButton] = useState(0); // Default to first button

  useEffect(() => {
    const sum = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpense(sum);
  }, [expenses]); // Empty dependency array since expenses is assumed to be constant

  return (
    <section className="bg-[#C6C6C6] min-h-screen max-h-screen overflow-auto">
      <div className="bg-gradient-to-r from-[#FFF6E5] via-[#FFF6E5] to-[#F8EDD8] p-4 rounded-b-xl">
        <div className="flex justify-between">
          <p className="text-xl">November 06, 2024</p>
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
          <div className="w-[164px] h-[80px] flex items-center bg-[#00A86B] rounded-xl text-white p-2 gap-2">
            <img
              src={downArrow}
              className="h-[50px] w-[60px] bg-white rounded-full"
              alt="Income Arrow"
            />
            <div>
              <p>Income</p>
              <p className="font-semibold text-[22px]">{income}</p>
            </div>
          </div>
          <div className="w-[164px] h-[80px] flex items-center bg-[#FD3C4A] rounded-xl text-white p-2 gap-2">
            <img
              src={upArrow}
              className="h-[50px] w-[60px] bg-white rounded-full"
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

        <div className="flex flex-col gap-4">
          {expenses.map((expense, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-[#D9D9D9] py-2 px-4 rounded-md"
            >
              <div className="flex items-center gap-4">
                <img src={expense.img} className="h-[40px]" alt={expense.catagory} />
                <p className="font-semibold text-lg">{expense.amount}</p>
              </div>
              <p className="text-gray-600">{expense.catagory}</p>
            </div>
          ))}
        </div>
      </div>

      <Menu />
    </section>
  );
};

export default HomePage;