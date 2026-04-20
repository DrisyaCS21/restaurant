import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
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
      setSelectedOrder(null);
    } catch (err) {
      console.error("Error updating order:", err);
      setError("Failed to update order status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "processing": return "#ff9800";
      case "preparing": return "#2196f3";
      case "served": return "#4caf50";
      case "paid": return "#9c27b0";
      default: return "#999";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing": return "🕒";
      case "preparing": return "👨‍🍳";
      case "served": return "✅";
      case "paid": return "💰";
      default: return "📦";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "processing": return "Processing";
      case "preparing": return "Preparing";
      case "served": return "Served";
      case "paid": return "Paid";
      default: return status;
    }
  };

  // Filter orders based on status and search
  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.tableNumber.toString().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: orders.length,
    processing: orders.filter(o => o.status === "processing").length,
    preparing: orders.filter(o => o.status === "preparing").length,
    served: orders.filter(o => o.status === "served").length,
    paid: orders.filter(o => o.status === "paid").length,
    revenue: orders.filter(o => o.status === "paid").reduce((sum, o) => sum + o.totalAmount, 0)
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== "admin") {
      navigate("/auth");
      return;
    }
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && orders.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      
      <div className="main-content">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1>Order Management</h1>
            <p>Track and manage all customer orders</p>
          </div>
          <button className="refresh-btn" onClick={fetchOrders}>
            🔄 Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <h3>Total Orders</h3>
              <p className="stat-value">{stats.total}</p>
            </div>
          </div>
          <div className="stat-card processing">
            <div className="stat-icon">🕒</div>
            <div className="stat-info">
              <h3>Processing</h3>
              <p className="stat-value">{stats.processing}</p>
            </div>
          </div>
          <div className="stat-card preparing">
            <div className="stat-icon">👨‍🍳</div>
            <div className="stat-info">
              <h3>Preparing</h3>
              <p className="stat-value">{stats.preparing}</p>
            </div>
          </div>
          <div className="stat-card revenue">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>Total Revenue</h3>
              <p className="stat-value">₹{stats.revenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="status-filters">
            <button
              className={`filter-btn ${selectedStatus === "all" ? "active" : ""}`}
              onClick={() => setSelectedStatus("all")}
            >
              All Orders
            </button>
            <button
              className={`filter-btn ${selectedStatus === "processing" ? "active" : ""}`}
              onClick={() => setSelectedStatus("processing")}
            >
              🕒 Processing
            </button>
            <button
              className={`filter-btn ${selectedStatus === "preparing" ? "active" : ""}`}
              onClick={() => setSelectedStatus("preparing")}
            >
              👨‍🍳 Preparing
            </button>
            <button
              className={`filter-btn ${selectedStatus === "served" ? "active" : ""}`}
              onClick={() => setSelectedStatus("served")}
            >
              ✅ Served
            </button>
            <button
              className={`filter-btn ${selectedStatus === "paid" ? "active" : ""}`}
              onClick={() => setSelectedStatus("paid")}
            >
              💰 Paid
            </button>
          </div>
          
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by order ID or table number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* Orders Table */}
        <div className="orders-table-container">
          {filteredOrders.length === 0 ? (
            <div className="no-orders">
              <div className="no-orders-icon">📭</div>
              <h3>No orders found</h3>
              <p>Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Table</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="order-row">
                    <td className="order-id">
                      #{order._id.slice(-8)}
                    </td>
                    <td className="table-number">
                      <span className="table-badge">Table {order.tableNumber}</span>
                    </td>
                    <td className="order-items-list">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="order-item-preview">
                          {item.name} x{item.quantity}
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="more-items">+{order.items.length - 2} more</div>
                      )}
                    </td>
                    <td className="order-total">
                      ₹{order.totalAmount.toFixed(2)}
                    </td>
                    <td className="order-time">
                      <div>{new Date(order.createdAt).toLocaleTimeString()}</div>
                      <small>{new Date(order.createdAt).toLocaleDateString()}</small>
                    </td>
                    <td>
                      <div 
                        className="status-badge"
                        style={{ background: getStatusColor(order.status) }}
                      >
                        {getStatusIcon(order.status)} {getStatusLabel(order.status)}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="view-btn"
                          onClick={() => setSelectedOrder(order)}
                        >
                          👁️ View
                        </button>
                        {order.status === "processing" && (
                          <button 
                            className="status-btn prepare"
                            onClick={() => updateOrderStatus(order._id, "preparing")}
                          >
                            Start Preparing
                          </button>
                        )}
                        {order.status === "preparing" && (
                          <button 
                            className="status-btn serve"
                            onClick={() => updateOrderStatus(order._id, "served")}
                          >
                            Mark Served
                          </button>
                        )}
                        {order.status === "served" && (
                          <button 
                            className="status-btn paid"
                            onClick={() => updateOrderStatus(order._id, "paid")}
                          >
                            Mark Paid
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Order Details</h2>
                <button className="close-modal" onClick={() => setSelectedOrder(null)}>✕</button>
              </div>
              
              <div className="modal-body">
                <div className="order-info-grid">
                  <div className="info-item">
                    <label>Order ID</label>
                    <p>#{selectedOrder._id}</p>
                  </div>
                  <div className="info-item">
                    <label>Table Number</label>
                    <p>Table {selectedOrder.tableNumber}</p>
                  </div>
                  <div className="info-item">
                    <label>Order Time</label>
                    <p>{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="info-item">
                    <label>Status</label>
                    <div 
                      className="status-badge"
                      style={{ background: getStatusColor(selectedOrder.status), display: 'inline-block' }}
                    >
                      {getStatusIcon(selectedOrder.status)} {getStatusLabel(selectedOrder.status)}
                    </div>
                  </div>
                </div>

                <div className="items-section">
                  <h3>Order Items</h3>
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.name}</td>
                          <td>x{item.quantity}</td>
                          <td>₹{item.price}</td>
                          <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="total-row">
                        <td colSpan="3"><strong>Total Amount</strong></td>
                        <td><strong>₹{selectedOrder.totalAmount.toFixed(2)}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="modal-actions">
                  {selectedOrder.status === "processing" && (
                    <button 
                      className="modal-action-btn prepare"
                      onClick={() => updateOrderStatus(selectedOrder._id, "preparing")}
                    >
                      Start Preparing
                    </button>
                  )}
                  {selectedOrder.status === "preparing" && (
                    <button 
                      className="modal-action-btn serve"
                      onClick={() => updateOrderStatus(selectedOrder._id, "served")}
                    >
                      Mark as Served
                    </button>
                  )}
                  {selectedOrder.status === "served" && (
                    <button 
                      className="modal-action-btn paid"
                      onClick={() => updateOrderStatus(selectedOrder._id, "paid")}
                    >
                      Mark as Paid
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: #f0f2f5;
        }

        .main-content {
          flex: 1;
          margin-left: 260px;
          padding: 30px;
          transition: margin-left 0.3s ease;
        }

        .admin-sidebar.collapsed ~ .main-content {
          margin-left: 70px;
        }

        /* Page Header */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .page-header h1 {
          margin: 0 0 5px 0;
          font-size: 28px;
          color: #1a1a2e;
        }

        .page-header p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }

        .refresh-btn {
          background: white;
          border: 1px solid #ddd;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .refresh-btn:hover {
          background: #f5f5f5;
          transform: translateY(-1px);
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .stat-icon {
          font-size: 36px;
        }

        .stat-info {
          flex: 1;
        }

        .stat-info h3 {
          margin: 0 0 5px 0;
          font-size: 14px;
          color: #666;
        }

        .stat-value {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
          color: #1a1a2e;
        }

        .stat-card.total .stat-value { color: #667eea; }
        .stat-card.processing .stat-value { color: #ff9800; }
        .stat-card.preparing .stat-value { color: #2196f3; }
        .stat-card.revenue .stat-value { color: #4caf50; }

        /* Filters Section */
        .filters-section {
          background: white;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .status-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }

        .filter-btn {
          padding: 8px 16px;
          background: #f5f5f5;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
        }

        .filter-btn:hover {
          background: #e0e0e0;
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .search-box {
          width: 100%;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.2s;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102,126,234,0.1);
        }

        /* Orders Table */
        .orders-table-container {
          background: white;
          border-radius: 12px;
          overflow-x: auto;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .orders-table {
          width: 100%;
          border-collapse: collapse;
        }

        .orders-table thead {
          background: #f8f9fa;
          border-bottom: 2px solid #e0e0e0;
        }

        .orders-table th {
          padding: 16px;
          text-align: left;
          font-size: 14px;
          font-weight: 600;
          color: #555;
        }

        .orders-table td {
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
        }

        .order-row:hover {
          background: #fafafa;
        }

        .order-id {
          font-weight: 600;
          color: #667eea;
        }

        .table-badge {
          background: #f0f0f0;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 13px;
        }

        .order-items-list {
          font-size: 13px;
        }

        .order-item-preview {
          margin: 2px 0;
        }

        .more-items {
          color: #999;
          font-size: 12px;
          margin-top: 4px;
        }

        .order-total {
          font-weight: 600;
          color: #1a1a2e;
        }

        .order-time small {
          color: #999;
          font-size: 11px;
        }

        .status-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          color: white;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .view-btn {
          padding: 6px 12px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
        }

        .status-btn {
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
        }

        .status-btn.prepare {
          background: #ff9800;
          color: white;
        }

        .status-btn.serve {
          background: #4caf50;
          color: white;
        }

        .status-btn.paid {
          background: #9c27b0;
          color: white;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e0e0e0;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 20px;
        }

        .close-modal {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #999;
        }

        .modal-body {
          padding: 24px;
        }

        .order-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .info-item label {
          font-size: 12px;
          color: #999;
          display: block;
          margin-bottom: 4px;
        }

        .info-item p {
          margin: 0;
          font-weight: 500;
        }

        .items-section h3 {
          margin: 0 0 16px 0;
          font-size: 18px;
        }

        .items-table {
          width: 100%;
          border-collapse: collapse;
        }

        .items-table th {
          text-align: left;
          padding: 8px;
          background: #f8f9fa;
          font-size: 13px;
        }

        .items-table td {
          padding: 8px;
          border-bottom: 1px solid #f0f0f0;
        }

        .total-row {
          background: #f8f9fa;
          font-weight: bold;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #e0e0e0;
        }

        .modal-action-btn {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
        }

        .modal-action-btn.prepare {
          background: #ff9800;
          color: white;
        }

        .modal-action-btn.serve {
          background: #4caf50;
          color: white;
        }

        .modal-action-btn.paid {
          background: #9c27b0;
          color: white;
        }

        .error-message {
          background: #f8d7da;
          color: #721c24;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .no-orders {
          text-align: center;
          padding: 60px;
        }

        .no-orders-icon {
          font-size: 64px;
          margin-bottom: 16px;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 70px;
            padding: 15px;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .orders-table {
            font-size: 12px;
          }
          
          .orders-table th,
          .orders-table td {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default Orders;