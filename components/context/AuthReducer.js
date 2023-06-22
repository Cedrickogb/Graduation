const AuthReducer=(state,action)=>{
    switch (action.type) {
        case "LOGIN":{
            return {
                userUid:action.userUid,
                userType:action.userType
            }
        }
        case "LOGOUT":{
            return {
                userUid:null,
                userType:null
            }
        }
        default:
            return state
    }
}
export default  AuthReducer;