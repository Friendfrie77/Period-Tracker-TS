import { useEffect, useState } from "react";
import Spinner from "../../components/layout/Spinner"
import useLoading from "../../hooks/useLoading"
import useUserInfo from "../../hooks/useUserInfo"
import useAuth from "../../hooks/useAuth";
import useDemoAccount from "../../hooks/useDemoAccount";
import { DateRange } from 'react-date-range';
import {Form} from 'react-final-form';
import UserTextField from "../../components/userInputFields/UserTextField";
import { useLocation, useNavigate } from "react-router-dom";
import { useOpenModals } from "../../hooks/useOpenModals";
//test for local account saving
const AccountSetup: React.FC = () =>{
    type datesType = {
        startDate?: Date;
        endDate?: Date;
        key?: string;
    }
    type valTypes ={
        username: string;
    }

    const navigate = useNavigate();
    const{previousPeriod, updateUserDates, id} = useUserInfo();
    const {isAuth, updateUsersPeriods} = useAuth()
    const {setupDemoAccount} = useDemoAccount();
    const {isLoading} = useLoading();
    const {toggleNavCall} = useOpenModals();
    const [date, setDate] = useState<datesType[]>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])
    const accountInfoButton = () =>{
        updateUsersPeriods(previousPeriod)
        // sendUserPrevPeriods(previodPeriod)
    }
    const demoAccountbutton = (val:valTypes) =>{
        setupDemoAccount(val, previousPeriod)
    }

    const localAccountButton = () =>{
        toggleNavCall()
        navigate('/')
    }
    useEffect(() =>{
        updateUserDates(date)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[date])
    useEffect(() =>{
        if(!state?.fromApp){
            navigate('/')
        }   
    })
    const {state} = useLocation();
    const userAuth = isAuth();
    console.log(_id)
    const content = isLoading? <Spinner /> : (
        <main className="content-no-nav flex-center">
            <section className="flex-center account-setup-wrapper">
                {userAuth ?(
                    <>
                    <h1 className="header-text">When was your last few periods?</h1>
                    <p className="body-text">Just select them below, and once your done hit next. Please try to make them as close as you can.</p>
                    </>
                ):(
                    <>
                    <h1 className="header-text">Welcome to the demo!</h1>
                    <p className="body-text">You can select dates if you would like, but it is not required, all we need is something to call you by.</p>
                    </>
                )
                }
                <DateRange
                    editableDateInputs={true}
                    showMonthAndYearPickers={false}
                    fixedHeight = {true}
                    moveRangeOnFirstSelection={false}
                    onChange={item => setDate([item.selection])}
                    ranges={date}
                />
                {userAuth ?(
                    <button type='submit' className="button reg-button" onClick={_id == 'localUser' ? localAccountButton : accountInfoButton}>Next</button>
                ): (
                    <Form 
                        onSubmit={demoAccountbutton}
                        validate={(values:valTypes)=>{
                            const errors:{
                                username?: string
                            } = {};
                            if(!values.username){
                                errors.username = 'Required'
                            }
                            return errors
                        }}
                        render = {({handleSubmit, valid}) =>(
                            <form className="flex-center" onSubmit={handleSubmit}>
                                <UserTextField 
                                    fieldName="username"
                                    type="text"
                                    span='Name'
                                    spanHTMLFor="name"
                                    isDisabled = {false}
                                />
                                <button className="button" type="submit" disabled={!valid}>Next</button>
                            </form>
                        )}
                    />
                )}
            </section>
       </main>
    )
    return content;
}

export default AccountSetup