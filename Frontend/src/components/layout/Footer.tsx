const Footer: React.FC = () =>{
    const year: number = new Date().getFullYear();
    const footer = (
        <footer>
            <span>&copy; {year} <a href='albertfriend.dev' target='_blank' rel = 'noopener noreferrer'>Albert Friend</a></span>
        </footer>
    )
    return footer;
}
export default Footer