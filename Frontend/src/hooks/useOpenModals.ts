import { useAppSelector, useAppDispatch} from "./useRedux"
import { toggleLogin, toggleRegister } from "../state/features/modals/modalsSlice"
//hook used to control modal state
const useOpenModals = (): {loginModalOpen:boolean, registerModalOpen: boolean, toggleLoginCall: () => void, toggleRegisterCall: () => void} =>{
    const loginModalOpen = useAppSelector((state) => state.modal.loginModal)
    const registerModalOpen = useAppSelector((state) => state.modal.registerModal)
    
    const dispatch = useAppDispatch()
    const toggleLoginCall = () =>{
        dispatch(toggleLogin())
    }

    const toggleRegisterCall = () =>{
        dispatch(toggleRegister())
    }
    return {loginModalOpen, toggleLoginCall, registerModalOpen, toggleRegisterCall}
}
export {useOpenModals}