type PageFadeProps = {
    content: React.ReactNode
};

const PageFade: React.FC<PageFadeProps> = ({content}) =>{
    return(
        <div className="page-fade">
            {content}
        </div>
    )
}
export default PageFade