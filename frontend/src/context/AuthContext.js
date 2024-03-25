import { createContext } from "react";

const context=createContext({
    token:"",
    setToken:{},
    firstName:"",
    setFirstName:{},
    lastName:"",
    setLastName:{},
    role:"",
    setRole:{},
    tokenExpiration:"",
    setTokenExpiration:{},
    logout:{}
})

export default context