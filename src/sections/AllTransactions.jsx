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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="mx-auto z-50 max-w-lg rounded-xl border border-stone/10 bg-white/95 w-[95%] m-auto p-6 shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <span className="shrink-0 rounded-full bg-red-600 p-2 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="white"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>

              <p className="font-medium sm:text-lg text-red-600">
                Delete this expense?
              </p>
            </div>

            <div className="text-gray-600 mt-4 mb-2 flex flex-col gap-2 ml-12">
               <p className="text-lg font-semibold">Category: {deleteid.category}</p>
                <p>Description: {deleteid.description}</p>
                <p>Amount: {deleteid.amount}</p>
                <p>Added On: {deleteid.timeStamp}</p>
            </div> 
            

            <div className="mt-6 sm:flex sm:gap-4">
              <a
              onClick={(()=>{confirmDeletion(deleteid)})}
                href="#"
                className="inline-block w-full rounded-lg bg-red-600 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
              >
                Yes
              </a>

              <a
              onClick={(()=>{setConfirm(false)})}
                href="#"
                className="mt-2 inline-block w-full rounded-lg bg-stone-300 px-5 py-3 text-center text-sm font-semibold text-gray-800 sm:mt-0 sm:w-auto"
              >
                No
              </a>
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
                  <p className="text-red-500 font-semibold">₹{expense.amount}</p>
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
