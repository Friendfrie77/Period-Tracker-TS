import { BrowserRouter, Routes, Route} from "react-router-dom";
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import LandingPage from "./pages/landingPage/Landing";
import useUserInfo from "./hooks/useUserInfo";
import LoggedInUserIndex from "./pages/loggedInUserIndex/LoggedInUserIndex";
import AccountSetup from "./pages/newAccountDatePicker/AccountSetup";
import './syles/syles.css';
import { useAppSelector } from "./hooks/useRedux";
function App() {
  const toggleNav = useAppSelector((state) => state.modal.showNav)
  const {isAuth} =useUserInfo()
  const isNewAccount = true
  return (
    <div className={`${toggleNav? 'wrapper' : 'wrapper-no-nav'}`}>
      {toggleNav? (
          <Nav />
      ): null}
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {isAuth ?  <LoggedInUserIndex /> : <LandingPage />} />
          <Route path ='/accountsetup' element = {isNewAccount ? <AccountSetup /> : <LandingPage />} />
        </Routes>
      </BrowserRouter>
      {toggleNav?(
        <Footer />
      ): null}
    </div>
  )
}

export default App
