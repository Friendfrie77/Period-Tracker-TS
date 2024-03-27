// import { NavLink } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import logo2 from '../../assets/images/logo2.svg'
import { useOpenModals } from '../../hooks/useOpenModals';
import useUserInfo from "../../hooks/useUserInfo";
import useAuth from "../../hooks/useAuth";
//need to set up state for hooks
const Nav: React.FC = () =>{
    const {toggleLoginCall, toggleRegisterCall} = useOpenModals();
    const {isAuth, role} = useUserInfo();
    const {logout} = useAuth();
    //useLogout Hook
    const dispatchLogout = () =>{
        logout();
    }
    const guestLogoutButton = () =>{

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
                        {isAuth ? (
                            <>
                            {/* <li className='nav-item'>
                                <NavLink to='/home'>Home</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/periodinfo'>Period Info</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/profile'>Profile</NavLink>
                            </li> */}
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
                                <button className='nav-button' onClick={toggleLoginCall}>Login</button>
                            </li>
                            <li className='nav-item'>
                                <button className='nav-button' onClick={toggleRegisterCall}>Register</button>
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