import { Form } from "react-final-form";
import Spinner from "../layout/Spinner";
import UserTextField from "../userInputFields/UserTextField";
import UserFileField from '../userInputFields/UserFileField';
import useLoading from "../../hooks/useLoading";
import { useData } from "../../hooks/useData";
import { useOpenModals } from "../../hooks/useOpenModals";
import { AiOutlineClose } from "react-icons/ai";
import useLocalAccount from "../../hooks/useLocalAccount";
import useAuth from "../../hooks/useAuth";
import { useMessage } from '../../context/MessageContext/MessageContext';
import { useNavigate } from "react-router-dom";
import type { valuesTypes } from './modals.types';
//have user enter file
//if user does not have a file move to calender

const LocalModal : React.FC = () =>{
    const navigate = useNavigate();
    const {isLoading} = useLoading();
    const {toggleLocalModal} = useOpenModals();
    const {message} = useMessage()
    const {calcUserData} = useData()
    const {createLocalAccount} = useLocalAccount();
    const {localAccount} = useAuth()

    const onSubmit = async (values:valuesTypes) => {
        const userInfo = await createLocalAccount(values)
        if(userInfo.isVaild){
            const token = await localAccount(values)
            if(token){
                toggleLocalModal()
                if(userInfo.hasData){
                    calcUserData(userInfo.data)
                }else{
                    //test if data is saved
                    navigate('/accountsetup', {state:{fromApp: true}}) 
                }
            }
        }
    }
    const content = isLoading ? <Spinner /> : (
        <section className="login-wrapper">
            <AiOutlineClose onClick={toggleLocalModal} className="exit-button" />
            <div className='modal-text'>
                <span className='error body-text'>{message}</span>
                <h1>Local Account</h1>
                <p>If you are worried about your data being stored in a server somewhere this is the perfect option for you. You will also have the option to export all your data whenever you need it to a spreadsheet. The only time your data is sent over the network is when calculating when your period is, and it is not sent with any identifying information and is never saved.</p>
                <p>You can either enter your data via a spreadsheet, formatted like the table below or enter it during setup.</p>
                <Form
                    onSubmit={onSubmit}
                    validate = {(values:valuesTypes)=>{
                        const errors:{
                            username?: string
                        } = {}
                        if(!values.username){
                            errors.username = 'Required'
                        }
                        return errors
                    }}
                    render={({handleSubmit}) =>(
                        <form onSubmit={handleSubmit}>
                            <UserFileField
                                name='file'
                                accept = '.xlsx, .ods, .xls'
                            />
                            <UserTextField
                                fieldName='username'
                                type='text'
                                spanHTMLFor='username'
                                span = 'User Name'
                                isDisabled = {false}
                            />
                            <button className='button'>Next</button>
                        </form>
                    )}
                />
            </div>
        </section>
    )
    return content
}
export default LocalModal;