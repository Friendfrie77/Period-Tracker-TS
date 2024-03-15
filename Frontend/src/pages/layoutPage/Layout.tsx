import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/Footer";
import { ReactNode } from "react";
type LayoutProps = {
    content?: ReactNode
}

const Layout: React.FC<LayoutProps> = ({content}) =>{
    return(
        <main>
            <Nav/>
            {content} 
            <Footer />
        </main>
    )
}
export default Layout;