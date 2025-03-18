const DataMangment:React.FC = () =>{
    const content = (
        <>
            <h1 className='subheader-text'>Data Mangment</h1>
            <div className="profile-cards">
                <h1>Period Mangment</h1>
                <p>Do you need to add or remove a period?</p>
            </div>
            <div className="profile-cards">
                <h1>Data Handling</h1>
                <p>Would you like to import more data, or export your periods?</p>
            </div>
        </>
    )
    return content
}

export default DataMangment