import {useState} from 'react';
import { NavLink } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import logo2 from '../../assets/images/logo2.svg'
//need to set up state for hooks

// interface NavProps {
//     onDataSentLogin: (message: boolean) => void,
//     onDataSentReg: (message: boolean) => void
// }
const Nav: React.FC = () =>{
    const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
    const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false);
    console.log(loginModalOpen, registerModalOpen)
    //usePeriod hook imports
    //placeholders for those imports
    const token : number = 0; 
    const role : string = '';
    //useLogout Hook
    const dispatchLogout = () =>{

    }
    const guestLogoutButton = () =>{

    }
    const openLogin = () =>{
        setLoginModalOpen(true)
    }
    const openRegister = () =>{
        setRegisterModalOpen(true)
    }

    const navBar = (
        <header>
            <nav className = 'nav'>
                <div className='nav-container'>
                    <div className='logo'>
                        <img src = {logo2} height='50px' width='50px'></img>
                    </div>
                    <input id = 'mobile-nav-toggle' type ='checkbox' />
                    <label className='mobile-nav-container' htmlFor='mobile-nav-toggle'>
                        <div className='mobile-nav' id = 'mobile-nav'></div>
                    </label>
                    <ul className='nav-links' id='nav-links'>
                        {token ? (
                            <>
                            <li className='nav-item'>
                                <NavLink to='/home'>Home</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/periodinfo'>Period Info</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/profile'>Profile</NavLink>
                            </li>
                            {role === 'User' ?(
                                <li className='logout'>
                                    <button onClick = {dispatchLogout}>
                                        <CiLogout></CiLogout>
                                    </button>
                                </li>
                            ):(
                                <li className='logout'>
                                    <button onClick = {guestLogoutButton}>
                                        <CiLogout></CiLogout>
                                    </button>
                                </li>
                            )}
                            </>
                        ):(
                            <>
                            <li className='nav-item'>
                                <button className='nav-button' onClick={openLogin}>Login</button>
                            </li>
                            <li className='nav-item'>
                                <button className='nav-button' onClick={openRegister}>Register</button>
                            </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    )
    return navBar
}
export default Nav;