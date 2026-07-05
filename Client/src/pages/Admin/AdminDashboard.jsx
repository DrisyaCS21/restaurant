import React from 'react'
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import ManageTable from './ManageTable.jsx'
import UpdateProduct from './UpdateProduct.jsx'
import AddProduct from './AddProduct.jsx'
import OrderPage from './OrderPage.jsx'

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:1000"

// ── Revenue page ──────────────────────────────────────────────────────────────
const Revenue = () => {
    const { token } = React.useContext(AppContext)
    const [stats, setStats] = React.useState(null)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const fetchStats = async () => {
            if (!token) return
            try {
                const res = await fetch(`${backendUrl}/api/orders/stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (res.ok) {
                    const data = await res.json()
                    setStats(data)
                }
            } catch (err) {
                console.error('Error fetching stats:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [token])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading stats...</p>
                </div>
            </div>
        )
    }

    if (!stats) {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                <p className="text-gray-500">No data available</p>
            </div>
        )
    }

    const statCards = [
        {
            label: 'Total Revenue',
            value: `Rs ${stats.totalRevenue.toLocaleString()}`,
            change: 'All time',
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
            value: stats.totalOrders.toString(),
            change: 'Completed orders',
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
            value: `Rs ${stats.avgOrderValue.toLocaleString()}`,
            change: 'Per order',
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
            value: `Rs ${stats.monthRevenue.toLocaleString()}`,
            change: `${stats.monthChange >= 0 ? '+' : ''}${stats.monthChange}% vs last month`,
            positive: stats.monthChange >= 0,
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

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">Revenue</h2>
            <p className="text-gray-500 text-sm mb-6">Real-time performance overview</p>

            {/* Stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {statCards.map(card => (
                    <div key={card.label} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                {card.label}
                            </span>
                            <div className={card.bg + ' ' + card.color + ' w-10 h-10 rounded-xl flex items-center justify-center'}>
                                {card.icon}
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-2">{card.value}</p>
                        <p className={'text-xs font-medium ' + (card.positive ? 'text-green-600' : 'text-red-600')}>
                            {card.change}
                        </p>
                    </div>
                ))}
            </div>

            {/* Additional info */}
            <div className="mt-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200 p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 16v-4"/>
                            <path d="M12 8h.01"/>
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Real-Time Data</h3>
                        <p className="text-sm text-gray-700">
                            Stats are calculated from paid orders only. Current month revenue: <span className="font-bold">Rs {stats.monthRevenue.toLocaleString()}</span>
                            {stats.lastMonthRevenue > 0 && (
                                <> vs last month: <span className="font-bold">Rs {stats.lastMonthRevenue.toLocaleString()}</span></>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}





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
        label: 'Manage Tables',
        to: '/admindashboard/manage-tables',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <rect x="7" y="7" width="10" height="10" rx="1"/>
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
                    <Route path="orders" element={<OrderPage />} />
                    <Route path="manage-tables" element={<ManageTable />} />
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="update-product" element={<UpdateProduct />} />
                </Routes>
            </main>
        </div>
    )
}

export default AdminDashboard
