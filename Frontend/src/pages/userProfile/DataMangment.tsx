import UserFileField from "../../components/userInputFields/UserFileField";
import {Form} from "react-final-form";
import useData from "../../hooks/useData";
const DataMangment:React.FC = () =>{
    const {exportData} = useData();
    const onDataSubmit = () =>{
        
    }
    // const exportData = () =>{

    // }
    const content = (
        <>
            <h1 className='subheader-text'>Data Mangment</h1>
            <div className="profile-cards">
                <h1>Period Mangment</h1>
                <p>Do you need to add or remove a period?</p>
                
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