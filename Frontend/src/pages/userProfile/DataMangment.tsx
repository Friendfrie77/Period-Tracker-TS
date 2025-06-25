import UserFileField from "../../components/userInputFields/UserFileField";
import { useState} from "react";
import {Form} from "react-final-form";
import useData from "../../hooks/useData";
import useUserInfo from "../../hooks/useUserInfo";
import useLocalAccount from "../../hooks/useLocalAccount";
import { DateRange} from 'react-date-range';
import { AiOutlineClose } from "react-icons/ai";
import dayjs from "dayjs";
import type {previousPeriod} from "../../types/types";
import { useMessage } from "../../context/MessageContext/MessageContext";
const DataMangment:React.FC = () =>{
    type datesType = {
        startDate?: Date;
        endDate?: Date;
        key?: string;
    }
    type FormValues = {
        file?: File;
    }
    const { setMessageState, message, messageType} = useMessage();
    const {previousPeriod, checkIfDateIsPresent,id} = useUserInfo();
    const {parseUserFile, validateFile} = useLocalAccount();
    const {exportData, updateUsersPeriods, checkForDuplicates, sortaArrayData} = useData();
    const [newPeriod, setNewPeriod] = useState<previousPeriod>([]);
    const [removedPeriods, setRemovedPeriods] = useState<previousPeriod>([]);
    const [prevPeriodPlaceholder, setPrevPeriodPlaceholder] = useState<previousPeriod>(previousPeriod ?? []);
    const [date, setDate] = useState<datesType[]>([
    {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }
    ])
 
    const removeNewDate = (index:number) =>{
        setNewPeriod(prev => prev.filter((_, i) => i !== index))
    }
    const removePrevPeriodDate = (index:number) =>{
        setRemovedPeriods(prev =>[...prev, prevPeriodPlaceholder![index]])
        setPrevPeriodPlaceholder(prev => prev.filter((_,i) => i !== index))
    }
    const cancelRemovedPeriod = (index:number) =>{
        setPrevPeriodPlaceholder(prev => [...prev, removedPeriods[index]])
        setRemovedPeriods(prev => prev.filter((_,i) => i !== index))
    }
    const onDataSubmit = async (val:FormValues) =>{
        if(validateFile(val.file!)){
            const userInfo = await parseUserFile(val.file!)
            if(userInfo){
                let uniqueDates = checkForDuplicates(userInfo!)
                uniqueDates = sortaArrayData(uniqueDates)
                updateUsersPeriods(uniqueDates)
            }
        }else{
            setMessageState('Invaild File Format', 'error')
            return
        }
    }
    // const onRemoveSubmit = () =>{

    // }
    const updateNewPeriod = (date:datesType) =>{
        if ((!date.startDate || !date.endDate)) return;
        if(date.startDate === date.endDate) return;

        const newDates = {startDate: dayjs(date.startDate).format('YYYY-MM-DD').toString(), endDate: dayjs(date.endDate).format('YYYY-MM-DD').toString()}
        if(checkIfDateIsPresent(previousPeriod!, [newDates]) || checkIfDateIsPresent(newPeriod, [newDates])){
            setMessageState('Date is already present!', 'error')
            return
        }
        if(newPeriod.length === 0){
            setNewPeriod([newDates])
        }else(
            setNewPeriod([...newPeriod, newDates])
        )
        if(message){
            setMessageState(null, null)
        }
    }
    const content = (
        <>
            <h1 className='subheader-text'>Data Mangment</h1>
            <div className="profile-cards">
                <div className="flex-center">
                    <h1>Period Mangment</h1>
                </div>
                <div>
                    <h1>Select Dates to Add</h1>
                    <div>
                        <DateRange
                            showMonthAndYearPickers={false}
                            fixedHeight = {true}
                            moveRangeOnFirstSelection={false}
                            ranges = {date}
                            onChange={(ranges) =>{
                                setDate([ranges.selection])
                                updateNewPeriod(ranges.selection)
                            }}
                        />
                    </div>
                    <div className="flex-center">
                        {message ? (
                            <span className={messageType! === 'error' ? `warning message` : 'success message'}>{message}</span>
                        ): null}
                        {newPeriod.length ? (
                        <>
                        <h1 className="text-align-center">New Periods to Add:</h1>
                        <ul>
                            {newPeriod.map((e, i) =>(
                                <li className="period-date-item" key={i}>
                                    <span>Start Date:</span>
                                    <span>{dayjs(e.startDate).format('MMM DD YYYY')}</span>
                                    <span>- End Date:</span>
                                    <span>{dayjs(e.endDate).format('MMM DD YYYY')}</span>
                                    <span className="span-close"><AiOutlineClose onClick={() => removeNewDate(i)} /></span>
                                </li>
                            ))}
                        </ul>
                        <button type='submit' className="button" onClick={()=>updateUsersPeriods(newPeriod)}>Submit</button>
                        </>
                        ):
                        <h1 className="text-align-center">No New Periods to Add</h1>
                        }
                    </div>
                </div>
                <hr className="hr-full-width"/>
                <div className="flex-col">
                    <h1 className="text-align-center">Remove a Period</h1>
                    <div className="flex-row-to-col">
                        <div className="div-border-right flex-child-row-to-col">
                            <h1 className="text-align-center">Current Periods:</h1>
                            <ul className="data-page-ul">
                                {prevPeriodPlaceholder?.map((e, i) =>(
                                    <li className="period-date-item" key={i}>
                                        <span>Start Date:</span>
                                        <span>{dayjs(e.startDate).format('MMM DD YYYY')}</span>
                                        <span>- End Date:</span>
                                        <span>{dayjs(e.endDate).format('MMM DD YYYY')}</span>
                                        <span className="span-close"><AiOutlineClose onClick={() => removePrevPeriodDate(i)} /></span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-child-row-to-col">
                            <h1 className="text-align-center">Periods to be Removed:</h1>
                            {!removedPeriods.length ? (
                                <span>No Periods Set to be Removed</span>
                            ):(
                                <>
                                <ul>
                                    {removedPeriods?.map((e, i) =>(
                                        <li className="period-date-item" key={i}>
                                            <span>Start Date:</span>
                                            <span>{dayjs(e.startDate).format('MMM DD YYYY')}</span>
                                            <span>- End Date:</span>
                                            <span>{dayjs(e.endDate).format('MMM DD YYYY')}</span>
                                            <span className="span-close"><AiOutlineClose onClick={() => cancelRemovedPeriod(i)} /></span>
                                        </li>
                                    ))
                                    }
                                </ul>
                                </>
                            )}
                        </div>
                    </div>
                    <button type='submit' className="button" disabled={removedPeriods.length === 0} onClick = {() => updateUsersPeriods(prevPeriodPlaceholder)}>Submit</button>
                </div>
            </div>
            <div className="profile-cards">
                <div className="flex-center">
                    <h1>Data Handling</h1>
                    <p>Would you like to import more data, or export your periods?</p>
                </div>
                <hr className="hr-full-width"/>
                <div className="flex-row-to-col flex-row-gap-1rem">
                    <div className="flex-col flex-child-row-to-col div-border-right">
                            <h1>Import Data</h1>
                            <p>Please upload a spreadsheet of the data you would like to upload. The file format needs to be .xlsx, .ods, or .xls.</p>
                            <Form<FormValues>
                                onSubmit={onDataSubmit}
                                render={({handleSubmit, values}) =>(
                                    <form onSubmit={handleSubmit} className="flex-col flex-row-gap-1rem">
                                        <div className="flex-row flex-space-even">
                                            <UserFileField name="file" accept ='.xlsx, .ods, .xls'/>
                                            <button type='submit' className="button">Submit</button>
                                        </div>
                                        {values && values.file ?(
                                            <>
                                            <span className="text-align-center">Selected File: {values.file.name}</span>
                                            </>
                                        ): null}
                                    </form>
                                )}
                            />
                    </div>
                    <div className="flex-col flex-child-row-to-col">
                        <h1>Export Data</h1>
                        <p>Click the button below to export your data. The data will export in a .ods file.</p>
                        <button className="button" onClick= {exportData}>Export</button>
                    </div>
                </div>
            </div>
        </>
    )
    return content
}

export default DataMangment