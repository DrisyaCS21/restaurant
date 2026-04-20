import { useState, useEffect } from "react";
import axios from "axios";

function MenuItems({ userRole, onAddToCart }) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique categories
  const categories = ["all", ...new Set(menu.map(item => item.category))];

  const fetchMenu = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/menu");
      setMenu(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching menu:", err);
      setError("Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Filter menu based on category and search
  const filteredMenu = menu.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="menu-loading">
        <div className="spinner"></div>
        <p>Loading delicious menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-error">
        <p>❌ {error}</p>
        <button onClick={fetchMenu}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="menu-items-container">
      {/* Search and Filter Bar */}
      <div className="menu-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-btn ${selectedCategory === category ? "active" : ""}`}
            >
              {category === "all" ? "All Items" : category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      {filteredMenu.length === 0 ? (
        <div className="no-items">
          <p>🍽️ No menu items found</p>
        </div>
      ) : (
        <div className="menu-grid">
          {filteredMenu.map((item) => (
            <div key={item._id} className={`menu-card ${!item.available ? "unavailable" : ""}`}>
              {item.image && (
                <div className="menu-image-wrapper">
                  <img 
                    src={`http://localhost:1000/uploads/${item.image}`} 
                    alt={item.name}
                    className="menu-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />
                  {!item.available && (
                    <div className="unavailable-badge">Currently Unavailable</div>
                  )}
                </div>
              )}
              
              <div className="menu-content">
                <div className="menu-header">
                  <h3>{item.name}</h3>
                  <span className="category-badge">
                    {item.category}
                  </span>
                </div>
                
                <p className="menu-description">{item.description || "Delicious dish prepared with fresh ingredients"}</p>
                
                <div className="menu-footer">
                  <span className="menu-price">₹{item.price}</span>
                  
                  {userRole === "admin" ? (
                    <div className="admin-badge">Admin View</div>
                  ) : (
                    <button 
                      onClick={() => onAddToCart(item)}
                      disabled={!item.available}
                      className={`order-btn ${!item.available ? "disabled" : ""}`}
                    >
                      {item.available ? "Add to Cart 🛒" : "Not Available"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .menu-items-container {
          width: 100%;
          padding: 20px;
        }

        .menu-controls {
          margin-bottom: 30px;
        }

        .search-box {
          margin-bottom: 20px;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.3s;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102,126,234,0.1);
        }

        .category-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .category-btn {
          padding: 8px 16px;
          background: #f0f0f0;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s;
        }

        .category-btn:hover {
          background: #e0e0e0;
        }

        .category-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 25px;
        }

        .menu-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .menu-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.15);
        }

        .menu-card.unavailable {
          opacity: 0.7;
          background: #f5f5f5;
        }

        .menu-image-wrapper {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .menu-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .menu-card:hover .menu-image {
          transform: scale(1.05);
        }

        .unavailable-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 12px;
          font-weight: bold;
        }

        .menu-content {
          padding: 20px;
        }

        .menu-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 10px;
        }

        .menu-header h3 {
          margin: 0;
          font-size: 18px;
          color: #333;
        }

        .category-badge {
          padding: 4px 10px;
          background: #667eea;
          border-radius: 20px;
          font-size: 11px;
          font-weight: bold;
          color: white;
        }

        .menu-description {
          color: #666;
          font-size: 14px;
          line-height: 1.5;
          margin: 10px 0;
          min-height: 60px;
        }

        .menu-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid #eee;
        }

        .menu-price {
          font-size: 22px;
          font-weight: bold;
          color: #667eea;
        }

        .admin-badge {
          background: #ff9800;
          color: white;
          padding: 6px 12px;
          border-radius: 5px;
          font-size: 12px;
          font-weight: bold;
        }

        .order-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .order-btn:hover:not(.disabled) {
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(102,126,234,0.3);
        }

        .order-btn.disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .menu-loading {
          text-align: center;
          padding: 60px;
        }

        .spinner {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #667eea;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .menu-error {
          text-align: center;
          padding: 60px;
        }

        .menu-error button {
          margin-top: 20px;
          padding: 10px 20px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .no-items {
          text-align: center;
          padding: 60px;
          color: #999;
        }

        @media (max-width: 768px) {
          .menu-grid {
            grid-template-columns: 1fr;
          }
          
          .category-filters {
            overflow-x: auto;
            flex-wrap: nowrap;
          }
        }
      `}</style>
    </div>
  );
}

export default MenuItems;