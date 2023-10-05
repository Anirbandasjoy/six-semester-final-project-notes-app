import React, { createContext, useEffect, useState } from 'react'
import auth from '../config/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const authContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const [notes, setNotes] = useState([]);
    const [logding, setLoading] = useState(true)

    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
            console.log(currentUser)
        })
        return () => {
            unSubscribe()
        }
    }, [])

    const authInformation = { user, registerUser, logInUser, logding, logOut }
    return (
        <authContext.Provider value={authInformation}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider