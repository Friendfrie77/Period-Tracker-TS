import { useState } from "react";
import { useMessage} from "../../context/MessageContext/MessageContext";
type AlertCheckMarkProps = {
    showCheckMark: boolean;
    animationClass: string | null;
}
const AlertCheckMark: React.FC<AlertCheckMarkProps> = ({showCheckMark, animationClass}) =>{
    const {messageType} = useMessage()
    const [isCircleOver, setCircleOver] = useState(false);
    const circleOver = () =>{
        setCircleOver(true)
    }
    const content = showCheckMark ? (
        <div className="animated-checkmark">
            <div className={`circle ${messageType} ${animationClass}`} onAnimationEnd={circleOver}>
                <div className={`${messageType} ${isCircleOver ? 'checkmark' : null}`}></div>
            </div>
        </div>
    ) : null

    return content
}
export default AlertCheckMark