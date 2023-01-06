import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../../config/firebase"

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [userId, setUserId] = useState()

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)

    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        userId,
        setUserId
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}