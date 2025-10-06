import React, { useState } from 'react'
import { ChatContext } from './createContext'

const ContextProvider = ({children}) => {
    const [prompt, setPrompt] = useState("")
    const setNewPrompt = (text) => {
        setPrompt(text)
    }
    return (
        <ChatContext.Provider value={{prompt,setNewPrompt}}>
            {children}
    </ChatContext.Provider>
  )
}

export default ContextProvider