import Carousel, {ResponsiveType} from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import type { CarouselWrapperImg } from "../../types/components.types";

type CarouselWrapperProps ={
    imgs: CarouselWrapperImg
    text?: string
    onSlideChange?: (index: number) => void;
}

const CarouselWrapper: React.FC<CarouselWrapperProps> = ({imgs, onSlideChange}) => {
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
    const content = (
        <Carousel
            responsive={responsiveList}
            swipeable={false}
            draggable={false}
            showDots={true}
            infinite={true}
            arrows={true}
            centerMode={false}
            {...(onSlideChange && {beforeChange: (currentSlide) => {
                const imgWrapper = document.querySelector(`[data-index='${currentSlide}']`)?.querySelector('img')
                const index = imgWrapper?.getAttribute('data-index')
                if(!index){
                    onSlideChange(0)
                }else{
                    onSlideChange(Number(index))
                }
            }})}
            containerClass="img-carousel-wrapper"
        >
            {imgs.map((e,i) => {
                return(
                    <div className="carousel-slide" key={i}>
                        <img data-index={i} src={e.url} alt={e.alt}/>
                    </div>
                )
            })}
        </Carousel>
    )
    return content
};

export default CarouselWrapper;
