import React from 'react'

// ── Mock menu data (matches backend Menu model shape) ─────────────────────────
const mockMenu = [
    { _id: '1', name: 'Grilled Salmon', price: 649, category: 'Main Course', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600', available: true },
    { _id: '2', name: 'Truffle Pasta', price: 499, category: 'Pasta', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600', available: true },
    { _id: '3', name: 'Beef Tenderloin', price: 899, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=600', available: true },
    { _id: '4', name: 'Margherita Pizza', price: 349, category: 'Pizza', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600', available: true },
    { _id: '5', name: 'Caesar Salad', price: 249, category: 'Salad', image: 'https://images.unsplash.com/photo-1512852939750-1305098529bf?w=600', available: true },
    { _id: '6', name: 'Chocolate Lava Cake', price: 199, category: 'Dessert', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600', available: true },
    { _id: '7', name: 'Chicken Tikka', price: 399, category: 'Main Course', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600', available: true },
    { _id: '8', name: 'Mushroom Risotto', price: 379, category: 'Rice', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600', available: true },
]

const TABLES = Array.from({ length: 12 }, (_, i) => i + 1)

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
    const steps = ['Select Table', 'Choose Food', 'Payment']
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

// ── Step 1 — Table selection ──────────────────────────────────────────────────
const StepTable = ({ selected, onSelect, onNext }) => (
    <div>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-1">Pick your table</h2>
        <p className="text-neutral-500 text-sm mb-8">Select the table number you are seated at</p>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-10">
            {TABLES.map(n => (
                <button
                    key={n}
                    onClick={() => onSelect(n)}
                    className={'h-16 rounded-2xl border-2 text-base font-semibold transition-all ' +
                        (selected === n
                            ? 'border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/30'
                            : 'border-neutral-200 bg-white text-neutral-700 hover:border-orange-300 hover:text-orange-500')}
                >
                    <div className="flex flex-col items-center gap-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18M3 12h18M3 18h18"/>
                        </svg>
                        <span className="text-sm">{n}</span>
                    </div>
                </button>
            ))}
        </div>

        {selected && (
            <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-2xl px-5 py-4 mb-8">
                <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5"/>
                    </svg>
                </div>
                <p className="text-sm text-neutral-700">
                    Table <span className="font-semibold text-neutral-900">{selected}</span> selected
                </p>
            </div>
        )}

        <button
            onClick={onNext}
            disabled={!selected}
            className={'w-full py-3.5 rounded-xl text-sm font-semibold transition-all ' +
                (selected
                    ? 'bg-neutral-900 hover:bg-neutral-800 text-white cursor-pointer'
                    : 'bg-neutral-100 text-neutral-400 cursor-not-allowed')}
        >
            Continue to Menu
        </button>
    </div>
)

// ── Step 2 — Food selection ───────────────────────────────────────────────────
const StepFood = ({ cart, onAdd, onRemove, onNext, onBack }) => {
    const [search, setSearch] = React.useState('')
    const [activeCategory, setActiveCategory] = React.useState('All')

    const categories = ['All', ...Array.from(new Set(mockMenu.map(i => i.category)))]

    const visible = mockMenu.filter(item => {
        const matchCat = activeCategory === 'All' || item.category === activeCategory
        const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
        return matchCat && matchSearch
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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {visible.map(item => {
                    const q = qty(item._id)
                    return (
                        <div key={item._id} className={'rounded-2xl border overflow-hidden transition-all ' +
                            (q > 0 ? 'border-orange-300 shadow-sm shadow-orange-100' : 'border-neutral-100')}>
                            {/* Image */}
                            <div className="relative h-40 overflow-hidden">
                                <img src={item.image} alt={item.name}
                                    className="absolute inset-0 w-full h-full object-cover" />
                                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur text-white text-xs px-2.5 py-1 rounded-full">
                                    {item.category}
                                </span>
                                <span className="absolute top-2 right-2 bg-white text-neutral-900 text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                                    Rs {item.price}
                                </span>
                                {q > 0 && (
                                    <span className="absolute bottom-2 right-2 bg-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow">
                                        {q}
                                    </span>
                                )}
                            </div>
                            {/* Info + controls */}
                            <div className="p-3 flex items-center justify-between gap-2">
                                <p className="text-sm font-medium text-neutral-900 truncate">{item.name}</p>
                                {q === 0 ? (
                                    <button
                                        onClick={() => onAdd(item)}
                                        className="shrink-0 bg-neutral-900 hover:bg-neutral-700 text-white text-xs px-3 py-1.5 rounded-lg transition cursor-pointer"
                                    >
                                        Add
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button onClick={() => onRemove(item._id)}
                                            className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 font-bold transition cursor-pointer">
                                            −
                                        </button>
                                        <span className="text-sm font-semibold w-4 text-center">{q}</span>
                                        <button onClick={() => onAdd(item)}
                                            className="w-7 h-7 rounded-lg bg-orange-500 hover:bg-orange-400 flex items-center justify-center text-white font-bold transition cursor-pointer">
                                            +
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Order summary bar */}
            {totalItems > 0 && (
                <div className="bg-neutral-950 text-white rounded-2xl px-5 py-4 flex items-center justify-between mb-6">
                    <div>
                        <p className="text-xs text-neutral-400">{totalItems} item{totalItems > 1 ? 's' : ''} selected</p>
                        <p className="text-base font-semibold mt-0.5">Rs {subtotal.toLocaleString()}</p>
                    </div>
                    <button onClick={onNext}
                        className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition cursor-pointer">
                        Continue to Payment
                    </button>
                </div>
            )}

            <button onClick={onBack}
                className="text-sm text-neutral-500 hover:text-neutral-800 transition flex items-center gap-1.5 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"/>
                </svg>
                Back to Table Selection
            </button>
        </div>
    )
}

// ── Step 3 — Payment ─────────────────────────────────────────────────────────
const StepPayment = ({ table, cart, onBack, onPlace }) => {
    const [method, setMethod] = React.useState('cash')
    const [note, setNote] = React.useState('')
    const [placed, setPlaced] = React.useState(false)

    const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0)
    const tax = Math.round(subtotal * 0.13)
    const total = subtotal + tax

    const handlePlace = () => {
        onPlace({ table, cart, method, note, total })
        setPlaced(true)
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
                        className="mt-5 w-full bg-orange-500 hover:bg-orange-400 text-white text-sm font-seVmibold py-3.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5"/>
                        </svg>
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    )
}

// ── Main component ────────────────────────────────────────────────────────────
const OrderForm = () => {
    const [step, setStep] = React.useState(1)
    const [table, setTable] = React.useState(null)
    const [cart, setCart] = React.useState([])

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

    const handlePlace = (orderData) => {
        console.log('Order placed:', orderData)
        // TODO: POST to /api/orders
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
                        Select your table, pick your dishes, and pay — all in a few steps.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
                <StepBar current={step} />

                {step === 1 && (
                    <StepTable
                        selected={table}
                        onSelect={setTable}
                        onNext={() => setStep(2)}
                    />
                )}

                {step === 2 && (
                    <StepFood
                        cart={cart}
                        onAdd={addToCart}
                        onRemove={removeFromCart}
                        onNext={() => setStep(3)}
                        onBack={() => setStep(1)}
                    />
                )}

                {step === 3 && (
                    <StepPayment
                        table={table}
                        cart={cart}
                        onBack={() => setStep(2)}
                        onPlace={handlePlace}
                    />
                )}
            </div>
        </div>
    )
}

export default OrderForm
