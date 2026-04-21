import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import MenuItems from "../components/MenuItems";

function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("orders"); // 'orders' or 'menu'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://restaurant-s0qk.onrender.com/api/orders",
        getAuthConfig()
      );
      setOrders(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching orders:", err);
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        setTimeout(() => navigate("/auth"), 2000);
      } else {
        setError("Failed to load orders. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `https://restaurant-s0qk.onrender.com/api/orders/${orderId}/status`,
        { status: newStatus },
        getAuthConfig()
      );
      await fetchOrders();
    } catch (err) {
      console.error("Error updating order:", err);
      setError("Failed to update order status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "processing": return "status-processing";
      case "preparing": return "status-preparing";
      case "served": return "status-served";
      case "paid": return "status-paid";
      default: return "";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "processing": return "🕒 Processing";
      case "preparing": return "👨‍🍳 Preparing";
      case "served": return "✅ Served";
      case "paid": return "💰 Paid";
      default: return status;
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== "admin") {
      navigate("/auth");
      return;
    }
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const totalRevenue = orders
    .filter(order => order.status === "paid")
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const pendingOrders = orders.filter(
    order => order.status === "processing" || order.status === "preparing"
  ).length;

  if (loading && orders.length === 0 && activeTab === "orders") {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      
      <div className="main-content">
        <div className="top-bar">
          <h1>Admin Dashboard</h1>
          <div className="tab-buttons">
            <button 
              className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              📦 Orders
            </button>
            <button 
              className={`tab-btn ${activeTab === "menu" ? "active" : ""}`}
              onClick={() => setActiveTab("menu")}
            >
              🍽️ Menu Management
            </button>
          </div>
          <div className="admin-info">
            <span>👋 Welcome back!</span>
          </div>
        </div>

        {activeTab === "orders" ? (
          <>
            <div className="stats-container">
              <div className="stat-card">
                <h3>Total Orders</h3>
                <p className="stat-number">{orders.length}</p>
              </div>
              <div className="stat-card">
                <h3>Pending Orders</h3>
                <p className="stat-number pending">{pendingOrders}</p>
              </div>
              <div className="stat-card">
                <h3>Total Revenue</h3>
                <p className="stat-number">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="orders-container">
              <h2>📋 Recent Orders</h2>
              {orders.length === 0 ? (
                <div className="no-orders">No orders yet</div>
              ) : (
                <div className="orders-grid">
                  {orders.map((order) => (
                    <div key={order._id} className="order-card">
                      <div className="order-header">
                        <div>
                          <h3>Order #{order._id.slice(-6)}</h3>
                          <p>Table {order.tableNumber}</p>
                        </div>
                        <div className={`status-badge ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </div>
                      </div>
                      <div className="order-details">
                        <p className="order-time">
                          🕐 {new Date(order.createdAt).toLocaleString()}
                        </p>
                        <div className="order-items">
                          <strong>Items:</strong>
                          {order.items.map((item, idx) => (
                            <div key={idx} className="order-item">
                              <span>{item.name} x {item.quantity}</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="order-total">
                          <strong>Total:</strong>
                          <strong>${order.totalAmount.toFixed(2)}</strong>
                        </div>
                      </div>
                      <div className="order-actions">
                        {order.status === "processing" && (
                          <button onClick={() => updateOrderStatus(order._id, "preparing")}>
                            Start Preparing
                          </button>
                        )}
                        {order.status === "preparing" && (
                          <button onClick={() => updateOrderStatus(order._id, "served")}>
                            Mark as Served
                          </button>
                        )}
                        {order.status === "served" && (
                          <button onClick={() => updateOrderStatus(order._id, "paid")}>
                            Mark as Paid
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="menu-management">
            <div className="menu-header-actions">
              <button onClick={() => navigate("/admin/add-menu")} className="add-menu-btn">
                ➕ Add New Menu Item
              </button>
            </div>
            <MenuItems userRole="admin" />
          </div>
        )}
      </div>

      <style>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: #f5f5f5;
        }

        .main-content {
          flex: 1;
          margin-left: 260px;
          padding: 20px;
          transition: margin-left 0.3s ease;
        }

        .admin-sidebar.collapsed ~ .main-content {
          margin-left: 70px;
        }

        .top-bar {
          background: white;
          padding: 20px 30px;
          border-radius: 10px;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .top-bar h1 {
          margin: 0;
          font-size: 24px;
          color: #333;
        }

        .tab-buttons {
          display: flex;
          gap: 10px;
        }

        .tab-btn {
          padding: 8px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }

        .tab-btn.active {
          background: #667eea;
          color: white;
        }

        .tab-btn:not(.active) {
          background: #e0e0e0;
          color: #666;
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .stat-card h3 {
          margin: 0 0 10px 0;
          color: #666;
          font-size: 14px;
        }

        .stat-number {
          font-size: 32px;
          font-weight: bold;
          color: #667eea;
          margin: 0;
        }

        .stat-number.pending {
          color: #ff9800;
        }

        .orders-container {
          background: white;
          padding: 20px;
          border-radius: 10px;
        }

        .orders-grid {
          display: grid;
          gap: 20px;
          margin-top: 20px;
        }

        .order-card {
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 20px;
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }

        .status-badge {
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
        }

        .status-processing { background: #fff3e0; color: #ff9800; }
        .status-preparing { background: #e3f2fd; color: #2196f3; }
        .status-served { background: #e8f5e9; color: #4caf50; }
        .status-paid { background: #f3e5f5; color: #9c27b0; }

        .order-items {
          margin: 10px 0;
          padding: 10px;
          background: #f9f9f9;
          border-radius: 5px;
        }

        .order-item {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
        }

        .order-total {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid #eee;
        }

        .order-actions button {
          background: #667eea;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
        }

        .menu-management {
          background: white;
          padding: 20px;
          border-radius: 10px;
        }

        .menu-header-actions {
          margin-bottom: 30px;
        }

        .add-menu-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 70px;
          }
          
          .top-bar {
            flex-direction: column;
            gap: 15px;
          }
          
          .stats-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default AdminPage;