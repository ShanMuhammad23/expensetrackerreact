import Menu from "./Menu";
import { Link } from "react-router-dom";
import { ArrowLeft } from "../constants";
import { useExpense } from "./ExpenseContext";
import { useEffect, useState } from "react";

const Stats = () => {
  const { expenses } = useExpense();
  const [report, setReport] = useState(null);

  useEffect(() => {
    {
      // Step 1: Initialize categories
      const categories = expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) {
          acc[expense.category] = [];
        }
        acc[expense.category].push(expense);
        return acc;
      }, {});

      // Step 2: Calculate totals for each category
      const categoryTotals = Object.keys(categories).map((category) => {
        const totalAmount = categories[category].reduce(
          (sum, expense) => sum + Number(expense.amount),
          0
        );
        return {
          category,
          totalAmount,
          transactions: categories[category],
        };
      });

      // Step 3: Calculate grand total
      const grandTotal = categoryTotals.reduce(
        (sum, cat) => sum + cat.totalAmount,
        0
      );

      setReport({
        categoryBreakdown: categoryTotals,
        grandTotal,
      });
    }
  }, expenses);
  return (
    <section
      id="Stats"
      className="bg-gradient-to-r from-[#e0d4be] via-[#d6d0c5] to-[#cdc7ba] min-h-screen"
    >
      <Link
        to="/Homepage"
        className="flex items-center justify-between w-3/4 gap-4 p-4 md:p-6"
      >
        <img src={ArrowLeft} alt="Back" className="w-6 h-6" />
        <h1 className="text-xl font-bold">Financial Report</h1>
      </Link>

      <div id="Financials" className="p-4">
        {report && (
          <div className="space-y-4">
            {report.categoryBreakdown.map((cat) => (
              <div key={cat.category} className=" rounded-lg p-4 ">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 p-1 px-2 border-gray-400 border rounded-full w-[130px]">
                    <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                    <h2 className="font-semibold text-lg"> {cat.category}</h2>
                  </div>
                  <span className="text-green-600 font-medium text-2xl">
                    {cat.totalAmount}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600 w-full">
                  <div className="h-4  mt-2 bg-[#F1F1FA] rounded-full">
                    <div
                      className="bg-[#7F3DFF] h-full rounded-full "
                      style={{
                        width: `${
                          (cat.totalAmount / report.grandTotal) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Menu />
    </section>
  );
};

export default Stats;
