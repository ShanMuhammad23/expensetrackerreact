import HomePage from "./sections/HomePage";
import SplashSceen from "./sections/SplashSceen";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
const App=()=> {
  return (
    <main id="main" className="bg-black flex flex-column items-center justify-center">
      <section className="mt-4 sm:w-[60%] bg-white ">
        <Router>
          <Routes>
          <Route path="/" element={<SplashSceen/>}/>
          <Route path="HomePage" element={<HomePage/>}/>

          </Routes>
        </Router>
     

      </section>
    </main>
  )
}
export default App;