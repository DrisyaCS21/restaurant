import React from 'react'
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts'

// ── Mock data ─────────────────────────────────────────────────────────────────
const monthlyRevenue = [
    { month: 'Jan', revenue: 4200, orders: 38 },
    { month: 'Feb', revenue: 5800, orders: 52 },
    { month: 'Mar', revenue: 4900, orders: 44 },
    { month: 'Apr', revenue: 7100, orders: 63 },
    { month: 'May', revenue: 6400, orders: 57 },
    { month: 'Jun', revenue: 8200, orders: 74 },
    { month: 'Jul', revenue: 9100, orders: 81 },
    { month: 'Aug', revenue: 7600, orders: 68 },
    { month: 'Sep', revenue: 8800, orders: 79 },
    { month: 'Oct', revenue: 10200, orders: 91 },
    { month: 'Nov', revenue: 9400, orders: 85 },
    { month: 'Dec', revenue: 11500, orders: 103 },
]

const statCards = [
    {
        label: 'Total Revenue',
        value: '\u0930\u0942 93,200',
        change: '+12.5%',
        positive: true,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
        ),
        bg: 'bg-orange-50',
        color: 'text-orange-500',
    },
    {
        label: 'Total Orders',
        value: '835',
        change: '+8.2%',
        positive: true,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
        ),
        bg: 'bg-blue-50',
        color: 'text-blue-500',
    },
    {
        label: 'Avg Order Value',
        value: '\u0930\u0942 111.6',
        change: '+3.8%',
        positive: true,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                <polyline points="16 7 22 7 22 13"/>
            </svg>
        ),
        bg: 'bg-green-50',
        color: 'text-green-500',
    },
    {
        label: 'This Month',
        value: '\u0930\u0942 11,500',
        change: '+22.3%',
        positive: true,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
        ),
        bg: 'bg-purple-50',
        color: 'text-purple-500',
    },
]

// ── Formatters (no template literals to avoid corruption) ────────────────────
function formatRevenue(v) {
    return '\u0930\u0942 ' + (v / 1000).toFixed(0) + 'k'
}

// ── Custom tooltip ────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 text-sm">
            <p className="font-semibold text-gray-700 mb-1">{label}</p>
            <p className="text-orange-500">
                Revenue: <span className="font-medium">{'\u0930\u0942 '}{payload[0] && payload[0].value && payload[0].value.toLocaleString()}</span>
            </p>
            <p className="text-blue-500">
                Orders: <span className="font-medium">{payload[1] && payload[1].value}</span>
            </p>
        </div>
    )
}

// ── Revenue page ──────────────────────────────────────────────────────────────
const Revenue = () => (
    <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Revenue</h2>
        <p className="text-gray-500 text-sm mb-6">Annual performance overview</p>

        {/* Stat cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {statCards.map(card => (
                <div key={card.label} className="bg-white rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                            {card.label}
                        </span>
                        <div className={card.bg + ' ' + card.color + ' w-9 h-9 rounded-xl flex items-center justify-center'}>
                            {card.icon}
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    <p className={'text-xs mt-1 font-medium ' + (card.positive ? 'text-green-500' : 'text-red-500')}>
                        {card.change} <span className="text-gray-400 font-normal">vs last year</span>
                    </p>
                </div>
            ))}
        </div>

        {/* Area chart */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-base font-semibold text-gray-800">Monthly Revenue</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Jan – Dec 2025</p>
                </div>
                <span className="text-xs bg-orange-50 text-orange-500 font-medium px-3 py-1 rounded-full">
                    +12.5% YoY
                </span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={monthlyRevenue} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.18} />
                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false}
                        tickFormatter={formatRevenue} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2.5}
                        fill="url(#revenueGrad)" dot={false} activeDot={{ r: 5, fill: '#f97316' }} />
                    <Area type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2}
                        fill="none" dot={false} activeDot={{ r: 4, fill: '#3b82f6' }} />
                </AreaChart>
            </ResponsiveContainer>
        </div>

        {/* Bar chart */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-800">Revenue vs Orders by Month</h3>
                <p className="text-xs text-gray-400 mt-0.5">Side-by-side comparison</p>
            </div>
            <ResponsiveContainer width="100%" height={240}>
                <BarChart data={monthlyRevenue} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="rev" orientation="left" tick={{ fontSize: 12, fill: '#9ca3af' }}
                        axisLine={false} tickLine={false} tickFormatter={formatRevenue} />
                    <YAxis yAxisId="ord" orientation="right" tick={{ fontSize: 12, fill: '#9ca3af' }}
                        axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                    <Bar yAxisId="rev" dataKey="revenue" fill="#f97316" radius={[6, 6, 0, 0]} maxBarSize={28} name="Revenue" />
                    <Bar yAxisId="ord" dataKey="orders" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={28} name="Orders" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
)

