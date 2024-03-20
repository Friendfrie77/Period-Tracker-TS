//Hook to handle login/logout/reg
import useLoading from "./useLoading";

const useAuth =() =>{
    const {loading} = useLoading();
    interface loginValuesTypes{
        email?: string, 
        password?: string
    }
    const login = async (values:loginValuesTypes) =>{
        const {email, password} = values
        
    }
    return {login}
}

export default useAuth;