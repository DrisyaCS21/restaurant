import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

function Users() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1000/api/orders",
        getAuthConfig()
      );
      console.log("Orders with user data:", response.data); // Debug: Check the data
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== "admin") {
      navigate("/auth");
      return;
    }
    fetchOrders();
    
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  // Function to get customer display info
  const getCustomerDisplay = (order) => {
    // If order has user reference and it's populated
    if (order.user && order.user._id) {
      return {
        name: order.user.name,
        email: order.user.email,
        type: "registered",
        icon: "ðŸ‘¤",
        badge: "Registered User"
      };
    } 
    // If order has customerName from the order itself
    else if (order.customerName && order.customerName !== "Guest") {
      return {
        name: order.customerName,
        email: order.customerEmail || "No email",
        type: "guest",
        icon: "ðŸ‘‹",
        badge: "Guest User"
      };
    } 
    // Anonymous guest
    else {
      return {
        name: "Anonymous Guest",
        email: "No email",
        type: "anonymous",
        icon: "â“",
        badge: "Anonymous"
      };
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  // Calculate stats
  const registeredOrders = orders.filter(o => o.user && o.user._id);
  const guestOrders = orders.filter(o => o.customerName && o.customerName !== "Guest" && !o.user);
  const anonymousOrders = orders.filter(o => (!o.user || !o.user._id) && (!o.customerName || o.customerName === "Guest"));

  return (
    <div className="admin-layout">
      <Sidebar />
      
      <div className="main-content">
        <div className="page-header">
          <div>
            <h1>Customer Orders</h1>
            <p>Track orders from registered and guest customers</p>
          </div>
          <div className="stats-summary">
            <div className="stat-badge" style={{background: "#e3f2fd"}}>
              <span>ðŸ‘¤ Registered Users</span>
              <strong>{registeredOrders.length}</strong>
            </div>
            <div className="stat-badge" style={{background: "#fff3e0"}}>
              <span>ðŸ‘‹ Guest Orders</span>
              <strong>{guestOrders.length}</strong>
            </div>
            <div className="stat-badge" style={{background: "#f5f5f5"}}>
              <span>â“ Anonymous</span>
              <strong>{anonymousOrders.length}</strong>
            </div>
            <div className="stat-badge" style={{background: "#e8f5e9"}}>
              <span>ðŸ“¦ Total Orders</span>
              <strong>{orders.length}</strong>
            </div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* Search */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search by customer name, email, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Orders Table */}
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Info</th>
                <th>Type</th>
                <th>Table</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter(order => {
                  const customer = getCustomerDisplay(order);
                  return customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order._id.toLowerCase().includes(searchTerm.toLowerCase());
                })
                .map((order) => {
                  const customer = getCustomerDisplay(order);
                  
                  return (
                    <tr key={order._id} className="order-row">
                      <td className="order-id">#{order._id.slice(-8)}</td>
                      <td className="customer-info">
                        <div className="customer-name">
                          {customer.icon} {customer.name}
                        </div>
                        <div className="customer-email">{customer.email}</div>
                      </td>
                      <td>
                        <span className={`customer-type ${customer.type}`}>
                          {customer.badge}
                        </span>
                      </td>
                      <td>Table {order.tableNumber}</td>
                      <td>{order.items.length} items</td>
                      <td className="order-amount">â‚¹{order.totalAmount}</td>
                      <td>
                        <span className={`status-badge ${order.status}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleTimeString()}</td>
                      <td>
                        <button 
                          className="view-btn"
                          onClick={() => setSelectedOrder(order)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Order Details</h2>
                <button className="close-modal" onClick={() => setSelectedOrder(null)}>âœ•</button>
              </div>
              
              <div className="modal-body">
                <div className="order-info-grid">
                  <div className="info-item">
                    <label>Order ID</label>
                    <p>#{selectedOrder._id}</p>
                  </div>
                  <div className="info-item">
                    <label>Customer Name</label>
                    <p>{getCustomerDisplay(selectedOrder).name}</p>
                  </div>
                  <div className="info-item">
                    <label>Email</label>
                    <p>{getCustomerDisplay(selectedOrder).email}</p>
                  </div>
                  <div className="info-item">
                    <label>Customer Type</label>
                    <p>{getCustomerDisplay(selectedOrder).badge}</p>
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
                    <span className={`status-badge ${selectedOrder.status}`}>
                      {selectedOrder.status}
                    </span>
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
                          <td>â‚¹{item.price}</td>
                          <td>â‚¹{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="total-row">
                        <td colSpan="3"><strong>Total Amount</strong></td>
                        <td><strong>â‚¹{selectedOrder.totalAmount.toFixed(2)}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
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
        }

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

        .stats-summary {
          display: flex;
          gap: 15px;
        }

        .stat-badge {
          padding: 10px 20px;
          border-radius: 8px;
          text-align: center;
        }

        .stat-badge span {
          display: block;
          font-size: 12px;
          color: #666;
        }

        .stat-badge strong {
          font-size: 20px;
          color: #333;
        }

        .search-section {
          margin-bottom: 20px;
        }

        .search-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .orders-table-container {
          background: white;
          border-radius: 12px;
          overflow-x: auto;
        }

        .orders-table {
          width: 100%;
          border-collapse: collapse;
        }

        .orders-table th {
          padding: 16px;
          text-align: left;
          background: #f8f9fa;
          font-weight: 600;
        }

        .orders-table td {
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
        }

        .customer-type {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
        }

        .customer-type.registered {
          background: #e3f2fd;
          color: #2196f3;
        }

        .customer-type.guest {
          background: #fff3e0;
          color: #ff9800;
        }

        .customer-type.anonymous {
          background: #f5f5f5;
          color: #999;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .status-badge.processing { background: #fff3e0; color: #ff9800; }
        .status-badge.preparing { background: #e3f2fd; color: #2196f3; }
        .status-badge.served { background: #e8f5e9; color: #4caf50; }
        .status-badge.paid { background: #f3e5f5; color: #9c27b0; }

        .view-btn {
          padding: 6px 12px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

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
          max-width: 700px;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e0e0e0;
        }

        .close-modal {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }

        .modal-body {
          padding: 20px;
        }

        .order-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .items-table {
          width: 100%;
          border-collapse: collapse;
        }

        .items-table th {
          padding: 8px;
          text-align: left;
          background: #f8f9fa;
        }

        .items-table td {
          padding: 8px;
          border-bottom: 1px solid #f0f0f0;
        }

        .total-row {
          background: #f8f9fa;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 70px;
            padding: 15px;
          }
          
          .page-header {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

export default Users;