import PageFade from "../../components/layout/PageFade";
import LoginModal from "../../components/modal/LoginModal";
import RegisterModal from "../../components/modal/RegisterModal";
import IndexInfoCard from "../../components/indexPageCard/InfoCard";
import { useOpenModals } from "../../hooks/useOpenModals";
import Phone from "../../assets/images/phone-test.png";
import Laptop from '../../assets/images/laptop.jpg';
import {useNavigate} from 'react-router-dom';
const LandingPage: React.FC = () =>{
    const navigate = useNavigate();
    const {loginModalOpen, registerModalOpen, toggleRegisterCall, toggleNavCall} = useOpenModals();
    const indexCardColors : {
        color1: string,
        color2: string,
        color4: string,
        color5: string,
        color6: string,
        textColor: string
    } = {
        color1: '#8FDDC3',
        color2: '#241E4E',
        color4: '#5C0F47',
        color5: '#8FDDC3',
        color6: '#5CFFC9',
        textColor:'#EAE8FF',
    }
    const demoAccount = () =>{
        toggleNavCall();
        navigate('/accountsetup',{state: {fromApp: true}} )
    }
    const content = (
        <main className="content">
            <section className="hero">
                <div className="hero-wrapper">
                    <div className="call-to-action">
                        <div className="cta-statement">
                            <h1>Experience Red Moon Diary</h1>
                            <p>Stay organized and informed about your menstrual cycle with our period tracker. Receive helpful text alerts to keep you on track.</p>
                        </div>
                        <div className='cta-new-account'>
                            <h2>Get started below and start staying informed today</h2>
                            <button className='button cta-button' onClick={(toggleRegisterCall)}>Join Now</button>
                        </div>
                    </div>
                    <div className="hero-img">
                        <img src={Phone} width = 'auto' height = '90%' />
                    </div>
                </div>
            </section>
            <section>
                <IndexInfoCard 
                    styles={{ backgroundColor: indexCardColors.color2, color: indexCardColors.textColor }}
                    contentTypeOne='img'
                    contentTypeTwo='txt'
                    txtContentType='text'
                    hasButton={true}
                    buttonLink = {false}
                    link = '/'
                    buttonFunction={demoAccount}
                    buttonTxt='Demo Now'
                    contentImg={Laptop}
                    txtHeader="Tracking Your Period: Made Easy"
                    txtContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna fermentum iaculis eu non. Porttitor leo a diam sollicitudin tempor id eu nisl. Odio ut sem nulla pharetra diam sit amet. Commodo viverra maecenas accumsan lacus vel facilisis volutpat. In hac habitasse platea dictumst. Ut placerat orci nulla pellentesque dignissim enim sit. " 
                    imgAlt={""} 
                    hasLink={false}
                />
                <IndexInfoCard 
                    styles={{ backgroundColor: indexCardColors.color2, color: indexCardColors.textColor }}
                    contentTypeOne='txt'
                    contentTypeTwo='img'
                    hasButton={false}
                    hasLink={true}
                    linkTxt="Find out more"
                    contentImg={Laptop}
                    txtHeader="Privacy Focused "
                    txtContent="" 
                    txtContentType={""} 
                    imgAlt={""} 
                    link={""}                
                    />
            </section>
            {loginModalOpen &&
                <PageFade>
                    <LoginModal />
                </PageFade>
            }
            {registerModalOpen &&
                <PageFade>
                    <RegisterModal />
                </PageFade>
            }
        </main>
    );
    return content;
}
export default LandingPage;