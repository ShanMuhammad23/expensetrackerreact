import React, { createContext, useContext, useReducer, useEffect } from "react";
import { expenses as initialExpenses } from "../constants";
import axios from 'axios';

const ExpenseContext = createContext();
const UserContext = createContext();
const PopupContext = createContext();

// Action Types
const ADD_EXPENSE = "ADD_EXPENSE";
const DELETE_EXPENSE = "DELETE_EXPENSE";
const ADD_USER = "ADD_USER";
const SHOW_USERFORM = "SHOW_USERFORM";
const HIDE_USERFORM = "HIDE_USERFORM";
const SET_EXPENSES = "SET_EXPENSES";
const SET_LOADING = "SET_LOADING";
const SET_ERROR = "SET_ERROR";

// Expense Reducer
const expenseReducer = (state, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return [action.payload, ...state];
    case DELETE_EXPENSE:
      return state.filter((expense) => expense.id !== action.payload);
    case SET_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
        loading: false,
        error: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
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

// Popup Reducer
const popupReducer = (state, action) => {
  switch (action.type) {
    case SHOW_USERFORM:
      return { ...state, showAddUserForm: true };
    case HIDE_USERFORM:
      return { ...state, showAddUserForm: false };
    default:
      return state;
  }
};

// Custom Hooks
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
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};

// Providers
export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, {
    expenses: initialExpenses,
    loading: false,
    error: null
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      dispatch({ type: SET_LOADING });
      try {
        const response = await axios.get('http://localhost:3001/api/expenses');
        dispatch({
          type: SET_EXPENSES,
          payload: response.data
        });
      } catch (error) {
        console.error('Error fetching expenses:', error);
        dispatch({
          type: SET_ERROR,
          payload: "Could not fetch expenses from server"
        });
      }
    };

    fetchExpenses();
  }, []);

  const addExpense = async (expense) => {
    try {
      const response = await axios.post('http://localhost:3001/api/expenses', expense);
      dispatch({
        type: ADD_EXPENSE,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error adding expense:', error);
      dispatch({
        type: SET_ERROR,
        payload: "Could not add expense"
      });
    }
  };

  const deleteExpense = (id) => {
    dispatch({
      type: DELETE_EXPENSE,
      payload: id,
    });
  };

  return (
    <ExpenseContext.Provider value={{ 
      ...state,  // This will expose loading and error states
      addExpense, 
      deleteExpense 
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null, () => {
    const localData = localStorage.getItem("user");
    return localData ? JSON.parse(localData) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const addUser = (userData) => {
    const newUser = { ...userData, id: Date.now() };
    dispatch({
      type: ADD_USER,
      payload: newUser,
    });
  };

  return (
    <UserContext.Provider value={{ user, addUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const PopupProvider = ({ children }) => {
  const [popupState, dispatch] = useReducer(popupReducer, {
    showAddUserForm: false
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    dispatch({ 
      type: storedUser ? HIDE_USERFORM : SHOW_USERFORM 
    });
  }, []);

  const toggleUserForm = () => {
    dispatch({ 
      type: popupState.showAddUserForm ? HIDE_USERFORM : SHOW_USERFORM 
    });
  };

  return (
    <PopupContext.Provider value={{ 
      showAddUserForm: popupState.showAddUserForm, 
      toggleUserForm 
    }}>
      {children}
    </PopupContext.Provider>
  );
};

// Combined Provider Component
export const AppProvider = ({ children }) => {
  return (
    <ExpenseProvider>
      <UserProvider>
        <PopupProvider>
          {children}
        </PopupProvider>
      </UserProvider>
    </ExpenseProvider>
  );
};