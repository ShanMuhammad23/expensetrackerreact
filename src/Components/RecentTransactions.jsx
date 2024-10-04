import { expenses, upArrow } from "../constants"
import { useExpense } from "../sections/ExpenseContext";
const RecentTransactions = () => {
    const { expenses } = useExpense();
  return (
    <div className="flex flex-col gap-4">
    {expenses.map((expense, index) => (
      <div
        key={index}
        className="flex items-center justify-between bg-[#D9D9D9] py-2 px-4 rounded-md"
      >
        <div className="flex items-center gap-4">
          <img src={upArrow} className="h-[40px]" alt={expense.category} />
          <p className="font-semibold text-lg">{expense.amount}</p>
        </div>
        <p className="text-gray-600">{expense.category}</p>
      </div>
    ))}
  </div>
  )
}

export default RecentTransactions
