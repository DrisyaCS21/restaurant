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

    const filteredMenuItems = menuItems.filter(item => {
        const term = searchTerm.trim().toLowerCase()
        if (!term) return true

        return (
            (item.name || '').toLowerCase().includes(term) ||
            (item.description || '').toLowerCase().includes(term) ||
            (item.category || '').toLowerCase().includes(term)
        )
    })

    const totalItems = cart.reduce((sum, c) => sum + c.qty, 0)

    return (
        <div className="min-h-screen bg-white">

            {/* Page Header */}
            <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600"
                    alt="Menu banner"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-16 lg:px-24">
                    <h1 className="text-3xl md:text-4xl font-semibold text-white">Our Menu</h1>
                    <p className="text-sm text-neutral-300 mt-2 max-w-lg">
                        Fresh ingredients, bold flavors — crafted with care for every appetite.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">

                {/* Cart indicator */}
                {totalItems > 0 && (
                    <div className="flex items-center justify-between bg-neutral-950 text-white px-6 py-3 rounded-xl mb-8">
                        <p className="text-sm">🛒 {totalItems} item{totalItems > 1 ? 's' : ''} in your cart</p>
                        <button 
                            onClick={handleViewCart}
                            className="text-sm bg-white text-neutral-900 px-4 py-1.5 rounded-lg font-medium hover:bg-neutral-100 transition cursor-pointer"
                        >
                            View Cart
                        </button>
                    </div>
                )}

                {/* Search */}
                <div className="flex items-center justify-between w-full mb-8">
                    <span className="text-lg font-medium text-neutral-700">Menu-</span>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center border pl-3 gap-2 bg-white border-gray-500/30 h-[46px] rounded-md overflow-hidden w-64">
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 30 30" fill="#6B7280">
                                <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8"/>
                            </svg>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search for products"
                                className="w-full h-full outline-none text-gray-500 placeholder-gray-500 text-sm"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => setSearchTerm('')}
                            className="bg-orange-500 min-w-24 h-[46px] px-4 rounded-md text-sm text-white hover:bg-orange-600 transition"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-12 w-full col-span-full">
                        <p className="text-neutral-500 text-sm">Loading menu items...</p>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center py-12 w-full col-span-full">
                        <p className="text-red-500 text-sm">Error: {error}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredMenuItems.length === 0 ? (
                            <div className="col-span-full text-center py-12 text-neutral-500">
                                No items found for "{searchTerm}".
                            </div>
                        ) : (
                            filteredMenuItems.map(item => {
                                const imageUrl = item.image && !item.image.startsWith('http') 
                                    ? `${backendUrl}/uploads/${item.image}` 
                                    : item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600';
                                return (
                                    <div key={item._id} className="group rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">

                                        {/* Image */}
                                        <div className="relative overflow-hidden h-48">
                                            <img
                                                src={imageUrl}
                                                alt={item.name}
                                                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {/* Category badge */}
                                            <span className="absolute top-3 left-3 bg-black/60 backdrop-blur text-white text-xs px-2.5 py-1 rounded-full">
                                                {item.category}
                                            </span>
                                            {/* Price tag */}
                                            <span className="absolute top-3 right-3 bg-white text-neutral-900 text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                                                Rs{item.price}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col flex-1 p-4">
                                            <div className="flex-1 flex flex-col">
                                                <h3 className="text-neutral-900 font-semibold text-base">{item.name}</h3>
                                                {item.description && (
                                                    <p className="text-neutral-500 text-xs mt-1 leading-relaxed line-clamp-2">{item.description}</p>
                                                )}
                                            </div>

                                            <button
                                                onClick={() => addToCart(item)}
                                                className="mt-4 w-full bg-orange-950 hover:bg-orange-800 text-white text-sm py-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                                                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                                                </svg>
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                )}
            </div>

            {/* Auth Modal */}
            {authOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setAuthOpen(false)}
                >
                    <div onClick={(e) => e.stopPropagation()} className="relative">
                        <button
                            onClick={() => setAuthOpen(false)}
                            className="absolute -top-3 -right-3 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
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
