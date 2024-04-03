import DateStrip from './DateStrip'
type UserWelcomeBarProps = {
    userName?: string,
    periodStartDate?: string,
    periodEndDate?: string,
}
const UserWelcomeBar: React.FC<UserWelcomeBarProps> = ({userName, periodStartDate, periodEndDate}) =>{
    const content =(
        <div className='homepage-header'>
            <h1>Welcome back {userName},</h1>
            {periodStartDate && periodEndDate ?(
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