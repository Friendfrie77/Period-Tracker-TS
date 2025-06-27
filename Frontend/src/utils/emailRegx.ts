import type { returnIsVaild } from "../types/types";

const emailRegex = (email:string) : returnIsVaild =>{
    const emailRegex : RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return ({isVaild : emailRegex.test(email)})
}

export {emailRegex}

