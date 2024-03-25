import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import LoginModal from './components/modal/LoginModal';
import LandingPage from "./pages/landingPage/Landing";
import useUserInfo from "./hooks/useUserInfo";
import LoggedInUserIndex from "./pages/loggedInUserIndex/LoggedInUserIndex";
import './syles/syles.css';
function App() {
  
  const user = useUserInfo("token");
  const isAuth : boolean = !!user 
  // const isAuth : boolean = true
  return (
    <div className="wrapper">
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {isAuth ?  <LoggedInUserIndex /> : <LandingPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
