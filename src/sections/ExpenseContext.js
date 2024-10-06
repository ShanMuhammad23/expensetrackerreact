import React, { createContext, useContext, useReducer, useEffect } from "react";
import { expenses as initialExpenses } from "../constants";

const ExpenseContext = createContext();
const UserContext=createContext();

// Action Types
const ADD_EXPENSE = "ADD_EXPENSE";
const DELETE_EXPENSE = "DELETE_EXPENSE";
const ADD_USER="ADD_USER"
const SHOW_USERFORM="SHOW_USERFORM"

// Expense Reducer
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





// Expense Provider
export const ExpenseProvider = ({ children }) => {
  const [expenses, dispatch] = useReducer(expenseReducer, [], () => {
    const localData = localStorage.getItem("expenses");
    return localData ? JSON.parse(localData) : initialExpenses;
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

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

// Custom Hooks for Expense and User Context
export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }
  return context;
};


export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }
  return context;
};


// User Reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case ADD_USER:
      return action.payload;
    
    default:
      return state;
  }
};

// User Provider
export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, {}, (initialArg) => {
    const localData = localStorage.getItem("user");
    return localData ? JSON.parse(localData) : initialArg;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const addUser = (user) => {
    dispatch({
      type: ADD_USER,
      payload: { ...user, id: Date.now() },
    });
  };
const showuserform =(ShowUserForm)=>{
  dispatch({
    type:SHOW_USERFORM,
    
  })
}
  
  return (
    <UserContext.Provider value={{ user, addUser}}>
      {children}
    </UserContext.Provider>
  );
};

