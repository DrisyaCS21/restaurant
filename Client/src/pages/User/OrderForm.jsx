import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:1000"

const PAYMENT_METHODS = [
    {
        id: 'cash',
        label: 'Cash on Table',
        description: 'Pay with cash when your order arrives',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="5" rx="2"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
        ),
    },
    {
        id: 'esewa',
        label: 'eSewa',
        description: 'Pay via eSewa digital wallet',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
            </svg>
        ),
    },
    {
        id: 'khalti',
        label: 'Khalti',
        description: 'Pay via Khalti digital wallet',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
        ),
    },
]

// ── Step indicator ────────────────────────────────────────────────────────────
const StepBar = ({ current }) => {
    const steps = ['Choose Food', 'Payment']
    return (
        <div className="flex items-center justify-center gap-0 mb-10">
            {steps.map((label, i) => {
                const idx = i + 1
                const done = idx < current
                const active = idx === current
                return (
                    <React.Fragment key={label}>
                        <div className="flex flex-col items-center gap-1.5">
                            <div className={'w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ' +
                                (done ? 'bg-orange-500 text-white' :
                                 active ? 'bg-neutral-900 text-white ring-2 ring-orange-500 ring-offset-2' :
                                 'bg-neutral-100 text-neutral-400')}>
                                {done ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 6 9 17l-5-5"/>
                                    </svg>
                                ) : idx}
                            </div>
                            <span className={'text-xs font-medium ' + (active ? 'text-neutral-900' : done ? 'text-orange-500' : 'text-neutral-400')}>
                                {label}
                            </span>
                        </div>
                        {i < steps.length - 1 && (
                            <div className={'h-px w-16 sm:w-24 mb-5 mx-1 ' + (done ? 'bg-orange-500' : 'bg-neutral-200')} />
                        )}
                    </React.Fragment>
                )
            })}
        </div>
    )
}

