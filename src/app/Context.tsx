'use client'
import AuthProvider from '@/Contexts/auth'
import Private from '@/components/Private'
import { isPublicRoute } from '@/function/isPublicRoute'
import { usePathname } from 'next/navigation'
import React from 'react'

const Context = ({children}: {children: React.ReactNode}) => {

  const pathname = usePathname()

  const isPublic = isPublicRoute(pathname)
  


  return (
    <AuthProvider>
      {/* {isPublic ? (
        <>
          {children}
        </>
      ) : (
        <Private>
          {children}
        </Private>
      )} */}

      {children}
    </AuthProvider>
  )
}

export default Context