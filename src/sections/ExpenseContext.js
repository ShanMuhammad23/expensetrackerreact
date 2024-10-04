import React, { createContext, useContext, useReducer, useEffect,useState } from "react";
import { expenses as initialExpenses } from "../constants";

const ExpenseContext = createContext();

const ADD_EXPENSE = "ADD_EXPENSE";
const DELETE_EXPENSE = "DELETE_EXPENSE";

const expenseReducer = (state, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return [action.payload, ...state];
    case DELETE_EXPENSE:
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, dispatch] = useReducer(expenseReducer, [], () => {
    const localData = localStorage.getItem("expenses");
    return localData ? JSON.parse(localData) : [];

    return initialExpenses;
  });
  

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    dispatch({
      type: ADD_EXPENSE,
      payload: { ...expense, id: Date.now() },
    });
  };

  const deleteExpense = (id) => {
    dispatch({
      type: DELETE_EXPENSE,
      payload: id,
    });
  };

  const contextValue = {
    expenses,
    addExpense,
    deleteExpense,
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }
  return context;
};
