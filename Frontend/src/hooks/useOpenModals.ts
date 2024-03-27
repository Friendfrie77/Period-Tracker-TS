import { useAppSelector, useAppDispatch} from "./useRedux"
import { toggleLogin, toggleRegister, toggleNav } from "../state/features/modals/modalsSlice"
//hook used to control modal state
const useOpenModals = (): {loginModalOpen:boolean, registerModalOpen: boolean, toggleLoginCall: () => void, toggleRegisterCall: () => void, toggleNavCall: () => void} =>{
    const loginModalOpen = useAppSelector((state) => state.modal.loginModal)
    const registerModalOpen = useAppSelector((state) => state.modal.registerModal)

    const dispatch = useAppDispatch()
    const toggleLoginCall = () =>{
        dispatch(toggleLogin())
    }

    const toggleRegisterCall = () =>{
        dispatch(toggleRegister())
    }
    const toggleNavCall = () =>{
        dispatch(toggleNav())
    }
    return {loginModalOpen, toggleLoginCall, registerModalOpen, toggleRegisterCall, toggleNavCall}
}
export {useOpenModals}