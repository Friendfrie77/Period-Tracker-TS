import PageFade from "../../components/layout/PageFade";
import LoginModal from "../../components/modal/LoginModal";
import RegisterModal from "../../components/modal/RegisterModal";
import LocalModal from "../../components/modal/LocalModal";
import IndexInfoCard from "../../components/indexPageCard/InfoCard";
import { useOpenModals } from "../../hooks/useOpenModals";
import Phone from "../../assets/images/phone-test.webp";
// import Hero from "../../assets/images/hero-test.webp"
import Laptop from '../../assets/images/laptop.jpg';
import {useNavigate} from 'react-router-dom';
import AlertMessage from "../../components/alertMessage/AlertMessage";
import { xShiftFadeIn } from "../../components/layout/layoutAnimations/animations";
import { useEffect } from "react";
import useUserInfo from "../../hooks/useUserInfo";

const LandingPage: React.FC = () =>{
    const {test} = useUserInfo();
    console.log(test)
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
        <main className="landing-page-conent-wrapper">
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
                    </div>
                </div>
            </section>
            <section>
                <IndexInfoCard 
                    styles={{ backgroundColor: indexCardColors.color4, color: indexCardColors.textColor }}
                    contentTypeOne='img'
                    contentTypeTwo='txt'
                    txtContentType='text'
                    hasButton={false}
                    buttonLink = {false}
                    linkTxt="Find out more"
                    link = '/privacy'
                    buttonFunction={localAccountInfo}
                    contentImg={Laptop}
                    txtHeader="Privacy Focused"
                    txtContent="Are you worried about your data being sent to a server somewhere, sold, or even worse leaked online? We have options to store all your data locally in your internet browser's memory. With options to export the data if you are not happy or need to switch browsers. You can find out more below." 
                    imgAlt={""} 
                    hasLink={true}
                    linkTarget="_self"
                />
                <section className = 'feature-section'>
                    <h1>What can Red Moon Diary do for you?</h1>
                    <div className = 'content-flex-row'>
                        <div className="img-carouel-wrapper flex-center">
                            <img src={Phone} width='50%' height='auto'/>
                        </div>
                        <div className="features-wrapper flex-col flex-col-gap-1rem">
                            <div className="feature">
                                <div className="feature-img">
                                    <img src={Phone} width='100%' height='auto'/>
                                </div>
                                <div className="feature-text">
                                    <h1>Easily import and export your information</h1>
                                    <p>With the Red Moon Diary, you can easily import and export your dates for your period. We support all forms of spreadsheets. Imports and exports are as simple as one click.</p>
                                </div>
                            </div>
                            <div className="feature">
                                <div className="feature-img">
                                    <img src={Phone} width='100%' height='auto'/>
                                </div>
                                <div className="feature-text">
                                    <h1>Easily see when your period is near</h1>
                                    <p>With our simple UI, you can see at a glance how many days are left until your next period or when your period is ending.</p>
                                </div>
                            </div>
                            <div className="feature">
                                <div className="feature-text">
                                    <h1>Easily import and export your information</h1>
                                    <p></p>
                                </div>
                            </div>
                        </div>
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
                <section className = 'feature-card'>
                    <div className = 'flex-row-to-col flex-center features-list'>
                    </div>
                </section>
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
                    linkTarget="_blank"
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