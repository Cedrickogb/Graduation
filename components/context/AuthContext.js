import { createContext,useEffect,useReducer} from "react";
import Cookies from "js-cookie";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE={
    userUid: Cookies.get("userUid") || null,
    userType: Cookies.get("userType") || null
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children})=>{
    const [state,dispatch]=useReducer(AuthReducer,INITIAL_STATE);

    useEffect(() => {
    //   Cookies.set("userUid",state.userUid)
    //   Cookies.set("userType",state.userType)
    }, [state.userUid,state.userType])

    const contextValue = {
        userUid: state.userUid,
        userType: state.userType,
        dispatch,
    }
    
    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}