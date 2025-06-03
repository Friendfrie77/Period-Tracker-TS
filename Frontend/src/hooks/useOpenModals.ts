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
        const navCheckBox = document.getElementById("mobile-nav-toggle") as HTMLInputElement;
        navCheckBox.checked ? navCheckBox.checked = false : null
        dispatch(toggleLogin())
    }
    const toggleRegisterCall = () =>{
        const navCheckBox = document.getElementById("mobile-nav-toggle") as HTMLInputElement;
        navCheckBox.checked ? navCheckBox.checked = false : null
        dispatch(toggleRegister())
    }
    const toggleNavCall = () =>{
        dispatch(toggleNav())
    }
    const toggleLocalModal = () =>{
        const navCheckBox = document.getElementById("mobile-nav-toggle") as HTMLInputElement;
        navCheckBox.checked ? navCheckBox.checked = false : null
        dispatch(toggleLocal())
    }
    const toggleWarningCall = () =>{
        dispatch(toggleWarning())
    }
    return {loginModalOpen, toggleLoginCall, registerModalOpen, toggleRegisterCall, toggleNavCall, localModalOpen, toggleLocalModal, toggleWarningCall, warningModal} 
}
export {useOpenModals}