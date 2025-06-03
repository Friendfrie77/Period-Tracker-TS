// import { NavLink } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import logo2 from '../../assets/images/logo2.svg'
import { useOpenModals } from '../../hooks/useOpenModals';
import useUserInfo from "../../hooks/useUserInfo";
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { xShiftFadeIn } from "./layoutAnimations/animations";
import { useEffect } from "react";
//need to set up state for hooks
const Nav: React.FC = () =>{
    const {toggleLoginCall, toggleRegisterCall, toggleLocalModal} = useOpenModals();
    const {isAuth, role} = useUserInfo();
    const {logout} = useAuth();
    //useLogout Hook
    const dispatchLogout = () =>{
        logout();
    }
    const guestLogoutButton = () =>{
        logout();
    }
    useEffect(() =>{
        const checkbox = document.getElementById("mobile-nav-toggle") as HTMLInputElement
        const checkboxChanges = () =>{
            if(checkbox.checked){
                document.body.style.overflow = "hidden"
            }else{
                document.body.style.overflow = ""
            }
        }
        checkbox.addEventListener("change", checkboxChanges);
        return () => {
            checkbox.removeEventListener("change", checkboxChanges);
            document.body.style.overflow = "";
        };
    })
    //animations
    useEffect(() =>{
        xShiftFadeIn(".nav-container")
    })
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
                        {isAuth() ? (
                            <>
                            <li className='nav-item'>
                                <NavLink to='/'>Home</NavLink>
                            </li>
                            {/* <li className='nav-item'>
                                <NavLink to='/periodinfo'>Period Info</NavLink>
                            </li> */}
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
                            <li className="nav-item">
                                <button className='nav-button' onClick={toggleLocalModal}>Local Account</button>
                            </li>
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