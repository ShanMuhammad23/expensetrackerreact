import React from "react";
import { ArrowLeft } from "../constants";

const AddExpense = () => {
  return (
    <section
      id="AddExpense"
      className="bg-gradient-to-r from-[#FFF6E5] via-[#FFF6E5] to-[#F8EDD8]"
    >
      <div className="flex px-8 gap-24 py-4">
        <img src={ArrowLeft} alt="Left Arrow" />
        <p className="font-bold ">Add a Transaction</p>
      </div>
      <div className="flex flex-col gap-4 px-8 mt-16 ">
        <p className=" text-xl ">How Much</p>
        <input
          type="number"
          className="rounded-full p-2 bg-transparent border"
        />
      </div>
      <div className="bg-white rounded-tl-3xl p-4 mt-4">
        <div className="flex flex-col gap-2">
          <label for="catagory">Catagory</label>

          <select
            id="catagory"
            className="rounded-full p-2 bg-transparent border"
          >
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Rent">Rent</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 mt-4 ">
          <label for="description">Description</label>
          <textarea
            name="description"
            id="description"
            className="p-2 rounded-2xl bg-transparent border"
          ></textarea>
        </div>
        <div className="flex justify-evenly mt-4 w-[90%] m-auto">
            <button className="text-red-500 border border-red-800 rounded-full px-4 py-2">Expense</button>
            <button className="text-green-500 border border-green-800 rounded-full px-4 py-2">Income</button>
        </div>
        <div className="flex items-center justify-center mt-4 ">
        <button className="text-white text-3xl  bg-green-700 px-8 py-2 rounded-xl ">Add</button>
        </div>
      </div>
    </section>
  );
};

export default AddExpense;
