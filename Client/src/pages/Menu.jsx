import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Auth from '../components/Auth'

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:1000"

const Menu = () => {
    const { user } = React.useContext(AppContext)
    const navigate = useNavigate()
    const [authOpen, setAuthOpen] = React.useState(false)
    const [menuItems, setMenuItems] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    const [cart, setCart] = React.useState([])
    const [selectedCategory, setSelectedCategory] = React.useState('All')
    const [searchTerm, setSearchTerm] = React.useState('')

    React.useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await fetch(`${backendUrl}/api/menu`)
                if (!res.ok) throw new Error('Failed to fetch menu')
                const data = await res.json()
                setMenuItems(data)
            } catch (err) {
                console.error(err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchMenu()
    }, [])
   console.log("Backend URL:", backendUrl);
    const handleViewCart = () => {
        if (!user) {
            setAuthOpen(true)
        } else {
            navigate('/order', { state: { cart } })
        }
    }

    const addToCart = (item) => {
        setCart(prev => {
            const exists = prev.find(c => c._id === item._id)
            if (exists) return prev.map(c => c._id === item._id ? { ...c, qty: c.qty + 1 } : c)
            return [...prev, { ...item, qty: 1 }]
        })
    }

    // Get unique categories
    const categories = ['All', ...new Set(menuItems.map(item => item.category).filter(Boolean))]

    const filteredMenuItems = menuItems.filter(item => {
        const term = searchTerm.trim().toLowerCase()
        const matchesSearch = !term || 
            (item.name || '').toLowerCase().includes(term) ||
            (item.description || '').toLowerCase().includes(term)
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const totalItems = cart.reduce((sum, c) => sum + c.qty, 0)

    return (
        <div className="min-h-screen bg-[#faf8f6]">
            {/* Header */}
            <header className="bg-white border-b border-neutral-100 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        <div className="flex items-center gap-2">
                            <span className="text-xl md:text-2xl font-serif font-light tracking-wide text-neutral-800">Mokshya</span>
                            <span className="text-xs text-neutral-400 font-light hidden sm:inline">|</span>
                            <span className="text-xs text-neutral-500 font-light hidden sm:inline">menu</span>
                        </div>
                        <button 
                            onClick={handleViewCart}
                            className="relative p-2 hover:bg-neutral-50 rounded-full transition"
                        >
                            <svg className="w-5 h-5 md:w-6 md:h-6 text-neutral-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content - Two Column Layout */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    {/* Left Sidebar - Categories */}
                    <div className="md:w-56 lg:w-64 flex-shrink-0">
                        {/* Search - only visible on mobile */}
                        <div className="md:hidden mb-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search menu..."
                                    className="w-full px-4 py-2 pl-10 bg-white border border-neutral-200 focus:border-amber-600 focus:ring-0 outline-none text-sm text-neutral-700 placeholder-neutral-400"
                                />
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Categories - Vertical List */}
                        <nav className="space-y-0.5">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                                        selectedCategory === cat 
                                            ? 'text-amber-700 bg-amber-50/50 font-medium' 
                                            : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Right Side - Menu Items */}
                    <div className="flex-1 min-w-0">
                        {/* Search - hidden on mobile, shown on desktop */}
                        <div className="hidden md:block mb-8">
                            <div className="relative max-w-sm">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search menu..."
                                    className="w-full px-4 py-2 pl-10 bg-white border border-neutral-200 focus:border-amber-600 focus:ring-0 outline-none text-sm text-neutral-700 placeholder-neutral-400"
                                />
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Menu Items Grid */}
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-8 h-8 border-2 border-neutral-200 border-t-amber-600 rounded-full animate-spin" />
                            </div>
                        ) : error ? (
                            <div className="text-center py-20 text-red-500 text-sm">{error}</div>
                        ) : (
                            <>
                                {filteredMenuItems.length === 0 ? (
                                    <div className="text-center py-20 text-neutral-400 text-sm">
                                        No items found for "{searchTerm}"
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {filteredMenuItems.map(item => {
                                            const imageUrl = item.image && !item.image.startsWith('http') 
                                                ? `${backendUrl}/uploads/${item.image}` 
                                                : item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600';
                                            return (
                                                <div key={item._id} className="flex items-start gap-4 md:gap-6 group pb-6 border-b border-neutral-100 last:border-0">
                                                    {/* Circular Image */}
                                                    <div className="flex-shrink-0">
                                                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-neutral-100">
                                                            <img
                                                                src={imageUrl}
                                                                alt={item.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-4">
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="text-base md:text-lg font-serif font-light text-neutral-800 leading-tight">
                                                                    {item.name}
                                                                </h3>
                                                                {item.description && (
                                                                    <p className="text-xs text-neutral-500 font-light mt-1 leading-relaxed line-clamp-2">
                                                                        {item.description}
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
                                                                <span className="text-sm font-light text-neutral-700 whitespace-nowrap">
                                                                    Rs. {item.price}
                                                                </span>
                                                                <button
                                                                    onClick={() => addToCart(item)}
                                                                    className="px-3 md:px-4 py-1.5 border border-neutral-200 hover:border-amber-600 hover:bg-amber-50 text-neutral-700 hover:text-amber-700 text-xs md:text-sm font-light transition duration-300 whitespace-nowrap"
                                                                >
                                                                    Add to Cart
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Auth Modal */}
            {authOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    onClick={() => setAuthOpen(false)}
                >
                    <div 
                        onClick={(e) => e.stopPropagation()} 
                        className="relative w-full max-w-md bg-white"
                    >
                        <button
                            onClick={() => setAuthOpen(false)}
                            className="absolute top-3 right-3 z-10 p-1 hover:bg-neutral-50 transition"
                        >
                            <svg className="w-5 h-5 text-neutral-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <Auth onSuccess={() => setAuthOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Menu