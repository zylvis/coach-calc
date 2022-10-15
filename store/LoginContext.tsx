import React, { useState, createContext} from "react"

interface LoginProviderProps{
    children: React.ReactNode
}


export const LoginContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn: boolean ) => {}
});

export const LoginProvider = ({children}: LoginProviderProps) => {

    const[isLoggedIn, setIsLoggedIn] = useState(false)

    return(
        <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </LoginContext.Provider>
    )
}

