import React, { createContext, useContext, useReducer, useEffect } from "react";
import { expenses as initialExpenses } from "../constants";

const ExpenseContext = createContext();
const UserContext = createContext();
const PopupContext = createContext();

// Action Types
const ADD_EXPENSE = "ADD_EXPENSE";
const DELETE_EXPENSE = "DELETE_EXPENSE";
const ADD_USER = "ADD_USER";
const SHOW_USERFORM = "SHOW_USERFORM";
const HIDE_USERFORM = "HIDE_USERFORM";

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