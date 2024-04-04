import DateStrip from './DateStrip'
import useUserInfo from "../../hooks/useUserInfo";
type UserWelcomeBarProps ={
    showDateStrip: boolean
}
const UserWelcomeBar: React.FC<UserWelcomeBarProps> = ({showDateStrip}) =>{
    const {username, periodStartDate, periodEndDate} = useUserInfo()
    const content =(
        <div className='homepage-header'>
            <h1>Welcome back {username},</h1>
            {periodStartDate && periodEndDate && showDateStrip ?(
                <DateStrip
                    startDate={periodStartDate}
                    endDate={periodEndDate}
                />
            ): null}
        </div>
    )
    return content;
}
export default UserWelcomeBar