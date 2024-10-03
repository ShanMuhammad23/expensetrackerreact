import { ArrowLeft, expenses } from "../constants"
import { Link } from "react-router-dom"

const AllTransactions = () => {
  return (
    <section id="allTransactions" className="bg-gradient-to-r from-[#FFF6E5] via-[#FFF6E5] to-[#F8EDD8] flex flex-col gap-4 max-h-[100vh] min-h-[100vh]">
        <div className=" flex justify-between w-2/3 px-8 mb-12 py-2 items-center">
           <Link to='/HomePage'><img src={ArrowLeft} alt="Go Back" /></Link> 
            <p className="text-lg font-semibold">Transactions</p>
        </div>
        <div className="flex flex-col gap-4 px-4 sticky w-full top-24 overflow-y-scroll">
            {expenses.map((expense)=>(
                <div className="flex justify-between px-8 bg-[#FCFCFC] rounded-full py-2">
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-lg">{expense.catagory}</p>
                        <p className="text-gray-500">{expense.description}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-red-500 font-bold">{expense.amount}</p>
                        <p className="text-gray-500">{expense.timeStamp}</p>

                    </div>
                </div>
            ))}
                                <p className="text-red-600 font-bold text-center mb-4">No More Transactions</p>

        </div>
    </section>
  )
}

export default AllTransactions
