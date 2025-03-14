import PageFade from "../../components/layout/PageFade";
import LoginModal from "../../components/modal/LoginModal";
import RegisterModal from "../../components/modal/RegisterModal";
import LocalModal from "../../components/modal/LocalModal";
import IndexInfoCard from "../../components/indexPageCard/InfoCard";
import { useOpenModals } from "../../hooks/useOpenModals";
import Phone from "../../assets/images/phone-test.png";
import Laptop from '../../assets/images/laptop.jpg';
import {useNavigate} from 'react-router-dom';
import AlertMessage from "../../components/alertMessage/AlertMessage";
import { xShiftFadeIn } from "../../components/layout/layoutAnimations/animations";
import { useEffect } from "react";

const LandingPage: React.FC = () =>{
    useEffect(() =>{
        xShiftFadeIn(".hero-wrapper")
    })
    const navigate = useNavigate();
    const {loginModalOpen, registerModalOpen, localModalOpen, toggleLocalModal, toggleRegisterCall, toggleNavCall} = useOpenModals();
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
    const localAccountInfo = () =>{
        console.log('test')
    }
    const content = (
        <main className="content">
            <AlertMessage/>
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
                    styles={{ backgroundColor: indexCardColors.color4, color: indexCardColors.textColor }}
                    contentTypeOne='img'
                    contentTypeTwo='txt'
                    txtContentType='text'
                    hasButton={true}
                    buttonLink = {false}
                    link = '/'
                    buttonFunction={localAccountInfo}
                    buttonTxt='Find out more'
                    contentImg={Laptop}
                    txtHeader="Privacy Focused"
                    txtContent="Are you worried about your data being sent to a server somewhere, sold, or even worse leaked online? We have options to store all your data locally in your internet browser's memory. With options to export the data if you are not happy or need to switch browsers. You can find out more below." 
                    imgAlt={""} 
                    hasLink={false}
                />
                <section className = 'feature-card'>
                    <div className = 'flex-row-to-col flex-center features-list'>
                        <h1>Features</h1>
                        <ul className="list-columns">
                            <li>Privacy First</li>
                            <li>test</li>
                            <li>test</li>
                            <li>test</li>
                            <li>test</li>
                            <li>Docker compatable</li>
                        </ul>
                    </div>
                </section>
                <IndexInfoCard 
                    styles={{ backgroundColor: indexCardColors.color2, color: indexCardColors.textColor }}
                    contentTypeOne='txt'
                    contentTypeTwo='img'
                    txtContentType='text'
                    hasButton={true}
                    buttonLink = {false}
                    link = '/'
                    buttonFunction={demoAccount}
                    buttonTxt='Demo Now'
                    contentImg={Laptop}
                    txtHeader="Tracking Your Period: Made Easy"
                    txtContent="Are you looking for a simple-to-use period app to help you keep track of your menstrual cycle that isn't going to sell your data or use it to try to sell you a product? Look no further! All you need to do is provide some of your past cycle information and we will do our best to estimate your next period. With options to send text alerts or email alerts for when your cycle is a few days away so you can be prepared." 
                    imgAlt={""} 
                    hasLink={false}
                />
                <IndexInfoCard 
                    styles={{ backgroundColor: indexCardColors.color2, color: indexCardColors.textColor }}
                    contentTypeOne='txt'
                    txtContentType='text'
                    hasButton={false}
                    buttonLink = {false}
                    link = 'https://github.com/Friendfrie77/Period-Tracker-TS'
                    linkTxt='Find out more here'
                    txtHeader="Simple to Set Up at Home"
                    txtContent="Are you tech-savvy or just looking for a period app that you can self-host so you know where your data is going? We offer a full guide on how to set up the app using Docker. This allows you to have all the features of the full app while having the privacy and control of running it locally. You can find the guide below." 
                    hasLink={true}
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
            {localModalOpen &&
                <PageFade>
                    <LocalModal />
                </PageFade>
            }
        </main>
    );
    return content;
}
export default LandingPage;