import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

function AdminPage() {
  const [orders, setOrders] = useState([]);
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
        "http://localhost:1000/api/orders",
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
        `http://localhost:1000/api/orders/${orderId}/status`,
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

  if (loading && orders.length === 0) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      
      <div className="main-content">
        <div className="top-bar">
          <h1>Dashboard Overview</h1>
          <div className="admin-info">
            <span>👋 Welcome back!</span>
          </div>
        </div>

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
              {orders.slice(0, 10).map((order) => (
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

        /* When sidebar is collapsed */
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

        .admin-info {
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
          transition: transform 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-5px);
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

        .error-message {
          background: #f8d7da;
          color: #721c24;
          padding: 12px;
          border-radius: 5px;
          margin-bottom: 20px;
          text-align: center;
        }

        .orders-container {
          background: white;
          padding: 20px;
          border-radius: 10px;
        }

        .orders-container h2 {
          margin: 0 0 20px 0;
          color: #333;
        }

        .no-orders {
          text-align: center;
          padding: 40px;
          color: #999;
        }

        .orders-grid {
          display: grid;
          gap: 20px;
        }

        .order-card {
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 20px;
          transition: box-shadow 0.2s;
        }

        .order-card:hover {
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }

        .order-header h3 {
          margin: 0 0 5px 0;
          color: #333;
        }

        .order-header p {
          margin: 0;
          color: #666;
          font-size: 14px;
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

        .order-time {
          color: #999;
          font-size: 12px;
          margin: 0 0 10px 0;
        }

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
          font-size: 14px;
        }

        .order-total {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid #eee;
        }

        .order-actions {
          margin-top: 15px;
        }

        .order-actions button {
          background: #667eea;
          color: white;
          border: none;
          padding: 8px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.2s;
        }

        .order-actions button:hover {
          background: #5a67d8;
        }

        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          font-size: 20px;
          color: #667eea;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 70px;
            padding: 10px;
          }
          
          .stats-container {
            grid-template-columns: 1fr;
          }
          
          .top-bar h1 {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}

export default AdminPage;