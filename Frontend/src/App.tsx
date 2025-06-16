import { BrowserRouter, Routes, Navigate, Route} from "react-router-dom";
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import LandingPage from "./pages/landingPage/Landing";
import useUserInfo from "./hooks/useUserInfo";
import LoggedInUserIndex from "./pages/loggedInUserIndex/LoggedInUserIndex";
import AccountSetup from "./pages/newAccountDatePicker/AccountSetup";
import UserProfile from "./pages/userProfile/UserProfile";
import PrivacyPage from "./pages/additionalInfoPages/Privacy";
import './syles/syles.css';
import { useAppSelector } from "./hooks/useRedux";
import { MessageProvider } from "./context/MessageContext/MessageContext";
function App() {
  const toggleNav = useAppSelector((state) => state.modal.showNav)
  const {isAuth} =useUserInfo()
  const isNewAccount = true
  return (
    <BrowserRouter>
      <MessageProvider>
        <div className={`${toggleNav? 'wrapper' : 'wrapper-no-nav'}`}>
          {toggleNav? (
              <Nav />
          ): null}
            <Routes>
              <Route path = '/' element = {isAuth() ?  <LoggedInUserIndex /> : <LandingPage />} />
              <Route path ='/accountsetup' element = {isNewAccount ? <AccountSetup /> : <Navigate to='/' />} />
              <Route path='/profile' element = {isAuth() ? <UserProfile /> : <Navigate to='/' />} />
              {/* <Route path='/privacy ' element = {<PrivacyPage />} /> */}
            </Routes>
            {toggleNav?(<Footer />): null}
        </div>
      </MessageProvider>
    </BrowserRouter>
  )
}

export default App
