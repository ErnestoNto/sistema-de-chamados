'use client'
import AuthProvider from '@/Contexts/auth'
import React from 'react'

const Context = ({children}: {children: React.ReactNode}) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

export default Context