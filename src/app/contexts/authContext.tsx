"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
interface authContextProps{
    children:React.ReactNode
}
const authContext = ({children}:authContextProps) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default authContext
