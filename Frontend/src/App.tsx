import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import LoginModal from './components/modal/LoginModal';
import LandingPage from "./pages/landingPage/Landing";
import './syles/syles.css';
function App() {
  
  const isAuth : boolean = true
  return (
    <div className="wrapper">
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {isAuth ?  <LandingPage /> : <LoginModal />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
