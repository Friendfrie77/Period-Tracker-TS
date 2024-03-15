import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import HelloWorld from './components/Hello';
import LoginModal from './components/modal/LoginModal';
// import './styles/styles.css';
import './syles/syles.css';
function App() {
  
  const isAuth : boolean = false
  return (
    <>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {isAuth ?  <HelloWorld /> : <LoginModal />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
