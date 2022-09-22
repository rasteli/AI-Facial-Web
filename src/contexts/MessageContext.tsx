import React, { useContext, useState, createContext } from "react"

interface Message {
  sender: string
  text: string
  sentAt: number
}

interface MessageProviderProps {
  children: React.ReactNode
}

interface MessageContextData {
  messages: Message[]
  addMessage(message: Message): void
}

const MessageContext = createContext({} as MessageContextData)

export function useMessage() {
  return useContext(MessageContext)
}

export function MessageProvider({ children }: MessageProviderProps) {
  const [messages, setMessages] = useState<Message[]>([])

  const value: MessageContextData = {
    messages,
    addMessage
  }

  function addMessage(message: Message) {
    setMessages(messages => {
      return [...messages, message]
    })
  }

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  )
}
