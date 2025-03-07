import { CSSProperties} from "react";
import { NavLink } from "react-router-dom";

type InfoCardProps ={
    styles: CSSProperties,
    contentTypeOne: string,
    contentTypeTwo?: string,
    txtHeader: string,
    txtContentType: string,
    txtContent: string[] | string,
    contentImg?: string,
    imgAlt?: string,
    hasButton: boolean,
    hasLink: boolean,
    link?: string,
    buttonTxt?: string,
    buttonLink?: boolean,
    buttonFunction?: () => void;
    linkTxt?: string,
}
const IndexInfoCard: React.FC<InfoCardProps> =({styles, contentTypeOne, contentTypeTwo, txtHeader, txtContentType, txtContent, contentImg, imgAlt, hasButton, hasLink, link, buttonTxt, linkTxt, buttonLink, buttonFunction}) =>{
    const content = (
        <section className='info-card' style={styles}>
            <div className='card-content-wrapper flex-row-to-col'>
                {contentTypeOne === 'txt' || contentTypeOne == 'text' ?(
                    <div className={`card-text-content ${contentTypeTwo == null ? "no-img" : null}`}>
                        <h1>{txtHeader}</h1>
                        {txtContentType ==='txt' || txtContentType === 'text'?(
                            <p>{txtContent}</p>
                        ): txtContentType === 'list'?(
                            <ul>
                                {Array.isArray(txtContent) &&
                                    txtContent.map((txtListItem) =>(
                                        <li>{txtListItem}</li>
                                    ))
                                }
                            </ul>
                        ): null}
                        <div>
                            {hasButton ?(
                                <div className = 'card-cta-button-container'>
                                    {buttonLink ?(
                                        <NavLink className='card-cta-button' to={link}>{buttonTxt}</NavLink>
                                    ): <button className="card-cta-button" onClick = {buttonFunction}>{buttonTxt}</button>}
                                </div>
                            ): hasLink ?(
                                <NavLink className='card-cta-link' to={link}>{linkTxt} <span>&#8594;</span></NavLink>
                            ): null}
                        </div>
                    </div>
                ): contentTypeOne ==='img'?(
                    <picture className='card-text-content'>
                        <img src={contentImg} alt={imgAlt} />
                    </picture>
                ):null}
                {contentTypeTwo === 'txt' || contentTypeTwo == 'text' ?(
                    <div className='card-text-content'>
                        <h1>{txtHeader}</h1>
                        {txtContentType ==='txt' || txtContentType === 'text'?(
                            <p>{txtContent}</p>
                        ): txtContentType === 'list'?(
                            <ul>
                                {Array.isArray(txtContent) &&
                                    txtContent.map((txtListItem) =>(
                                        <li>{txtListItem}</li>
                                    ))
                                }
                            </ul>
                        ): null}
                        <div>
                            {hasButton ?(
                                <div className = 'card-cta-button-container'>
                                    {buttonLink ?(
                                        <NavLink className='card-cta-button' to={link}>{buttonTxt}</NavLink>
                                    ): <button className="card-cta-button" onClick = {buttonFunction}>{buttonTxt}</button>}
                                </div>
                            ): hasLink ?(
                                <NavLink className='card-cta-link' target="_blank" to={link}>{linkTxt} <span>&#8594;</span></NavLink>
                            ): null}
                        </div>
                    </div>
                ): contentTypeTwo ==='img'?(
                    <picture className='card-text-content'>
                        <img src={contentImg} alt={imgAlt} />
                    </picture>
                ):null}
            </div>
        </section>
    )
    return content;
}
export default IndexInfoCard;