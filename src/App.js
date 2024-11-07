import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ExpenseProvider, UserProvider } from "./sections/ExpenseContext";
import { useEffect, useState } from "react";

// Import components
import AddExpense from "./sections/AddExpense";
import AllTransactions from "./sections/AllTransactions";
import HomePage from "./sections/HomePage";
import Stats from "./sections/Stats";
import SplashScreen from "./sections/SplashSceen";
import Profile from "./sections/Profile";

const App = () => {
  // Added default value
 

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <section className="w-full sm:w-3/5 bg-white">
        <ExpenseProvider>
          <UserProvider>
            <Router>
              <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route
                  path="/HomePage"
                  element={<HomePage  />}
                />
                <Route
                  path="/Profile"
                  element={
                    <Profile
                     
                    />
                  }
                />
                <Route path="/AllTransactions" element={<AllTransactions />} />
                <Route path="/AddExpense" element={<AddExpense />} />
                <Route path="/Stats" element={<Stats />} />
              </Routes>
            </Router>
          </UserProvider>
        </ExpenseProvider>
      </section>
    </main>
  );
};

export default App;
