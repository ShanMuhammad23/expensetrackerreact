import { downArrow, expenses, upArrow } from "../constants";
import { useState } from "react";

const HomePage = () => {
    const [filteractive,setFilteractive]=useState(false)
    return (
       
        <section id="HomePage" className="bg-[#C6C6C6]">
            <div className="bg-gradient-to-r from-[#FFF6E5] via-[#FFF6E5] to-[#F8EDD8] p-4  rounded-b-xl ">
                <div className="flex justify-between">
                    <p className="text-xl">November 06, 2024</p>
                    <div>
                        <img />
                        <p className="text-lg">Shan</p>
                    </div>

                </div>
                <hr className="bg-black mt-4" />
                <div className="flex flex-col items-center mt-6">
                    <p className="text-[14px] text-[#91919F]">Account Balance</p>
                    <p className="font-semibold text-[40px]">12200</p>
                </div>

                <div className="flex justify-between gap-4 mt-6">
                    <div className="w-[164px] h-[80px] flex items-center bg-[#00A86B] rounded-xl text-white p-2 gap-2">
                        <img src={downArrow} className="h-[50px] w-[60px] bg-white rounded-full " />
                        <div className="">
                            <p>Income</p>
                            <p className="font-semibold text-[22px]">12000</p>
                        </div>
                    </div>
                    <div className="w-[164px] h-[80px] flex items-center bg-[#FD3C4A] rounded-xl text-white p-2 gap-2">
                        <img src={upArrow} className="h-[50px] w-[60px] bg-white rounded-full" />
                        <div>
                            <p>Expenses</p>
                            <p className="font-semibold text-[22px]">10000</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="text-white w-[80%] m-auto flex justify-between gap-2 mt-6 border-2 border-white  rounded-full">
                 <button className={`${filteractive}bg-black text-white px-4 py-2 rounded-full font-bold`} onClick={(()=>{setFilteractive(true)})}>Today</button>
                 <button className="py-2">Weekly</button>
                 <button className="py-2">Monthly</button>
                 <button className="py-2">Yearly</button>
                </div>
                <div className="flex justify-between items-center w-[80%] m-auto mt-4">
                    <button>Recent Transactions</button>
                    <button>View All</button> 
                </div>
                <div className="w-[80%] m-auto gap-4 flex flex-col mt-4 ">
                    {expenses.map((expense)=>(
                        <div className="flex items-center justify-between bg-[#D9D9D9] py-2 px-4 rounded-md">
                            <div className="flex items-center gap-4">
                            <img src={expense.img} className="h-[40px]"/>
                            <p className="font-semibold text-lg">{expense.amount}</p>
                            </div>
                            <div className="flex justify-start w-[20%] mx-2">
                            <p className="text-left">{expense.catagory}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HomePage
