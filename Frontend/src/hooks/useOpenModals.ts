import { useAppSelector, useAppDispatch} from "./useRedux"
import { toggleLogin, toggleRegister, toggleNav, toggleLocal, toggleWarning} from "../state/features/modals/modalsSlice"
//hook used to control modal state
const useOpenModals = (): {loginModalOpen:boolean, registerModalOpen: boolean, toggleLoginCall: () => void, toggleRegisterCall: () => void, toggleNavCall: () => void, localModalOpen:boolean, toggleLocalModal : () => void, warningModal:boolean, toggleWarningCall: () => void} =>{
    const loginModalOpen = useAppSelector((state) => state.modal.loginModal)
    const registerModalOpen = useAppSelector((state) => state.modal.registerModal)
    const localModalOpen = useAppSelector((state) => state.modal.localModal)
    const warningModal = useAppSelector((state) => state.modal.warningModal)

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
    const toggleLocalModal = () =>{
        dispatch(toggleLocal())
    }
    const toggleWarningCall = () =>{
        dispatch(toggleWarning())
    }
    return {loginModalOpen, toggleLoginCall, registerModalOpen, toggleRegisterCall, toggleNavCall, localModalOpen, toggleLocalModal, toggleWarningCall, warningModal} 
}
export {useOpenModals}