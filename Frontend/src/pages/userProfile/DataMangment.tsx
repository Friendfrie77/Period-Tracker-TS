import UserFileField from "../../components/userInputFields/UserFileField";
import { useState} from "react";
import {Form} from "react-final-form";
import useData from "../../hooks/useData";
import useAuth from "../../hooks/useAuth";
import useUserInfo from "../../hooks/useUserInfo";
import { DateRange} from 'react-date-range';
import { AiOutlineClose } from "react-icons/ai";
import { format } from "date-fns";
import type {previousPeriod} from "../../state/state.types";
const DataMangment:React.FC = () =>{
    type datesType = {
        startDate?: Date;
        endDate?: Date;
        key?: string;
    }
    const {previousPeriod} = useUserInfo();
    const {updateUsersPeriods} = useAuth();
    const {exportData, } = useData();
    const [newPeriod, setNewPeriod] = useState<previousPeriod>([])
    const [removedPeriods, setRemovedPeriods] = useState<previousPeriod>([])
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
        setRemovedPeriods([prevPeriodPlaceholder![index]])
        setPrevPeriodPlaceholder(prev => prev.filter((_,i) => i !== index))
    }
    const cancelRemovedPeriod = (index:number) =>{
        setPrevPeriodPlaceholder(prev => [...prev, removedPeriods[index]])
        setRemovedPeriods(prev => prev.filter((_,i) => i !== index))
    }
    const onDataSubmit = () =>{
        
    }

    //replace current way
    const onNewPeriodSubmit = () =>{
        updateUsersPeriods(newPeriod)
    }
    const updateNewPeriod = (date:datesType) =>{
        //need to make sure dates are not put in twice, can pull funtion from a hook
        //make sure 
        //need to make sure that the same date isnt entered two times. use messege to tell user if it is?
        if ((!date.startDate || !date.endDate)) return;
        if(date.startDate === date.endDate) return;
        const newDates = {startDate: format(date.startDate, 'yyyy-MM-dd'), endDate: format(date.endDate, 'yyyy-MM-dd')}
        if(newPeriod.length === 0){
            setNewPeriod([newDates])
        }else(
            setNewPeriod([...newPeriod, newDates])
        )
    }
    console.log(removedPeriods.length)
    // const exportData = () =>{

    // }
    //Function to add
    //function to remove
    //state to keep track of add/remove
    // console.log(newPeriod)
    //check if date is the same day on 1st load
    const content = (
        <>
            <h1 className='subheader-text'>Data Mangment</h1>
            <div className="profile-cards">
                <div className="flex-center">
                    <h1>Period Mangment</h1>
                </div>
                <div>
                    <h1>Add</h1>
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
                    <div>
                        {newPeriod.length ? (
                        <>
                        <h1 className="text-align-center">New Periods to Add:</h1>
                        <ul>
                            {newPeriod.map((e, i) =>(
                                <li key={i}>
                                    <span>Start Date: {format( new Date(e.startDate), 'MMMM dd yyyy')} - End Date: {format(new Date(e.endDate), 'MMMM dd yyyy')}</span><span className="span-close"><AiOutlineClose onClick={() => removeNewDate(i)} /></span>
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
                        <div className="div-border-right">
                            <h1 className="text-align-center">Current Periods:</h1>
                            <ul className="data-page-ul">
                                {prevPeriodPlaceholder?.map((e, i) =>(
                                    <li key={i}>
                                        <span>Start Date: {format( new Date(e.startDate), 'MMMM dd yyyy')} - End Date: {format(new Date(e.endDate), 'MMMM dd yyyy')}</span><span className="span-close"><AiOutlineClose onClick={() => removePrevPeriodDate(i)} /></span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h1 className="text-align-center">Periods to be Removed:</h1>
                            {!removedPeriods.length ? (
                                <span>No Periods Set to be Removed</span>
                            ):(
                                <>
                                <ul>
                                    {removedPeriods?.map((e, i) =>(
                                        <li key={i}>
                                            <span>Start Date: {format( new Date(e.startDate), 'MMMM dd yyyy')} - End Date: {format(new Date(e.endDate), 'MMMM dd yyyy')}</span><span className="span-close"><AiOutlineClose onClick={() => cancelRemovedPeriod(i)} /></span>
                                        </li>
                                    ))
                                    }
                                </ul>
                                </>
                            )}
                        </div>
                    </div>
                    <button type='submit' className="button">Submit</button>
                </div>
            </div>
            <div className="profile-cards">
                <div className="flex-center">
                    <h1>Data Handling</h1>
                    <p>Would you like to import more data, or export your periods?</p>
                </div>
                <hr/>
                <div className="flex-row-to-col flex-row-gap-1rem">
                    <div className="flex-col">
                            <h1>Import Data</h1>
                            <p>Please upload a spreadsheet of the data you would like to upload. The file format needs to be .xlsx, .ods, or .xls.</p>
                            <Form
                                onSubmit={onDataSubmit}
                                render={({handleSubmit}) =>(
                                    <form onSubmit={handleSubmit}>
                                        <UserFileField name="file" accept ='.xlsx, .ods, .xls'/>
                                    </form>
                                )}
                            />
                    </div>
                    <hr />
                    <div className="flex-col">
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