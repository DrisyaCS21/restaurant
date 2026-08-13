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

    // Close menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (mobileOpen && !e.target.closest('#mobile-menu') && !e.target.closest('#open-menu')) {
                setMobileOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [mobileOpen])

    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
                    *{ font-family: "Geist", sans-serif; }
                    h1{ font-family: "Urbanist", sans-serif; }
                    
                    /* Mobile menu slide animation */
                    @keyframes slideIn {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                    @keyframes slideOut {
                        from { transform: translateX(0); opacity: 1; }
                        to { transform: translateX(100%); opacity: 0; }
                    }
                    .menu-slide-in {
                        animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    }
                    .menu-slide-out {
                        animation: slideOut 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    }
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
                            Mokshya's cafe
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-9 text-sm">
                            <Link to="/" className="text-white hover:text-white/90">Home</Link>
                            <Link to="/menu" className="text-white hover:text-white/90">Menu</Link>
                            {user?.role === 'admin' ? (
                                <Link to="/admindashboard" className="text-white hover:text-white/90">
                                    Admin Dashboard
                                </Link>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setCartOpen(true)}
                                        className="text-white hover:text-white/90"
                                    >
                                        Cart
                                    </button>
                                    {user && (
                                        <Link to="/order/confirmation" className="text-white hover:text-white/90">
                                            My Orders
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Desktop Right Section - User controls */}
                        <div className="hidden md:flex items-center gap-3">
                            {user ? (
                                <>
                                    <span className="text-sm text-white/80">
                                        Hi, {user.name?.split(' ')[0] ?? 'User'}
                                    </span>
                                    <button
                                        onClick={logout}
                                        className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2.5 rounded-lg text-sm text-white transition cursor-pointer"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setAuthOpen(true)}
                                    className="bg-neutral-800 hover:bg-neutral-700 px-6 py-2.5 rounded-lg text-sm text-white transition cursor-pointer"
                                >
                                    Get Started
                                </button>
                            )}
                        </div>

                        {/* Mobile Hamburger Button */}
                        <button 
                            id="open-menu" 
                            onClick={() => setMobileOpen(!mobileOpen)} 
                            className="md:hidden bg-neutral-900 hover:bg-neutral-800 text-white p-2 rounded-md aspect-square font-medium transition cursor-pointer z-50 relative"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" />
                            </svg>
                        </button>

                        {/* Mobile Sidebar - Slides in from right */}
                        <div 
                            id="mobile-menu"
                            className={`md:hidden fixed top-0 right-0 h-full w-[280px] max-w-[80vw] bg-black/95 backdrop-blur-md border-l border-neutral-800 shadow-2xl z-50 ${
                                mobileOpen ? 'menu-slide-in' : 'menu-slide-out pointer-events-none'
                            }`}
                            style={{ display: mobileOpen ? 'block' : 'none' }}
                        >
                            {/* Close button */}
                            <button 
                                onClick={() => setMobileOpen(false)} 
                                className="absolute top-6 right-6 bg-neutral-800 hover:bg-neutral-700 text-white p-2 rounded-md transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                                </svg>
                            </button>

                            {/* Brand in sidebar */}
                            <div className="pt-20 pb-6 px-6 border-b border-neutral-800">
                                <span className="text-white font-bold text-xl">Mokshya's cafe</span>
                                <p className="text-white/40 text-xs mt-1">Premium coffee experience</p>
                            </div>

                            {/* Navigation Links */}
                            <div className="flex flex-col gap-1 p-4">
                                <Link 
                                    to="/" 
                                    onClick={() => setMobileOpen(false)} 
                                    className="text-white hover:bg-white/5 px-4 py-3 rounded-lg transition text-base"
                                >
                                    Home
                                </Link>
                                <Link 
                                    to="/menu" 
                                    onClick={() => setMobileOpen(false)} 
                                    className="text-white hover:bg-white/5 px-4 py-3 rounded-lg transition text-base"
                                >
                                    Menu
                                </Link>

                                {user?.role === 'admin' ? (
                                    <Link 
                                        to="/admindashboard" 
                                        onClick={() => setMobileOpen(false)} 
                                        className="text-white hover:bg-white/5 px-4 py-3 rounded-lg transition text-base"
                                    >
                                        Admin Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setMobileOpen(false)
                                                setCartOpen(true)
                                            }}
                                            className="text-left text-white hover:bg-white/5 px-4 py-3 rounded-lg transition text-base"
                                        >
                                            Cart
                                        </button>
                                        {user && (
                                            <Link 
                                                to="/order/confirmation" 
                                                onClick={() => setMobileOpen(false)} 
                                                className="text-white hover:bg-white/5 px-4 py-3 rounded-lg transition text-base"
                                            >
                                                My Orders
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* User Section - Bottom */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-neutral-800 bg-black/50">
                                {user ? (
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-white font-medium">
                                                {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                            </div>
                                            <div>
                                                <p className="text-white text-sm font-medium">{user.name}</p>
                                                <p className="text-white/40 text-xs">{user.email}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                logout()
                                                setMobileOpen(false)
                                            }}
                                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2.5 rounded-lg text-sm transition w-full text-center"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setAuthOpen(true)
                                            setMobileOpen(false)
                                        }}
                                        className="bg-neutral-800 hover:bg-neutral-700 px-4 py-3 rounded-lg text-white text-sm transition w-full text-center"
                                    >
                                        Get Started
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Backdrop overlay - semi-transparent */}
                        {mobileOpen && (
                            <div 
                                className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                                onClick={() => setMobileOpen(false)}
                            />
                        )}
                    </nav>
                </div>
            </header>

            <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    )
}

export default Header