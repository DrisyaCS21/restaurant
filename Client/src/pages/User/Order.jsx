import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:1000"

const Order = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, token } = React.useContext(AppContext)
    const [orders, setOrders] = React.useState([])
    const [selectedOrder, setSelectedOrder] = React.useState(location.state?.order || null)
    const [loading, setLoading] = React.useState(true)

    // Fetch all user orders
    React.useEffect(() => {
        const fetchOrders = async () => {
            if (!user) {
                setLoading(false)
                return
            }

            try {
                const headers = {}
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`
                }

                const res = await fetch(`${backendUrl}/api/orders`, { headers })
                if (res.ok) {
                    const allOrders = await res.json()
                    // Filter orders for current user
                    const userOrders = allOrders.filter(o => o.user === user._id)
                    setOrders(userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
                    
                    // If no order selected from navigation, select the latest active one
                    if (!selectedOrder && userOrders.length > 0) {
                        const activeOrder = userOrders.find(o => o.status !== 'paid')
                        setSelectedOrder(activeOrder || userOrders[0])
                    }
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [user, token])

    const getStatusInfo = (status) => {
        switch (status) {
            case 'processing':
                return {
                    label: 'Processing',
                    color: 'text-yellow-600',
                    bg: 'bg-yellow-100',
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                    )
                }
            case 'preparing':
                return {
                    label: 'Preparing',
                    color: 'text-blue-600',
                    bg: 'bg-blue-100',
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
                            <line x1="6" x2="18" y1="17" y2="17"/>
                        </svg>
                    )
                }
            case 'served':
                return {
                    label: 'Served',
                    color: 'text-green-600',
                    bg: 'bg-green-100',
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5"/>
                        </svg>
                    )
                }
            case 'paid':
                return {
                    label: 'Paid',
                    color: 'text-gray-600',
                    bg: 'bg-gray-100',
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="14" x="2" y="5" rx="2"/>
                            <line x1="2" x2="22" y1="10" y2="10"/>
                        </svg>
                    )
                }
            default:
                return {
                    label: 'Unknown',
                    color: 'text-gray-600',
                    bg: 'bg-gray-100',
                    icon: null
                }
        }
    }

    const handleAddMore = () => {
        navigate('/order', { 
            state: { 
                activeOrder: selectedOrder 
            } 
        })
    }

    // Redirect non-logged in users
    React.useEffect(() => {
        if (!loading && !user) {
            navigate('/menu')
        }
    }, [loading, user, navigate])

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-neutral-500">Loading your order...</p>
                </div>
            </div>
        )
    }

    if (!orders.length) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center py-20">
                <div className="text-center max-w-md px-4">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                            fill="none" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-neutral-900 mb-2">No orders found</h2>
                    <p className="text-neutral-500 mb-6">You haven't placed any orders yet.</p>
                    <button
                        onClick={() => navigate('/menu')}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-medium hover:bg-orange-400 transition"
                    >
                        Browse Menu
                    </button>
                </div>
            </div>
        )
    }

    const order = selectedOrder || orders[0]

    const statusInfo = getStatusInfo(order.status)
    const canAddMore = order.status !== 'paid'

    return (
        <div className="min-h-screen bg-white">
            {/* Banner */}
            <div className="relative h-52 md:h-64 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600"
                    alt="Order banner"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/65" />
                <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-16 lg:px-24">
                    <p className="text-orange-400 text-xs font-medium uppercase tracking-widest mb-2">Your Orders</p>
                    <h1 className="text-3xl md:text-4xl font-semibold text-white">
                        Order History
                    </h1>
                    <p className="text-sm text-neutral-300 mt-2 max-w-md">
                        View all your orders and their current status
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
                {/* Success Message */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5"/>
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold text-green-900 mb-1">Order Placed Successfully!</h2>
                            <p className="text-sm text-green-700">
                                Your order has been received and is being processed. 
                                {order.tableNumber !== 'Online Order' && ` Table: ${order.tableNumber}`}
                            </p>
                            <p className="text-xs text-green-600 mt-2">
                                Order ID: <span className="font-mono">{order._id}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left - Order Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Status Card */}
                        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-12 h-12 rounded-full ${statusInfo.bg} flex items-center justify-center ${statusInfo.color}`}>
                                    {statusInfo.icon}
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-neutral-900">
                                        {statusInfo.label}
                                    </h3>
                                    <p className="text-xs text-neutral-500">
                                        {new Date(order.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="h-px bg-neutral-200 my-4" />
                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-neutral-600">Table</span>
                                    <span className="font-medium text-neutral-900">{order.tableNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-neutral-600">Payment Method</span>
                                    <span className="font-medium text-neutral-900 capitalize">{order.paymentMethod}</span>
                                </div>
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Order Items</h3>
                            <div className="space-y-4">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between gap-4 pb-4 border-b border-neutral-100 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                            <span className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-600 text-sm font-medium flex items-center justify-center shrink-0">
                                                {item.quantity}x
                                            </span>
                                            <span className="text-sm font-medium text-neutral-900 truncate">{item.name}</span>
                                        </div>
                                        <span className="text-sm font-semibold text-neutral-900 shrink-0">
                                            Rs {(item.price * item.quantity).toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {order.specialInstructions && (
                                <>
                                    <div className="h-px bg-neutral-200 my-4" />
                                    <div>
                                        <p className="text-xs font-medium text-neutral-500 mb-1">Special Instructions</p>
                                        <p className="text-sm text-neutral-700">{order.specialInstructions}</p>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Add More Button */}
                        {canAddMore && (
                            <button
                                onClick={handleAddMore}
                                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" x2="12" y1="5" y2="19"/>
                                    <line x1="5" x2="19" y1="12" y2="12"/>
                                </svg>
                                Add More Items to Order
                            </button>
                        )}
                    </div>

                    {/* Right - Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-neutral-950 rounded-2xl p-6 text-white sticky top-6">
                            <h3 className="text-base font-semibold mb-4">Order Summary</h3>
                            
                            <div className="space-y-3 mb-5 pb-5 border-b border-neutral-800">
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-400">Subtotal</span>
                                    <span className="text-white">Rs {order.totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-400">Items</span>
                                    <span className="text-white">
                                        {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span className="text-orange-500">Rs {order.totalAmount.toLocaleString()}</span>
                            </div>

                            <div className="mt-6 pt-6 border-t border-neutral-800">
                                <button
                                    onClick={() => navigate('/menu')}
                                    className="w-full bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium py-2.5 rounded-lg transition"
                                >
                                    Browse Menu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order
