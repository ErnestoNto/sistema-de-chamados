'use client'
import { auth, db } from "@/service/firebaseConection"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import React from "react"
import {useRouter} from 'next/navigation'

type FormProps = {
    name?: string
    email: string
    password: string
}

export type ContextProps = {
    user: any
    loading: boolean
    loadingUser: boolean
    signIn: ({email, password}: FormProps) => void
    signUp: ({name, email, password}: FormProps) => void
    logout: () => void
    storageUser: (data: UserProps) => void
    updateUser: (data: UserProps) => void
}

export type UserProps = {
    name: string
    email: string
    uid: string
    avatarUrl: any
}

const AuthContext = React.createContext<ContextProps | null>(null)

const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [ user, setUser ] = React.useState<UserProps | null>(null)
    const [ loading, setLoading ] = React.useState(false)
    const [ loadingUser, setLoadingUser ] = React.useState(true)

    const { push } = useRouter()

    React.useEffect(() => {
        const loadUser = () => {
            
            const data = localStorage.getItem('users')

            if(data){
                setUser(JSON.parse(data))
                setLoadingUser(false)
            }

        }

        loadUser()
    }, [])

    const signIn = async ({email, password}: FormProps) => {
        setLoading(true)

        await signInWithEmailAndPassword(auth, email, password)
        .then( async (res) => {
            const uid = res.user.uid

            const docRef = doc(db, 'users', uid)
            await getDoc(docRef)
            .then((doc) => {
                let data: UserProps = {
                    name: doc.data()!.name,
                    email: res.user.email!,
                    uid,
                    avatarUrl: doc.data()!.avatarUrl
                }

                setUser(data)
                storageUser(data)
                setLoading(false)
                push('/dashboard')
            })
        })
    }

    const signUp = async ({name, email, password}: FormProps) => {
        setLoading(true)

        await createUserWithEmailAndPassword(auth, email, password)
        .then( async (res) => {
            const uid = res.user.uid

            const docRef = doc(db, 'users', uid)
            await setDoc(docRef, {
                name: name,
                avatarUrl: null
            })
            .then(() => {
                let data: UserProps = {
                    name: name!,
                    email: res.user.email!,
                    uid,
                    avatarUrl: null
                }

                setUser(data)
                storageUser(data)
                setLoading(false)
                push('/dashboard')
            })

        })
        .catch(error => {
            console.log(error);
            setLoading(false)
        })
    }

    const logout = async () => {
        await signOut(auth)
        localStorage.removeItem('users')
        push('/')
    }

    const storageUser = (data: UserProps) => {
        localStorage.setItem('users', JSON.stringify(data))
    }

    const updateUser = (data: UserProps) => {
        setUser(data)
    }

    return(
        <AuthContext.Provider value={{
            user,
            loading,
            loadingUser,
            signIn,
            signUp,
            logout,
            storageUser,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => {
    const data: ContextProps | null = React.useContext(AuthContext)  

    return data
}