// ── Placeholder pages ─────────────────────────────────────────────────────────
const OrderHistory = () => (
    <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Order History</h2>
        <p className="text-gray-500 text-sm">View and manage all customer orders.</p>
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-400">
            Orders will appear here
        </div>
    </div>
)

const AddProduct = () => (
    <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Add Product</h2>
        <p className="text-gray-500 text-sm">Add a new item to the menu.</p>
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-400">
            Add product form will appear here
        </div>
    </div>
)

const UpdateProduct = () => (
    <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Update Product</h2>
        <p className="text-gray-500 text-sm">Edit or remove existing menu items.</p>
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-400">
            Product list will appear here
        </div>
    </div>
)

// ── Nav items ─────────────────────────────────────────────────────────────────
const navItems = [
    {
        label: 'Revenue',
        to: '/admindashboard/revenue',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                <polyline points="16 7 22 7 22 13"/>
            </svg>
        ),
    },
    {
        label: 'Order History',
        to: '/admindashboard/orders',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
        ),
    },
    {
        label: 'Add Product',
        to: '/admindashboard/add-product',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v8M8 12h8"/>
            </svg>
        ),
    },
    {
        label: 'Update Product',
        to: '/admindashboard/update-product',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
        ),
    },
]

// ── Sidebar ───────────────────────────────────────────────────────────────────
const Sidebar = ({ collapsed, setCollapsed }) => {
    const { user, logout } = React.useContext(AppContext)

    return (
        <aside
            className={'sticky top-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col transition-all duration-300 shadow-xl shrink-0 ' + (collapsed ? 'w-[70px]' : 'w-[240px]')}
        >
            {/* Header */}
            <div className={'flex items-center gap-3 px-5 py-5 border-b border-white/10 ' + (collapsed ? 'justify-center' : '')}>
                <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                        fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 11l19-9-9 19-2-8-8-2z"/>
                    </svg>
                </div>
                {!collapsed && (
                    <div>
                        <p className="text-sm font-semibold leading-tight">Admin Panel</p>
                        <p className="text-xs text-gray-400 truncate max-w-[130px]">{user ? user.name : 'Administrator'}</p>
                    </div>
                )}
            </div>

            {/* Collapse toggle */}
            <button
                onClick={() => setCollapsed(function(c) { return !c })}
                className="absolute -right-3 top-[26px] w-6 h-6 rounded-full bg-orange-500 hover:bg-orange-400 text-white flex items-center justify-center shadow-md transition-colors z-10"
                title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    className={'transition-transform duration-300 ' + (collapsed ? 'rotate-0' : 'rotate-180')}>
                    <path d="M15 18l-6-6 6-6"/>
                </svg>
            </button>

            {/* Nav */}
            <nav className="flex-1 flex flex-col gap-1 px-3 py-4 overflow-y-auto">
                {navItems.map(function(item) {
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            title={collapsed ? item.label : ''}
                            className={function({ isActive }) {
                                return 'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ' +
                                    (collapsed ? 'justify-center ' : '') +
                                    (isActive
                                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                                        : 'text-gray-300 hover:bg-white/10 hover:text-white')
                            }}
                        >
                            <span className="shrink-0">{item.icon}</span>
                            {!collapsed && <span className="truncate">{item.label}</span>}
                        </NavLink>
                    )
                })}
            </nav>

            {/* Logout */}
            <div className="px-3 py-4 border-t border-white/10">
                <button
                    onClick={logout}
                    title={collapsed ? 'Logout' : ''}
                    className={'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-150 ' + (collapsed ? 'justify-center' : '')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="shrink-0">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    )
}

// ── Main dashboard ────────────────────────────────────────────────────────────
const AdminDashboard = () => {
    const [collapsed, setCollapsed] = React.useState(false)

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            <main className="flex-1 min-w-0 p-8">
                <Routes>
                    <Route index element={<Navigate to="revenue" replace />} />
                    <Route path="revenue" element={<Revenue />} />
                    <Route path="orders" element={<OrderHistory />} />
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="update-product" element={<UpdateProduct />} />
                </Routes>
            </main>
        </div>
    )
}

export default AdminDashboard
