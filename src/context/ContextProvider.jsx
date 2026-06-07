import React, { createContext, useContext, useRef, useState } from 'react'

const MyContext=createContext()
 function ContextProvider({children }) {
    const [isOpen, setisOpen] = useState(false)
    const builRef = useRef()
    // mtRef menu timeLine Ref
    const mtRef = useRef(null)
  return (
    <MyContext.Provider value={{isOpen,setisOpen,builRef}}>
            {children }
    </MyContext.Provider>
  )
}

export const GetContext=()=>{
    const context=useContext(MyContext)
    if(!context){
        throw new Error("context is not provided")
    }
    return context
}

export default ContextProvider
