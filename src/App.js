import { ExpenseProvider } from "./sections/ExpenseContext";
import AddExpense from "./sections/AddExpense";
import AllTransactions from "./sections/AllTransactions";
import HomePage from "./sections/HomePage";
import SplashSceen from "./sections/SplashSceen";
import Stats from "./sections/Stats";
import Profile from "./sections/Profile";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
const App = () => {
  return (
    <main
      id="main"
      className="flex flex-column items-center justify-center max-h-[100vh]"
    >
      <section className="w-full sm:w-[60%] bg-white ">
        <ExpenseProvider>
          <Router>
            <Routes>
              <Route path="/" element={<SplashSceen />} />
              <Route path="/HomePage" element={<HomePage />} />
              <Route path="/AddExpense" element={<AddExpense />} />
              <Route
                path="/HomePage/AllTransactions"
                element={<AllTransactions />}
              />
              <Route path="/HomePage/Profile" element={<Profile/>} />
              <Route path="/Stats" element={<Stats/>} />
            </Routes>
          </Router>
        </ExpenseProvider>
      </section>
    </main>
  );
};
export default App;
