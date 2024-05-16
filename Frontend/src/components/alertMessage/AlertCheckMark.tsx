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
    console.log(isCircleOver)
    const content = showCheckMark ? (
        <div className="animated-checkmark">
            <div className={`circle ${messageType} ${animationClass}`} onAnimationEnd={circleOver}>
                <div className={`${messageType} ${isCircleOver ? 'checkmark' : null}`}></div>
            </div>
        </div>
    ) : (
        <div className="animated-checkmark">
            <div className={`circle ${messageType} ${animationClass}`} onAnimationEnd={circleOver}>
                <div className={`x-mark ${isCircleOver ? 'x-mark-animation-before x-mark-animation-after' : null}`}></div>
            </div>
        </div>
    )

    return content
}
export default AlertCheckMark