import { ArrowLeft, expenses } from "../constants";
import { Link } from "react-router-dom";
import { useExpense } from "./ExpenseContext";
import { useState } from "react";
import Alert from "../Components/Alert";
import { motion } from "framer-motion";

const AllTransactions = () => {
  const { deleteExpense } = useExpense();
  const [deleteid,setDeleteId]=useState({
    id:"",
    category:"",
    description:"",
    timeStamp:"",
    amount:""
  })
  const [selectedId,setselectedId]=useState("")
  const [alert, setAlert] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const { expenses } = useExpense();
  function deleteanExpense(id,category,description,timeStamp,amount) {
    setConfirm(true);
    setDeleteId({
        id,
        category,
        description,
        timeStamp,
        amount
    })
    setselectedId(deleteid.id)
  }
  function confirmDeletion(selectedId){
    deleteExpense(selectedId.id);
    setAlert(true);
    setConfirm(false);
    setTimeout(() => {
        setAlert(false)
    }, 2000);
  }
  return (
    <>
      {confirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="mx-auto z-50 max-w-md rounded-2xl border border-stone-200 bg-white w-full p-6 shadow-xl"
          >
            <div className="flex items-center gap-4 border-b border-stone-100 pb-4">
              <span className="shrink-0 rounded-full bg-red-100 p-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-red-600"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
              </span>
              <div>
                <h3 className="font-semibold text-xl text-stone-800">
                  Confirm Deletion
                </h3>
                <p className="text-stone-500 text-sm mt-0.5">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <div className="space-y-3 py-4 border-b border-stone-100">
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Category</span>
                <span className="font-medium text-stone-800">{deleteid.category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Description</span>
                <span className="font-medium text-stone-800">{deleteid.description}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Amount</span>
                <span className="font-medium text-red-600">{deleteid.amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Date</span>
                <span className="font-medium text-stone-800">{deleteid.timeStamp}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-medium hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDeletion(deleteid)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
      {alert && <Alert message="Expense Deleted Successfully" />}
      <section
        id="allTransactions"
        className="bg-gradient-to-br from-stone-50 to-stone-100 flex flex-col gap-4 min-h-screen"
      >
        <div className="sticky top-0 backdrop-blur-md bg-white/70 z-10 flex justify-between w-full px-6 py-4 items-center border-b border-stone-200">
          <Link to="/HomePage" className="hover:opacity-70 transition-opacity">
            <img src={ArrowLeft} alt="Go Back" className="w-6 h-6" />
          </Link>
          <p className="text-xl font-medium text-stone-800">Transactions</p>
          <div className="w-6" />
        </div>

        <div className="flex flex-col gap-3 px-4 pb-6">
          {expenses.map((expense) => (
            <motion.div 
              className="flex justify-between px-5 bg-white rounded-xl py-3 shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
              key={expense.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex flex-col gap-1">
                <p className="font-medium text-lg text-stone-800">{expense.category}</p>
                <p className="text-stone-500 text-sm">
                  {expense.description.substring(0, 20)}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1 items-end">
                  <p className="text-red-500 font-semibold">{expense.amount}</p>
                  <p className="text-stone-400 text-sm">{expense.timeStamp}</p>
                </div>
                
                <button
                  onClick={() => deleteanExpense(expense.id, expense.category, expense.description, expense.timeStamp, expense.amount)}
                  className="text-red-600 hover:bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
          
          {expenses.length === 0 ? (
            <p className="text-stone-500 text-center py-8">No transactions yet</p>
          ) : (
            <p className="text-stone-500 text-sm text-center mt-4">
              End of transactions
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default AllTransactions;
