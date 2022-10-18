import axios from "axios";
import parseJWT from "./parseJWT";

const userAuth = (): boolean => {

    const token = localStorage.getItem('coachCalcUserToken')?.toString();
    if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log(parseJWT(token))
        const obj = parseJWT(token)
        console.log(new Date(obj.exp * 1000))
        console.log( Date.now()/1000)
        
        if(obj.exp < Date.now()/1000){
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("coachCalcUserToken")
            return false
        } else { return true}

    } else if (!token){
        delete axios.defaults.headers.common["Authorization"];
        return false
    }
    return false
}
export default userAuth;