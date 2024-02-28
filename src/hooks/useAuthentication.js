import { db } from '../firebase/config'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if(cancelled){
            return;
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError('')

        try {
            const {user} = await createUserWithEmailAndPassword(auth, data.email, data.password)
            await updateProfile(user, {displayName: data.displayName})
            setLoading(false)
            return user

        } catch (error) {
            let systemErrorMessage

            if(error.message.includes("Password")){
                systemErrorMessage = "Password needs to have more than 6 characters."
            } else if(error.message.includes("email-already")){
                systemErrorMessage = "Email already in use."
            } else {
                systemErrorMessage = "There's been an error, please try later."
            }
            setLoading(false)
            setError(systemErrorMessage)
        }
    }

    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    }

    const login = async (data) => {
        checkIfIsCancelled()
        setLoading(true)
        setError('')

        try {
            console.log(data)
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
        } catch (error) {
            let systemErrorMessage
            if(error.message.includes("invalid-credential")){
                systemErrorMessage = "Wrong Email or Password."
            } else {
                systemErrorMessage = "There's been an error, please try later."
            }
            setLoading(false)
            setError(systemErrorMessage)
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return { auth, createUser, error, loading, logout, login }
}