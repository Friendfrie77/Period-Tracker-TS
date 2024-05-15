import {useState} from 'react'
import { useMessage} from "../../context/MessageContext/MessageContext";
import { AiOutlineClose } from "react-icons/ai";
import PageFade from "../layout/PageFade";
import AlertCheckMark from "./AlertCheckMark";
const AlertMessage: React.FC = () =>{
    const [isSecondAnimation, setisSecondAnimation] = useState(false)
    const {message, messageState, messageType} = useMessage();
    const clearMessage = () =>{
        messageState(null, null)
    }
    const pageFadeInOver = () =>{
        setisSecondAnimation(true)
    }
    messageState('Account deleted', 'success')
    const content = message ? (
        <PageFade>
            <div className={`message-container fade-in ${messageType}`} onAnimationEnd={pageFadeInOver}>
                <AiOutlineClose className="right-align" onClick={clearMessage}></AiOutlineClose>
                <AlertCheckMark showCheckMark= {true} animationClass={`${isSecondAnimation ? 'checkmark-circle' : null}`} innerAnimationClass ={``} />
                <span>{message}</span>
            </div>
        </PageFade>
    ):null
    return content
}
export default AlertMessage;