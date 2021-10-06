import React, { useContext, createContext, useEffect } from 'react'
import { useState } from 'react';
import { auth } from 'firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@firebase/auth';
const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const signUpAccount = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginAccount = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logoutAccount = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(currentUser => {
            setUser(currentUser);
        })

        return unsubscribe;
    }, [])

    const value = {
        user,
        signUpAccount,
        loginAccount,
        logoutAccount
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
