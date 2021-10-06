import React, { useContext, createContext, useEffect } from 'react'
import { useState } from 'react';
import { auth } from 'firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@firebase/auth';
const AuthContext = createContext({});

import { useRouter } from 'next/router';

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const [userAuthLoading, setUserAuthLoading] = useState(true);

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
        setUserAuthLoading(true);
        const unsubscribe = auth.onAuthStateChanged(currentUser => {
            setUser(currentUser);
            setUserAuthLoading(false);
        })

        return unsubscribe;
    }, [])

    const value = {
        user,
        signUpAccount,
        loginAccount,
        logoutAccount,
        userAuthLoading
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
