import React from 'react'
import { AppContext } from '../context/AppContext'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const Auth = ({ onSuccess = () => {} }) => {
    const { login } = React.useContext(AppContext)

    const [state, setState] = React.useState("login")
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const endpoint = state === "login"
            ? `${backendUrl}/api/auth/login`
            : `${backendUrl}/api/auth/signup`

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    state === "login"
                        ? { email: formData.email, password: formData.password }
                        : formData
                )
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || 'Something went wrong. Please try again.')
                return
            }

            // Save user + token via context
            const { token, message, ...userData } = data
            login(userData, token ?? '')
            onSuccess()
        } catch (err) {
            setError('Unable to connect to server. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (error) setError('')
    }

    const switchState = () => {
        setState(prev => prev === "login" ? "register" : "login")
        setError('')
        setFormData({ name: '', email: '', password: '' })
    }

    return (
        <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
            <h1 className="text-gray-900 text-3xl mt-10 font-medium">
                {state === "login" ? "Login" : "Sign up"}
            </h1>
            <p className="text-gray-500 text-sm mt-2">
                {state === "login" ? "Please sign in to continue" : "Create your account"}
            </p>

            {/* Error message */}
            {error && (
                <div className="mt-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs text-left">
                    {error}
                </div>
            )}

            {/* Name field — register only */}
            {state !== "login" && (
                <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>
                    </svg>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full name"
                        className="border-none outline-none ring-0 w-full text-sm"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
            )}

            {/* Email */}
            <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>
                </svg>
                <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="border-none outline-none ring-0 w-full text-sm"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Password */}
            <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border-none outline-none ring-0 w-full text-sm"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            {state === "login" && (
                <div className="mt-4 text-left">
                    <button className="text-sm text-orange-500" type="button">
                        Forgot password?
                    </button>
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full h-11 rounded-full text-white bg-orange-500 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading && (
                    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                )}
                {loading ? 'Please wait...' : state === "login" ? "Login" : "Sign up"}
            </button>

            <p className="text-gray-500 text-sm mt-3 mb-11">
                {state === "login" ? "Don't have an account?" : "Already have an account?"}{' '}
                <button type="button" onClick={switchState} className="text-orange-500 hover:underline">
                    {state === "login" ? "Sign up" : "Login"}
                </button>
            </p>
        </form>
    )
}

export default Auth
