import {useState} from 'react'
import { Form } from "react-final-form";
import Spinner from "../layout/Spinner";
import useLoading from "../../hooks/useLoading";
import { useOpenModals } from "../../hooks/useOpenModals";
import { AiOutlineClose } from "react-icons/ai";
import useLocalAccount from "../../hooks/useLocalAccount";

//have user enter file
//if user does not have a file move to calender

const LocalModal : React.FC = () =>{
    const {isLoading} = useLoading();
    const {toggleLocalModal} = useOpenModals();
    const {createLocalAccount, parseUserFile} = useLocalAccount();
    const [userFile, setUserFile] = useState(null)
    const userFileChange = (event) =>{
        setUserFile(event.target.files[0])
    };
    const onSubmit = () => {
        createLocalAccount(userFile)
    }
    const content = isLoading ? <Spinner /> : (
        <section className="login-wrapper">
            <AiOutlineClose onClick={toggleLocalModal} className="exit-button" />
            <div className='modal-text'>
                <h1>Local Account</h1>
                <p>If you are worried about your data being stored in a server somewhere this is the perfect option for you. You will also have the option to export all your data whenever you need it to a spreadsheet. The only time your data is sent over the network is when calculating when your period is, and it is not sent with any identifying information and is never saved.</p>
                <p>You can either enter your data via a spreadsheet, formatted like the table below or enter it during setup.</p>
                <Form
                    onSubmit={onSubmit}
                    render={({handleSubmit}) =>(
                        <form onSubmit={handleSubmit}>
                            <input type='file' accept=".xlsx, .ods, .xls" onChange={userFileChange}></input>
                            <button className='button'>Next</button>
                        </form>
                    )}
                />
                <div>
                    <input type="file" accept=".xlsx,.ods,.xls" onChange ={userFileChange}></input>
                    <button className="button" onClick={onSubmit}>Next</button>
                </div>
            </div>
        </section>
    )
    return content
}
export default LocalModal;