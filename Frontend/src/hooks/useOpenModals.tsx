import {useState} from 'react';
//hook used to control modal state
const useOpenModals = (): {loginModalOpen:boolean, registerModalOpen: boolean, toggleLogin: () => void, toggleRegister: () => void} =>{
    const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
    const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false);

    const toggleLogin = () =>{
        setLoginModalOpen(!loginModalOpen)
    }

    const toggleRegister = () =>{
        setRegisterModalOpen(!registerModalOpen)
    }
    return {loginModalOpen, toggleLogin, registerModalOpen, toggleRegister}
}
export {useOpenModals}