// In admin/Dashboard.jsx or create a new UserDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [orderMessage, setOrderMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (!token || !userData) {
      navigate("/auth");
      return;
    }
    
    setUser(JSON.parse(userData));
    fetchMenu();
  }, [navigate]);

  const fetchMenu = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/menu");
      setMenu(response.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setLoading(false);
    }
  };

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

      await axios.post("http://localhost:1000/api/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setOrderMessage("Order placed successfully!");
      setCart([]);
      setTableNumber("");
      
      setTimeout(() => setOrderMessage(""), 3000);
    } catch (error) {
      console.error("Error placing order:", error);
      setOrderMessage("Failed to place order");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  if (loading) {
    return <div className="loading">Loading menu...</div>;
  }

  return (
    <div className="user-dashboard">
      <div className="navbar">
        <h1>QR Restaurant</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}!</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="menu-section">
          <h2>Menu</h2>
          <div className="menu-grid">
            {menu.map((item) => (
              <div key={item._id} className="menu-card">
                {item.image && (
                  <img 
                    src={`http://localhost:1000/uploads/${item.image}`} 
                    alt={item.name}
                    className="menu-image"
                    onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150?text=No+Image";
                }}
                  />
                )}
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className="price">${item.price}</p>
                <button onClick={() => addToCart(item)} className="add-btn">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-section">
          <h2>Your Order</h2>
          <input
            type="number"
            placeholder="Table Number"
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
                    <span className="cart-item-price">${item.price}</span>
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
                <strong>Total: ${getTotalAmount().toFixed(2)}</strong>
                <button onClick={placeOrder} className="place-order-btn">
                  Place Order
                </button>
              </div>
            </>
          )}
          
          {orderMessage && <div className="order-message">{orderMessage}</div>}
        </div>
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
        }

        .logout-btn {
          background: rgba(255,255,255,0.2);
          color: white;
          border: 1px solid white;
          padding: 5px 15px;
          border-radius: 5px;
          cursor: pointer;
        }

        .dashboard-content {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 20px;
          padding: 20px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .menu-section {
          background: white;
          border-radius: 10px;
          padding: 20px;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .menu-card {
          background: white;
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 15px;
          text-align: center;
        }

        .menu-image {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 5px;
        }

        .price {
          font-size: 20px;
          font-weight: bold;
          color: #667eea;
        }

        .add-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
        }

        .cart-section {
          background: white;
          border-radius: 10px;
          padding: 20px;
          position: sticky;
          top: 20px;
          height: fit-content;
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
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default UserDashboard;