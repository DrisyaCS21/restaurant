import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import "./MenuPage.css";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const tableNumber = searchParams.get("table") || "1";

  // Fetch menu from backend
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/menu");
        setMenu(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching menu:", err);
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Get unique categories
  const categories = ["all", ...new Set(menu.map(item => item.category))];
  
  // Filter menu by category
  const filteredMenu = selectedCategory === "all" 
    ? menu 
    : menu.filter(item => item.category === selectedCategory);

  // Add item to cart
  const addToCart = (item) => {
    const existing = cart.find(i => i._id === item._id);
    if (existing) {
      setCart(cart.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    
    // Add animation effect
    const element = document.getElementById(`item-${item._id}`);
    if (element) {
      element.classList.add('add-to-cart-animation');
      setTimeout(() => {
        element.classList.remove('add-to-cart-animation');
      }, 300);
    }
  };

  // Update quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(cart.filter(i => i._id !== itemId));
    } else {
      setCart(cart.map(i => i._id === itemId ? { ...i, quantity: newQuantity } : i));
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter(i => i._id !== itemId));
  };

  // Clear cart
  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCart([]);
    }
  };

  // Place order
  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty! Add some items to order.");
      return;
    }

    try {
      await axios.post("http://localhost:1000/api/orders", {
        tableNumber,
        items: cart.map(i => ({
          name: i.name,
          price: i.price,
          quantity: i.quantity
        }))
      });

      alert(`Order placed successfully for Table ${tableNumber}!`);
      setCart([]);
      setIsCartOpen(false);
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading our delicious menu...</p>
      </div>
    );
  }

  return (
    <div className="menu-page">
      {/* Header */}
      <header className="menu-header">
        <div className="header-content">
          <div className="restaurant-info">
            <h1>🍽️ Drisya's Kitchen</h1>
            <div className="table-badge">
              <span className="table-icon">🪑</span>
              <span>Table {tableNumber}</span>
            </div>
          </div>
          <button 
            className={`cart-icon-button ${totalItems > 0 ? 'has-items' : ''}`}
            onClick={() => setIsCartOpen(true)}
          >
            <span className="cart-icon">🛒</span>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="menu-hero">
        <div className="hero-overlay"></div>
        <div className="hero-text">
          <h2>Explore Our Menu</h2>
          <p>Handcrafted with love, served with joy</p>
        </div>
      </div>

      {/* Categories */}
      <div className="categories-container">
        <div className="categories-scroll">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === "all" ? "All Items" : category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="menu-container">
        <div className="menu-grid">
          {filteredMenu.map(item => (
            <div key={item._id} id={`item-${item._id}`} className="menu-card">
              <div className="menu-card-inner">
                {item.image && (
                  <img
                    src={`http://localhost:1000/uploads/${item.image}`}
                    alt={item.name}
                    className="menu-item-image"
                  />
                )}
                <div className="menu-card-content">
                  <div className="menu-item-header">
                    <h3 className="menu-item-name">{item.name}</h3>
                    <span className="menu-item-price">₹{item.price}</span>
                  </div>
                  <p className="menu-item-category">{item.category}</p>
                  {item.description && (
                    <p className="menu-item-description">{item.description}</p>
                  )}
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(item)}
                  >
                    <span>+</span> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-sidebar-header">
          <h3>
            <span className="cart-icon">🛒</span>
            Your Order
          </h3>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>✕</button>
        </div>

        <div className="cart-sidebar-content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛍️</div>
              <p>Your cart is empty</p>
              <p className="empty-cart-subtitle">Add some delicious items from the menu</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item._id} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p className="cart-item-price">₹{item.price}</p>
                    </div>
                    <div className="cart-item-actions">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button 
                        className="remove-item"
                        onClick={() => removeFromCart(item._id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Total Items:</span>
                  <span>{totalItems}</span>
                </div>
                <div className="summary-row total">
                  <span>Total Amount:</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="summary-row tax">
                  <span>Tax (5% GST):</span>
                  <span>₹{(totalPrice * 0.05).toFixed(2)}</span>
                </div>
                <div className="summary-row grand-total">
                  <span>Grand Total:</span>
                  <span>₹{(totalPrice * 1.05).toFixed(2)}</span>
                </div>
              </div>

              <div className="cart-actions">
                <button className="clear-cart-btn" onClick={clearCart}>
                  Clear Cart
                </button>
                <button className="place-order-btn" onClick={placeOrder}>
                  Place Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>}
    </div>
  );
};

export default MenuPage;