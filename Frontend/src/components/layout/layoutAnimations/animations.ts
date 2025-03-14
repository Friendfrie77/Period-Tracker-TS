import {gsap} from 'gsap';

const xShiftFadeIn = (classSelector:string) =>{
    gsap.fromTo(classSelector, {
        opacity: 0,
        x: -100,
    },{
        opacity: 1,
        x: 0,
        duration: .5,
        // ease: "back.in(12)"
    })
}

export {xShiftFadeIn}