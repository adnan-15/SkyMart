import { createContext, useState } from "react";


export const Auth = createContext();

export const AuthProvider = ({children})=>{

    const [registerU, setRegister] = useState(JSON.parse(localStorage.getItem("register"))||[])

    const [login, setLogin] = useState(JSON.parse(localStorage.getItem("login")))

    console.log("Login : ", login);
    console.log("Register : ",registerU);
    

    return <Auth.Provider value={{registerU, setRegister, login, setLogin}}>
        {children}
    </Auth.Provider>
}

