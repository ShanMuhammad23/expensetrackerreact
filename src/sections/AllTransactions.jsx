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
        <div className="fixed z-50 w-full h-screen flex items-center justify-center">
          <motion.div
          initial={{scale:0.5}}
          whileInView={{scale:1}}

          

            role="alert"
            className="mx-auto z-50 max-w-lg rounded-lg border border-stone bg-stone-100 w-[95%] m-auto p-4 shadow-lg sm:p-6 lg:p-8"
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
        className="bg-gradient-to-r from-[#e0d4be] via-[#cfb78a] to-[#cdc7ba] flex flex-col gap-4 max-h-[100vh] min-h-[100vh]"
      >
        <div className=" flex justify-between w-2/3 px-8 mb-12 py-2 items-center">
          <Link to="/HomePage">
            <img src={ArrowLeft} alt="Go Back" />
          </Link>
          <p className="text-lg font-semibold">Transactions</p>
        </div>
        <div className="flex flex-col gap-4 px-4 sticky w-full top-24 overflow-y-scroll">
          {expenses.map((expense) => (
            <motion.div className="flex justify-between px-4 bg-[#FCFCFC] rounded-lg py-2" key={expense.id}
            initial={{translateY:10}}
            whileInView={{translateY:0}}
            
            >
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-lg">{expense.category}</p>
                <p className="text-gray-500">
                  {expense.description.substring(0, 20)}
                </p>
              </div>
              <div className="flex items-center gap-2 ">
                <div className="flex flex-col gap-2 border-r-2 px-1">
                  <p className="text-red-500 font-bold">{expense.amount}</p>
                  <p className="text-gray-500">{expense.timeStamp}</p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      deleteanExpense(expense.id,expense.category,expense.description,expense.timeStamp,expense.amount);
                    }}
                    className=" text-red-600 border border-red-600 p-1  flex items-center justify-center rounded-lg cursor-pointer"
                  >
                    Delete
                  </button>
                  
                </div>
              </div>
              
            </motion.div>
          ))}
          <p className="text-red-600 font-bold text-center mb-4">
            No More Transactions
          </p>
        </div>
      </section>
    </>
  );
};

export default AllTransactions;
