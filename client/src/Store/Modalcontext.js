
import { createContext,useState} from 'react'



export const ModalContext = createContext('')

export function ModContext({ children }) {

   
    const [modalData, setModalData] = useState({})

   return (
       <ModalContext.Provider value={{ modalData, setModalData }}>
           {children}
       </ModalContext.Provider>
   )
}