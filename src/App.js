import AddExpense from "./sections/AddExpense";
import HomePage from "./sections/HomePage";
import Menu from "./sections/Menu";
import SplashSceen from "./sections/SplashSceen";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
const App=()=> {
  return (
    <main id="main" className="flex flex-column items-center justify-center">
      <section className="w-full sm:w-[60%] bg-white ">
        <Router>
          <Routes>
          <Route path="/" element={<SplashSceen/>}/>
          <Route path="HomePage" element={<HomePage/>}/>
          <Route path="AddExpense" element={<AddExpense/>}/>


          </Routes>
          <Menu/>
        </Router>
     

      </section>
    </main>
  )
}
export default App;