import React from 'react'

const menuItems = [
    {
        id: 1,
        title: "Grilled Salmon",
        description: "Fresh Atlantic salmon with lemon butter sauce and seasonal vegetables.",
        price: 649,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600",
        category: "Main Course"
    },
    {
        id: 2,
        title: "Truffle Pasta",
        description: "Handmade fettuccine with black truffle, parmesan and fresh herbs.",
        price: 499,
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600",
        category: "Pasta"
    },
    {
        id: 3,
        title: "Beef Tenderloin",
        description: "Prime cut beef tenderloin with red wine reduction and mashed potatoes.",
        price: 899,
        image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=600",
        category: "Main Course"
    },
    {
        id: 4,
        title: "Margherita Pizza",
        description: "Wood-fired pizza with San Marzano tomatoes, fresh mozzarella and basil.",
        price: 349,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600",
        category: "Pizza"
    },
    {
        id: 5,
        title: "Caesar Salad",
        description: "Crisp romaine lettuce, house-made caesar dressing, croutons and parmesan.",
        price: 249,
        image: "https://images.unsplash.com/photo-1512852939750-1305098529bf?w=600",
        category: "Salad"
    },
    {
        id: 6,
        title: "Chocolate Lava Cake",
        description: "Warm dark chocolate cake with a molten center, served with vanilla ice cream.",
        price: 199,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600",
        category: "Dessert"
    },
    {
        id: 7,
        title: "Chicken Tikka",
        description: "Tender chicken marinated in spiced yogurt, grilled in a tandoor oven.",
        price: 399,
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600",
        category: "Main Course"
    },
    {
        id: 8,
        title: "Mushroom Risotto",
        description: "Creamy arborio rice with wild mushrooms, white wine and aged parmesan.",
        price: 379,
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600",
        category: "Rice"
    },
]

const Menu = () => {
    const [cart, setCart] = React.useState([])
    const [searchTerm, setSearchTerm] = React.useState('')

    const addToCart = (item) => {
        setCart(prev => {
            const exists = prev.find(c => c.id === item.id)
            if (exists) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
            return [...prev, { ...item, qty: 1 }]
        })
    }

    const filteredMenuItems = menuItems.filter(item => {
        const term = searchTerm.trim().toLowerCase()
        if (!term) return true

        return (
            item.title.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term) ||
            item.category.toLowerCase().includes(term)
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
                        <button className="text-sm bg-white text-neutral-900 px-4 py-1.5 rounded-lg font-medium hover:bg-neutral-100 transition">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredMenuItems.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-neutral-500">
                            No items found for "{searchTerm}".
                        </div>
                    ) : (
                        filteredMenuItems.map(item => (
                        <div key={item.id} className="group rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">

                            {/* Image */}
                            <div className="relative overflow-hidden h-48">
                                <img
                                    src={item.image}
                                    alt={item.title}
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
                                <h3 className="text-neutral-900 font-semibold text-base">{item.title}</h3>
                                <p className="text-neutral-500 text-xs mt-1 flex-1 leading-relaxed">{item.description}</p>

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
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Menu
