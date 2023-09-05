'use client'
import AuthProvider from '@/Contexts/auth'
import { public_routes } from '@/constants/public'
import { getAuth } from '@/function/getAuth'
import { useRouter } from 'next/navigation'
import React from 'react'

const Private = ({children}: {children: React.ReactNode}) => {

    const isSigned = getAuth()

    const {push} = useRouter()

    React.useEffect(() => {
      if(!isSigned){
        push(public_routes.public.login)
    }
    }, [isSigned, push])

  return (
    <>
    {!isSigned && null}

    <AuthProvider>
     {children} 
    </AuthProvider>
    </>
  )
}

export default Private
