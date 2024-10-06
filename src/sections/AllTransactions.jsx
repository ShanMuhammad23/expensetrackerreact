import { ArrowLeft, expenses } from "../constants";
import { Link } from "react-router-dom";
import { useExpense } from "./ExpenseContext";
import { useState } from "react";
import Alert from "../Components/Alert";
import { motion } from "framer-motion";

const AllTransactions = () => {
  const { deleteExpense } = useExpense();
  const [deleteid,setDeleteId]=useState("")
  const [alert, setAlert] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const { expenses } = useExpense();
  function deleteanExpense(id) {
    setConfirm(true);
    setDeleteId(id)
    return id
  }
  function confirmDeletion(id){
    deleteExpense(id);
    setAlert(true);
    setConfirm(false);
    setTimeout(() => {
        setAlert(false)
    }, 2000);
  }
  return (
    <>
      {confirm && (
        <div className=" z-50 w-full h-screen flex items-center justify-center">
          <motion.div
          initial={{scale:0.5}}
          whileInView={{scale:1}}
          

            role="alert"
            class="mx-auto z-50 max-w-lg rounded-lg border border-stone bg-stone-100 w-[95%] m-auto p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <div class="flex items-center gap-4">
              <span class="shrink-0 rounded-full bg-red-600 p-2 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="white"
                  class="h-4 w-4"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>

              <p class="font-medium sm:text-lg text-red-600">
                Delete this expense?
              </p>
            </div>

            

            <div class="mt-6 sm:flex sm:gap-4">
              <a
              onClick={(()=>{confirmDeletion(deleteid)})}
                href="#"
                class="inline-block w-full rounded-lg bg-red-600 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
              >
                Yes
              </a>

              <a
              onClick={(()=>{setConfirm(false)})}
                href="#"
                class="mt-2 inline-block w-full rounded-lg bg-stone-300 px-5 py-3 text-center text-sm font-semibold text-gray-800 sm:mt-0 sm:w-auto"
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
            <motion.div className="flex justify-between px-8 bg-[#FCFCFC] rounded-full py-2"
            initial={{translateY:10}}
            whileInView={{translateY:0}}
            >
              <div className="flex flex-col gap-2">
                <p className="font-bold text-lg">{expense.category}</p>
                <p className="text-gray-500">
                  {expense.description.substring(0, 20)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-2">
                  <p className="text-red-500 font-bold">{expense.amount}</p>
                  <p className="text-gray-500">{expense.timeStamp}</p>
                </div>
                <div>
                  <p
                    onClick={() => {
                      deleteanExpense(expense.id);
                    }}
                    className="text-lg text-red-600 border border-red-600 p-2 h-8 w-8 flex items-center justify-center rounded-full cursor-pointer"
                  >
                    X
                  </p>
                  
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
