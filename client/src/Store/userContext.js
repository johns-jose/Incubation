import { createContext,useState} from 'react'

export const  UserContext = createContext('')


export function Context({ children }) {

   
     const [userDetails,setUserDetails] = useState(null)

    return (
        <UserContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </UserContext.Provider>
    )
}

