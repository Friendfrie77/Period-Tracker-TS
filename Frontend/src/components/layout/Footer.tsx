import { useLocation } from "react-router-dom";
import useUserInfo from "../../hooks/useUserInfo";

const Footer: React.FC = () =>{
    const {isAuth} = useUserInfo()
    const location = useLocation()
    const year: number = new Date().getFullYear();
    const footer = (
        <footer aria-label="Main Footer">
            {/* {!isAuth() && location.pathname === '/'  &&(
                <div className="footer-info">
                    <div className="footer-info-section">
                        <span>App</span>
                        <ul>
                            <li>Login</li>
                            <li>Register</li>
                            <li>Local Account</li>
                            <li>Demo</li>
                        </ul>
                    </div>
                </div>
            )} */}
            <span>&copy; {year} <a href='albertfriend.dev' target='_blank' rel = 'noopener noreferrer'>Red Moon Diary</a></span>
        </footer>
    )
    return footer;
}
export default Footer