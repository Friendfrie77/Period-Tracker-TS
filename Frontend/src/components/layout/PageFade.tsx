type PageFadeProps = {
    children: React.ReactNode
};

const PageFade: React.FC<PageFadeProps> = ({children}) =>{
    return(
        <div className="page-fade">
            {children}
        </div>
    )
}
export default PageFade