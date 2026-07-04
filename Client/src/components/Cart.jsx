import React from 'react'

// Sample cart items for UI preview
const sampleCart = [
    {
        id: 1,
        title: "Grilled Salmon",
        price: 649,
        qty: 2,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200",
    },
    {
        id: 2,
        title: "Truffle Pasta",
        price: 499,
        qty: 1,
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200",
    },
    {
        id: 3,
        title: "Margherita Pizza",
        price: 349,
        qty: 1,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200",
    },
]

const Cart = ({ isOpen = true, onClose = () => {} }) => {
    const [cart, setCart] = React.useState(sampleCart)

    const updateQty = (id, delta) => {
        setCart(prev =>
            prev
                .map(item => item.id === id ? { ...item, qty: item.qty + delta } : item)
                .filter(item => item.qty > 0)
        )
    }

    const removeItem = (id) => {
        setCart(prev => prev.filter(item => item.id !== id))
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
    const deliveryFee = 49
    const total = subtotal + deliveryFee

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                        </svg>
                        <h2 className="text-base font-semibold text-neutral-900">Your Cart</h2>
                        {cart.length > 0 && (
                            <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                                {cart.reduce((s, i) => s + i.qty, 0)}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-neutral-100 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                        </svg>
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-neutral-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                            </svg>
                            <p className="text-sm">Your cart is empty</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex gap-3 items-start">
                                {/* Thumbnail */}
                                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-neutral-900 truncate">{item.title}</p>
                                    <p className="text-sm text-neutral-500 mt-0.5">Rs{item.price}</p>

                                    {/* Qty controls */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => updateQty(item.id, -1)}
                                            className="w-6 h-6 rounded-md bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition text-sm"
                                        >−</button>
                                        <span className="text-sm font-medium w-4 text-center">{item.qty}</span>
                                        <button
                                            onClick={() => updateQty(item.id, 1)}
                                            className="w-6 h-6 rounded-md bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition text-sm"
                                        >+</button>
                                    </div>
                                </div>

                                {/* Item total + remove */}
                                <div className="flex flex-col items-end gap-2 shrink-0">
                                    <p className="text-sm font-semibold text-neutral-900">Rs{item.price * item.qty}</p>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-neutral-300 hover:text-red-500 transition"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer — summary + checkout */}
                {cart.length > 0 && (
                    <div className="px-5 py-5 border-t border-neutral-100 space-y-3">
                        <div className="flex justify-between text-sm text-neutral-500">
                            <span>Subtotal</span>
                            <span>Rs{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm text-neutral-500">
                            <span>Delivery fee</span>
                            <span>Rs{deliveryFee}</span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold text-neutral-900 pt-2 border-t border-neutral-100">
                            <span>Total</span>
                            <span>Rs{total}</span>
                        </div>

                        <button className="w-full bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium py-3 rounded-xl transition cursor-pointer mt-1">
                            Proceed to Checkout
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full text-sm text-neutral-500 hover:text-neutral-800 transition py-1"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default Cart
