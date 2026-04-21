import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MenuItems from "../components/MenuItems";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (!token || !userData) {
      navigate("/auth");
      return;
    }
    
    setUser(JSON.parse(userData));
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [navigate]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem._id === item._id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item._id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const placeOrder = async () => {
    if (!tableNumber) {
      setOrderMessage("Please enter table number");
      return;
    }
    
    if (cart.length === 0) {
      setOrderMessage("Cart is empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const orderData = {
        tableNumber: parseInt(tableNumber),
        items: cart.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      };

      await axios.post("https://restaurant-s0qk.onrender.com/api/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setOrderMessage("Order placed successfully!");
      setCart([]);
      setTableNumber("");
      setShowCart(false);
      
      setTimeout(() => setOrderMessage(""), 3000);
    } catch (error) {
      console.error("Error placing order:", error);
      setOrderMessage("Failed to place order");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/auth");
  };

  return (
    <div className="user-dashboard">
      <div className="navbar">
        <h1>🍕 QR Restaurant</h1>
        <div className="user-info">
          <span>👋 Welcome, {user?.name}!</span>
          <button onClick={() => setShowCart(!showCart)} className="cart-icon-btn">
            🛒 Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="menu-section">
          <h2>Our Delicious Menu</h2>
          <MenuItems userRole="user" onAddToCart={addToCart} />
        </div>

        {showCart && (
          <div className="cart-sidebar">
            <div className="cart-header">
              <h3>Your Order</h3>
              <button onClick={() => setShowCart(false)} className="close-cart">✕</button>
            </div>
            
            <input
              type="number"
              placeholder="Table Number *"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="table-input"
            />
            
            {cart.length === 0 ? (
              <p className="empty-cart">Cart is empty</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item._id} className="cart-item">
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-price">₹{item.price}</span>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                      <button onClick={() => removeFromCart(item._id)} className="remove-btn">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="cart-total">
                  <strong>Total: ₹{getTotalAmount().toFixed(2)}</strong>
                  <button onClick={placeOrder} className="place-order-btn">
                    Place Order ✅
                  </button>
                </div>
              </>
            )}
            
            {orderMessage && <div className="order-message">{orderMessage}</div>}
          </div>
        )}
      </div>

      <style>{`
        .user-dashboard {
          min-height: 100vh;
          background: #f5f5f5;
        }

        .navbar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .navbar h1 {
          margin: 0;
          font-size: 24px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .cart-icon-btn {
          background: rgba(255,255,255,0.2);
          color: white;
          border: 1px solid white;
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
        }

        .logout-btn {
          background: rgba(255,255,255,0.2);
          color: white;
          border: 1px solid white;
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
        }

        .dashboard-content {
          display: flex;
          padding: 20px;
          gap: 20px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .menu-section {
          flex: 1;
          background: white;
          border-radius: 10px;
          padding: 20px;
        }

        .menu-section h2 {
          margin: 0 0 20px 0;
          color: #333;
        }

        .cart-sidebar {
          width: 380px;
          background: white;
          border-radius: 10px;
          padding: 20px;
          position: sticky;
          top: 20px;
          height: fit-content;
          max-height: calc(100vh - 100px);
          overflow-y: auto;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .cart-header h3 {
          margin: 0;
          color: #333;
        }

        .close-cart {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #999;
        }

        .table-input {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        .cart-item {
          border-bottom: 1px solid #eee;
          padding: 10px 0;
        }

        .cart-item-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }

        .cart-item-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cart-item-controls button {
          background: #f0f0f0;
          border: none;
          padding: 5px 10px;
          cursor: pointer;
          border-radius: 3px;
        }

        .remove-btn {
          background: #ff4444 !important;
          color: white;
        }

        .cart-total {
          margin-top: 20px;
          padding-top: 10px;
          border-top: 2px solid #eee;
        }

        .place-order-btn {
          background: #4caf50;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
          margin-top: 10px;
        }

        .order-message {
          margin-top: 10px;
          padding: 10px;
          background: #d4edda;
          color: #155724;
          border-radius: 5px;
          text-align: center;
        }

        .empty-cart {
          text-align: center;
          color: #999;
          padding: 20px;
        }

        @media (max-width: 768px) {
          .dashboard-content {
            flex-direction: column;
          }
          
          .cart-sidebar {
            width: auto;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            max-height: 80vh;
            border-radius: 20px 20px 0 0;
            z-index: 1000;
          }
        }
      `}</style>
    </div>
  );
}

export default UserDashboard;