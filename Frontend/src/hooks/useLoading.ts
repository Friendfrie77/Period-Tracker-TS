//hook to handle setting loading state.
import { useAppSelector, useAppDispatch} from "./useRedux"
import { toggleLoading } from "../state/features/loading/loadingSlice";

const useLoading = () =>{
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state => state.loading.isLoading));
    const loading = () =>{
        if(!isLoading){
            setTimeout(() =>{
                dispatch(toggleLoading());
            }, 1000)
        }else{
            dispatch(toggleLoading());
        }
    }
    return {isLoading, loading};
}

export default useLoading; 