// ── Step 1 — Food selection ───────────────────────────────────────────────────
const StepFood = ({ menu, cart, onAdd, onRemove, onNext }) => {
    const [search, setSearch] = React.useState('')
    const [activeCategory, setActiveCategory] = React.useState('All')

    const categories = ['All', ...Array.from(new Set(menu.map(i => i.category)))]

    const visible = menu.filter(item => {
        const matchCat = activeCategory === 'All' || item.category === activeCategory
        const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
        return matchCat && matchSearch && item.available
    })

    const qty = (id) => cart.find(c => c._id === id)?.qty || 0
    const totalItems = cart.reduce((s, c) => s + c.qty, 0)
    const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0)

    return (
        <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-1">Choose your food</h2>
            <p className="text-neutral-500 text-sm mb-6">Add items to your order</p>

            {/* Search */}
            <div className="flex items-center border border-gray-200 bg-white pl-4 gap-2 h-11 rounded-xl overflow-hidden mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search dishes..."
                    className="flex-1 outline-none text-sm text-neutral-700 placeholder-neutral-400 bg-transparent"
                />
            </div>

            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={'shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all border ' +
                            (activeCategory === cat
                                ? 'bg-neutral-900 text-white border-neutral-900'
                                : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400')}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            {visible.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                    <p className="text-neutral-500">No menu items available yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {visible.map(item => {
                        const q = qty(item._id);
                        // Fix image URL - if it's a relative path, prepend backend URL
                        const imageUrl = item.image && !item.image.startsWith('http') 
                            ? `${backendUrl}/uploads/${item.image}` 
                            : item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600';
                        return (
                            <div key={item._id} className="group rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
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
                                    {/* Quantity badge */}
                                    {q > 0 && (
                                        <span className="absolute bottom-3 right-3 bg-orange-500 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-lg">
                                            {q}
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-1 p-4">
                                    <h3 className="text-neutral-900 font-semibold text-base">{item.name}</h3>
                                    
                                    {q === 0 ? (
                                        <button
                                            onClick={() => onAdd(item)}
                                            className="mt-4 w-full bg-orange-950 hover:bg-orange-800 text-white text-sm py-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                                                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                                            </svg>
                                            Add to Cart
                                        </button>
                                    ) : (
                                        <div className="mt-4 flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => onRemove(item._id)}
                                                    className="w-8 h-8 rounded-md bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 font-bold transition cursor-pointer"
                                                >−</button>
                                                <span className="text-sm font-semibold w-5 text-center">{q}</span>
                                                <button onClick={() => onAdd(item)}
                                                    className="w-8 h-8 rounded-md bg-orange-500 hover:bg-orange-400 flex items-center justify-center text-white font-bold transition cursor-pointer"
                                                >+</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* Order summary bar */}
            {totalItems > 0 && (
                <div className="bg-neutral-950 text-white rounded-2xl px-5 py-4 flex items-center justify-between mb-6">
                    <div>
                        <p className="text-xs text-neutral-400">{totalItems} item{totalItems > 1 ? 's' : ''} selected</p>
                        <p className="text-base font-semibold mt-0.5">Rs {subtotal.toLocaleString()}</p>
                    </div>
                    <button onClick={onNext}
                        className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition cursor-pointer"
                    >
                        Continue to Payment
                    </button>
                </div>
            )}
        </div>
    )
}

// ── Step 2 — Payment ─────────────────────────────────────────────────────────
const StepPayment = ({ table, cart, onBack, onPlace }) => {
    const [method, setMethod] = React.useState('cash')
    const [note, setNote] = React.useState('')
    const [placed, setPlaced] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const { user, token } = React.useContext(AppContext)

    const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0)
    const tax = Math.round(subtotal * 0.13)
    const total = subtotal + tax

    const handlePlace = async () => {
        setLoading(true)
        try {
            const orderData = {
                tableNumber: table,
                items: cart.map(item => ({
                    name: item.name,
                    menuItem: item._id,
                    quantity: item.qty,
                    price: item.price
                })),
                paymentMethod: method,
                specialInstructions: note
            }

            const headers = { 'Content-Type': 'application/json' }
            if (token) {
                headers['Authorization'] = `Bearer ${token}`
            }

            const res = await fetch(`${backendUrl}/api/orders`, {
                method: 'POST',
                headers,
                body: JSON.stringify(orderData)
            })

            if (res.ok) {
                setPlaced(true)
            } else {
                alert('Failed to place order')
            }
        } catch (err) {
            console.error(err)
            alert('Error placing order')
        } finally {
            setLoading(false)
        }
    }

    if (placed) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                        fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5"/>
                    </svg>
                </div>
                <h3 className="text-2xl font-semibold text-neutral-900 mb-2">Order Placed!</h3>
                <p className="text-neutral-500 text-sm max-w-xs">
                    Your order for Table <span className="font-semibold text-neutral-900">{table}</span> has been
                    sent to the kitchen. Total: <span className="font-semibold text-neutral-900">Rs {total.toLocaleString()}</span>
                </p>
                <div className="mt-8 flex gap-3">
                    <a href="/menu"
                        className="px-6 py-2.5 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition">
                        Back to Menu
                    </a>
                    <a href="/"
                        className="px-6 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition">
                        Home
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Left — payment method + note */}
            <div className="lg:col-span-3 space-y-6">
                <div>
                    <h2 className="text-2xl font-semibold text-neutral-900 mb-1">Payment</h2>
                    <p className="text-neutral-500 text-sm">Choose how you'd like to pay</p>
                </div>

                <div className="space-y-3">
                    {PAYMENT_METHODS.map(pm => (
                        <button
                            key={pm.id}
                            onClick={() => setMethod(pm.id)}
                            className={'w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left transition-all ' +
                                (method === pm.id
                                    ? 'border-orange-500 bg-orange-50'
                                    : 'border-neutral-200 bg-white hover:border-neutral-300')}
                        >
                            <div className={'w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ' +
                                (method === pm.id ? 'bg-orange-500 text-white' : 'bg-neutral-100 text-neutral-500')}>
                                {pm.icon}
                            </div>
                            <div className="flex-1">
                                <p className={'text-sm font-semibold ' + (method === pm.id ? 'text-neutral-900' : 'text-neutral-700')}>
                                    {pm.label}
                                </p>
                                <p className="text-xs text-neutral-400 mt-0.5">{pm.description}</p>
                            </div>
                            <div className={'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ' +
                                (method === pm.id ? 'border-orange-500' : 'border-neutral-300')}>
                                {method === pm.id && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Special note */}
                <div>
                    <label className="text-sm font-medium text-neutral-700 block mb-2">
                        Special instructions <span className="text-neutral-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        rows={3}
                        placeholder="e.g. No onions, extra spicy, allergy notes..."
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-700 placeholder-neutral-400 outline-none focus:border-orange-400 resize-none transition"
                    />
                </div>

                <button onClick={onBack}
                    className="text-sm text-neutral-500 hover:text-neutral-800 transition flex items-center gap-1.5 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"/>
                    </svg>
                    Back to Food Selection
                </button>
            </div>

            {/* Right — order summary */}
            <div className="lg:col-span-2">
                <div className="bg-neutral-950 rounded-2xl p-5 text-white sticky top-6">
                    <div className="flex items-center gap-2 mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                            fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18M3 12h18M3 18h18"/>
                        </svg>
                        <h3 className="text-sm font-semibold">Table {table}</h3>
                    </div>

                    <div className="space-y-3 mb-5">
                        {cart.map(item => (
                            <div key={item._id} className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <span className="w-5 h-5 rounded-md bg-neutral-800 text-xs text-neutral-300 flex items-center justify-center shrink-0">
                                        {item.qty}
                                    </span>
                                    <span className="text-sm text-neutral-300 truncate">{item.name}</span>
                                </div>
                                <span className="text-sm text-white shrink-0">Rs {(item.price * item.qty).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-neutral-800 pt-4 space-y-2.5">
                        <div className="flex justify-between text-sm text-neutral-400">
                            <span>Subtotal</span>
                            <span>Rs {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-neutral-400">
                            <span>VAT (13%)</span>
                            <span>Rs {tax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-base font-semibold text-white pt-2 border-t border-neutral-800">
                            <span>Total</span>
                            <span>Rs {total.toLocaleString()}</span>
                        </div>
                    </div>

                    <button
                        onClick={handlePlace}
                        disabled={loading}
                        className="mt-5 w-full bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold py-3.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5"/>
                        </svg>
                        {loading ? 'Placing...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    )
}

// ── Main component ────────────────────────────────────────────────────────────
const OrderForm = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { user } = React.useContext(AppContext)
    const [step, setStep] = React.useState(1)
    const [table, setTable] = React.useState(null)
    const [cart, setCart] = React.useState([])
    const [menu, setMenu] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState('')

    // Redirect admins away if admin
    React.useEffect(() => {
        if (user && user.role === 'admin') {
            navigate('/admindashboard')
        }
    }, [user, navigate])

    // Verify token and fetch menu
    React.useEffect(() => {
        const init = async () => {
            const token = searchParams.get('token')
            if (!token) {
                setError('No QR token found. Please scan a valid table QR code.')
                setLoading(false)
                return
            }

            try {
                // Verify token
                const verifyRes = await fetch(`${backendUrl}/api/qr/verify/${token}`)
                if (!verifyRes.ok) {
                    setError('Invalid or expired QR code.')
                    setLoading(false)
                    return
                }
                const verifyData = await verifyRes.json()
                setTable(verifyData.tableNumber)

                // Fetch menu from backend
                const menuRes = await fetch(`${backendUrl}/api/menu`)
                if (menuRes.ok) {
                    const menuData = await menuRes.json()
                    console.log('Fetched menu:', menuData) // Debug log
                    setMenu(menuData)
                }
            } catch (err) {
                console.error(err)
                setError('Error loading data.')
            } finally {
                setLoading(false)
            }
        }
        init()
    }, [searchParams])

    const addToCart = (item) => {
        setCart(prev => {
            const exists = prev.find(c => c._id === item._id)
            if (exists) return prev.map(c => c._id === item._id ? { ...c, qty: c.qty + 1 } : c)
            return [...prev, { ...item, qty: 1 }]
        })
    }

    const removeFromCart = (id) => {
        setCart(prev => prev
            .map(c => c._id === id ? { ...c, qty: c.qty - 1 } : c)
            .filter(c => c.qty > 0)
        )
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-neutral-500">Loading...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center py-20">
                <div className="text-center max-w-md px-4">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                            fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-neutral-900 mb-2">Oops!</h2>
                    <p className="text-neutral-500 mb-6">{error}</p>
                    <a href="/"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition">
                        Back to Home
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Page banner */}
            <div className="relative h-52 md:h-64 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600"
                    alt="Order banner"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/65" />
                <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-16 lg:px-24">
                    <p className="text-orange-400 text-xs font-medium uppercase tracking-widest mb-2">Dine In</p>
                    <h1 className="text-3xl md:text-4xl font-semibold text-white">Place Your Order</h1>
                    <p className="text-sm text-neutral-300 mt-2 max-w-md">
                        Table <span className="font-semibold text-white">{table}</span> — Pick your dishes and pay.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
                <StepBar current={step} />

                {step === 1 && (
                    <StepFood
                        menu={menu}
                        cart={cart}
                        onAdd={addToCart}
                        onRemove={removeFromCart}
                        onNext={() => setStep(2)}
                    />
                )}

                {step === 2 && (
                    <StepPayment
                        table={table}
                        cart={cart}
                        onBack={() => setStep(1)}
                    />
                )}
            </div>
        </div>
    )
}

export default OrderForm
