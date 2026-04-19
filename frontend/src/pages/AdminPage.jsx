import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const navigate = useNavigate();

  // Get token from localStorage
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  // Fetch all orders
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
        setTimeout(() => {
          navigate("/auth");
        }, 2000);
      } else {
        setError("Failed to load orders. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingStatus(true);
      await axios.put(
        `http://localhost:1000/api/orders/${orderId}/status`,
        { status: newStatus },
        getAuthConfig()
      );
      
      // Refresh orders after update
      await fetchOrders();
      setError("");
    } catch (err) {
      console.error("Error updating order:", err);
      setError("Failed to update order status. Please try again.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "status-processing";
      case "preparing":
        return "status-preparing";
      case "served":
        return "status-served";
      case "paid":
        return "status-paid";
      default:
        return "";
    }
  };

  // Get status label
  const getStatusLabel = (status) => {
    switch (status) {
      case "processing":
        return "🕒 Processing";
      case "preparing":
        return "👨‍🍳 Preparing";
      case "served":
        return "✅ Served";
      case "paid":
        return "💰 Paid";
      default:
        return status;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  useEffect(() => {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== "admin") {
      navigate("/auth");
      return;
    }
    
    fetchOrders();
    
    // Refresh orders every 10 seconds
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  // Calculate total revenue
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
    <div className="admin-page">
      {/* Navbar */}
      <div className="navbar">
        <h1>Admin Dashboard - Order Management</h1>
        <div className="user-info">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
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

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Orders List */}
      <div className="orders-container">
        <h2>All Orders</h2>
        
        {orders.length === 0 ? (
          <div className="no-orders">No orders yet</div>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>Order #{order._id.slice(-6)}</h3>
                    <p className="table-number">Table {order.tableNumber}</p>
                  </div>
                  <div className={`status-badge ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </div>
                </div>

                <div className="order-details">
                  <p className="order-time">
                    🕐 {formatDate(order.createdAt)}
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
                    <strong>Total Amount:</strong>
                    <strong className="total-amount">${order.totalAmount.toFixed(2)}</strong>
                  </div>
                </div>

                <div className="order-actions">
                  {order.status === "processing" && (
                    <button
                      onClick={() => updateOrderStatus(order._id, "preparing")}
                      disabled={updatingStatus}
                      className="btn-preparing"
                    >
                      Start Preparing
                    </button>
                  )}
                  
                  {order.status === "preparing" && (
                    <button
                      onClick={() => updateOrderStatus(order._id, "served")}
                      disabled={updatingStatus}
                      className="btn-served"
                    >
                      Mark as Served
                    </button>
                  )}
                  
                  {order.status === "served" && (
                    <button
                      onClick={() => updateOrderStatus(order._id, "paid")}
                      disabled={updatingStatus}
                      className="btn-paid"
                    >
                      Mark as Paid
                    </button>
                  )}
                  
                  {order.status === "paid" && (
                    <button disabled className="btn-completed">
                      ✓ Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .admin-page {
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

        .logout-btn {
          background: rgba(255,255,255,0.2);
          color: white;
          border: 1px solid white;
          padding: 8px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s;
        }

        .logout-btn:hover {
          background: white;
          color: #667eea;
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          padding: 30px 40px;
        }

        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          text-align: center;
        }

        .stat-card h3 {
          margin: 0 0 10px 0;
          color: #666;
          font-size: 16px;
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
          padding: 10px;
          margin: 20px 40px;
          border-radius: 5px;
          text-align: center;
        }

        .orders-container {
          padding: 20px 40px;
        }

        .orders-container h2 {
          margin-bottom: 20px;
          color: #333;
        }

        .no-orders {
          text-align: center;
          padding: 60px;
          background: white;
          border-radius: 10px;
          color: #999;
        }

        .orders-grid {
          display: grid;
          gap: 20px;
        }

        .order-card {
          background: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }

        .order-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }

        .order-header h3 {
          margin: 0 0 5px 0;
          color: #333;
        }

        .table-number {
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

        .status-processing {
          background: #fff3e0;
          color: #ff9800;
        }

        .status-preparing {
          background: #e3f2fd;
          color: #2196f3;
        }

        .status-served {
          background: #e8f5e9;
          color: #4caf50;
        }

        .status-paid {
          background: #f3e5f5;
          color: #9c27b0;
        }

        .order-details {
          margin-bottom: 15px;
        }

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

        .total-amount {
          color: #667eea;
          font-size: 18px;
        }

        .order-actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .order-actions button {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s;
        }

        .btn-preparing {
          background: #2196f3;
          color: white;
        }

        .btn-preparing:hover:not(:disabled) {
          background: #1976d2;
        }

        .btn-served {
          background: #4caf50;
          color: white;
        }

        .btn-served:hover:not(:disabled) {
          background: #45a049;
        }

        .btn-paid {
          background: #9c27b0;
          color: white;
        }

        .btn-paid:hover:not(:disabled) {
          background: #7b1fa2;
        }

        .btn-completed {
          background: #ccc;
          color: #666;
          cursor: not-allowed;
        }

        .order-actions button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
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
          .navbar h1 {
            font-size: 18px;
          }
          
          .stats-container {
            padding: 20px;
          }
          
          .orders-container {
            padding: 20px;
          }
          
          .order-header {
            flex-direction: column;
          }
          
          .status-badge {
            margin-top: 10px;
            align-self: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

export default AdminPage;