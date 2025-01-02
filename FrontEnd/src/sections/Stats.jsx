import Menu from "./Menu";
import { Link } from "react-router-dom";
import { ArrowLeft } from "../constants";
import { useExpense } from "./ExpenseContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    <>
      <motion.section
        initial={{ opacity: 0.5 }}
        whileInView={{ opacity: 1 }}
        id="Stats"
        className="bg-gradient-to-r from-[#e0d4be] via-[#d6d0c5] to-[#cdc7ba] min-h-screen pb-20"
      >
        <Link
          to="/Homepage"
          className="flex items-center gap-3 px-6 py-4 md:py-6"
        >
          <img src={ArrowLeft} alt="Back" className="w-5 h-5" />
          <h1 className="text-xl font-semibold text-gray-800">Financial Report</h1>
        </Link>

        <div id="Financials" className="px-6 py-4">
          {report && (
            <div className="space-y-6">
              {report.categoryBreakdown.map((cat) => (
                <div key={cat.category} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-full">
                      <div className="h-3 w-3 bg-[#7F3DFF] rounded-full"></div>
                      <h2 className="font-medium text-sm text-gray-800">{cat.category}</h2>
                    </div>
                    <span className="text-[#7F3DFF] font-semibold text-lg">
                      {cat.totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full">
                    <div className="h-2 bg-[#F1F1FA] rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(cat.totalAmount / report.grandTotal) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        className="bg-[#7F3DFF] h-full rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.section>
      <Menu />
    </>
  );
};

export default Stats;
