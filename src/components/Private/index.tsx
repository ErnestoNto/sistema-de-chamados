import { public_routes } from '@/constants/public'
import { getAuth } from '@/function/getAuth'
import { useRouter } from 'next/navigation'
import React from 'react'

const Private = ({children}: {children: React.ReactNode}) => {

    const isSigned = getAuth()

    const {push} = useRouter()

    if(!isSigned){
        push(public_routes.public.login)

        return(
            <>
                <div></div>
            </>
        )
    }

  return (
    <>
     {children} 
    </>
  )
}

export default Private
