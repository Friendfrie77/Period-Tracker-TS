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
const LandingPage: React.FC = () =>{
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
                    buttonFunction={demoAccount}
                    buttonTxt='Find out more'
                    contentImg={Laptop}
                    txtHeader="Privacy Focused"
                    txtContent="Are you worried about your information being tracked? We have options to run the app without sending any data to a server or instructions on how to run everything locally. All your data never leaves your pc and can be cleared at the press of a button. " 
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
                    txtContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna fermentum iaculis eu non. Porttitor leo a diam sollicitudin tempor id eu nisl. Odio ut sem nulla pharetra diam sit amet. Commodo viverra maecenas accumsan lacus vel facilisis volutpat. In hac habitasse platea dictumst. Ut placerat orci nulla pellentesque dignissim enim sit. " 
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
                    linkTxt='Github page'
                    txtHeader="Simple to Set Up at Home"
                    txtContent="We have made a simple-to-follow guide that will allow just about anyone to set up local at-home tracking quickly. This is great if you want the full features of the app but still care about your data privacy. You can find more at the GitHub link below." 
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