import React from 'react'

export const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
    const [user, setUser] = React.useState(() => {
        try {
            const stored = localStorage.getItem('user')
            return stored ? JSON.parse(stored) : null
        } catch {
            return null
        }
    })

    const [token, setToken] = React.useState(() => localStorage.getItem('token') || null)

    const login = (userData, authToken) => {
        setUser(userData)
        setToken(authToken)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', authToken)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    return (
        <AppContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AppContext.Provider>
    )
}
