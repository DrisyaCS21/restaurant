import { useNavigate } from "react-router-dom";
import MenuItems from "../components/MenuItems";

function MenuPages() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAuthenticated = !!localStorage.getItem("token");

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      alert("Please login to add items to cart");
      navigate("/auth");
      return;
    }
    
    // Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Check if item already exists in cart
    const existingItem = cart.find(cartItem => cartItem._id === item._id);
    
    if (existingItem) {
      // Update quantity
      const updatedCart = cart.map(cartItem =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // Add new item
      localStorage.setItem("cart", JSON.stringify([...cart, { ...item, quantity: 1 }]));
    }
    
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="menu-page">
      <div className="menu-page-header">
        <h1>Our Menu</h1>
        {isAuthenticated && (
          <button onClick={() => navigate("/dashboard")} className="dashboard-link">
            Go to Dashboard →
          </button>
        )}
      </div>
      
      <MenuItems userRole="customer" onAddToCart={handleAddToCart} />

      <style>{`
        .menu-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .menu-page-header {
          max-width: 1200px;
          margin: 0 auto 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .menu-page-header h1 {
          color: white;
          font-size: 36px;
          margin: 0;
        }

        .dashboard-link {
          background: white;
          color: #667eea;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: transform 0.2s;
        }

        .dashboard-link:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .menu-page-header {
            flex-direction: column;
            gap: 15px;
          }
          
          .menu-page-header h1 {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
}

export default MenuPages;