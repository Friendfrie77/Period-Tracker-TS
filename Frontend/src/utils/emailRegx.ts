interface emailRegexResults{
    isVaild: boolean
}
const emailRegex = (email:string) : emailRegexResults =>{
    const emailRegex : RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return ({isVaild : emailRegex.test(email)})
}

export {emailRegex}

