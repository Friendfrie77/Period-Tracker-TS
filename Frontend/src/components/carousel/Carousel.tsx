import Carousel, {ResponsiveType} from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import type { CarouselWrapperImg } from "../../types/components.types";

type CarouselWrapperProps ={
    imgs: CarouselWrapperImg
}
const CarouselWrapper: React.FC<CarouselWrapperProps> = ({imgs}) => {
    const responsiveList: ResponsiveType  = {
        desktop: {
            breakpoint: { max: Number.MAX_VALUE, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 1,
        },
        mobile: {
            breakpoint: {max: 768, min: 0},
            items: 1
        }
    };
    imgs.forEach(e =>{
        console.log(e.url)
    })
    const content = (
        <Carousel
            responsive={responsiveList}
            swipeable={false}
            draggable={false}
            showDots={true}
            infinite={true}
            arrows={true}
            centerMode={false}
            containerClass="img-carousel-wrapper"
        >
            {imgs.map((e,i) => {
                return(
                    <div className="carousel-slide" key={i}>
                        <img src={e.url} alt='test'/>
                    </div>
                )
            })}
        </Carousel>
    )
    return content
};

export default CarouselWrapper;
