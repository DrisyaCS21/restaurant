import React from 'react'
import { Link } from 'react-router-dom'
import Auth from './Auth'
import { AppContext } from '../context/AppContext'
import Cart from './Cart'

const Header = () => {
    const { user, logout } = React.useContext(AppContext)
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [authOpen, setAuthOpen] = React.useState(false);
    const [cartOpen, setCartOpen] = React.useState(false);

    const IntersectionDot = ({ className = '' }) => (
        <span className={`absolute size-1 -translate-x-1/2 -translate-y-1/2 rounded-xs border border-neutral-800 bg-white z-30 ${className}`} />
    );

    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
                    *{ font-family: "Geist", sans-serif; }
                    h1{ font-family: "Urbanist", sans-serif; }
                `}
            </style>

            {/* Auth Modal */}
            {authOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setAuthOpen(false)}
                >
                    <div onClick={(e) => e.stopPropagation()} className="relative">
                        <button
                            onClick={() => setAuthOpen(false)}
                            className="absolute -top-3 -right-3 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                            </svg>
                        </button>
                        <Auth onSuccess={() => setAuthOpen(false)} />
                    </div>
                </div>
            )}

            <header className="w-full bg-black border-b border-dashed border-neutral-800 sticky top-0 z-50">
                <div className="px-4 md:px-24 lg:px-32 xl:px-40 w-full mx-auto">
                    <nav className="relative flex items-center justify-between border-x border-dashed border-neutral-800 p-6 md:py-6 md:px-8 w-full">

                        <IntersectionDot className="left-0 bottom-0 translate-y-1/2" />
                        <IntersectionDot className="left-full bottom-0 translate-y-1/2" />

                        <a href="/" className='text-white font-bold text-lg md:text-xl lg:text-2xl transition hover:text-white/90'>
                            Brother's Kitchen
                        </a>

                        <div id="menu" className={`${mobileOpen ? 'max-md:w-full' : 'max-md:w-0'} max-md:fixed max-md:top-0 max-md:z-50 max-md:left-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-screen max-md:bg-black/50 max-md:backdrop-blur max-md:flex-col max-md:justify-center flex items-center gap-9 text-sm`}>
                            <Link to="/" onClick={() => setMobileOpen(false)} className="text-white hover:text-white/90">Home</Link>
                            <Link to="/menu" onClick={() => setMobileOpen(false)} className="text-white hover:text-white/90">Menu</Link>
                            <button
                                type="button"
                                onClick={() => {
                                    setMobileOpen(false)
                                    setCartOpen(true)
                                }}
                                className="text-white hover:text-white/90"
                            >
                                Cart
                            </button>
                            <a href="#order" onClick={() => setMobileOpen(false)} className="text-white hover:text-white/90">Order</a>

                            <button id="close-menu" onClick={() => setMobileOpen(false)} className="md:hidden bg-neutral-900 hover:bg-neutral-800 text-white p-2 rounded-md aspect-square font-medium transition z-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>

                        {user ? (
                            <div className="hidden md:flex items-center gap-3">
                                <span className="text-sm text-white/80">
                                    Hi, {user.name?.split(' ')[0] ?? 'User'}
                                </span>
                                <button
                                    onClick={logout}
                                    className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2.5 rounded-lg text-sm text-white transition cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setAuthOpen(true)}
                                className="hidden md:flex bg-neutral-800 hover:bg-neutral-700 px-6 py-2.5 rounded-lg text-sm text-white transition cursor-pointer"
                            >
                                Get Started
                            </button>
                        )}

                        <button id="open-menu" onClick={() => setMobileOpen(true)} className="md:hidden bg-neutral-900 hover:bg-neutral-800 text-white p-2 rounded-md aspect-square font-medium transition cursor-pointer z-50 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </header>

            <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    )
}

export default Header
