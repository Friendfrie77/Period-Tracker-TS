import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import LandingPage from "./pages/landingPage/Landing";
import useUserInfo from "./hooks/useUserInfo";
import LoggedInUserIndex from "./pages/loggedInUserIndex/LoggedInUserIndex";
import './syles/syles.css';
function App() {
  const {token} =useUserInfo()
  const isAuth : boolean = !!token 
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
