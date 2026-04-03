import { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:1000/api/orders");
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // auto-refresh
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (orderId, status) => {
  try {
    await axios.put(`http://localhost:1000/api/orders/${orderId}/status`, { status });
    fetchOrders(); // refresh after update
  } catch (err) {
    console.error("Error updating status:", err);
    alert("Failed to update status");
  }
};

  if (loading) return <p>Loading orders...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel - Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map(order => (
          <div key={order._id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
            <h3>Table: {order.tableNumber}</h3>
            <ul>
              {order.items.map(item => (
                <li key={item.name}>
                  {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                </li>
              ))}
            </ul>
            <p>
              <strong>Total: ₹{order.items.reduce((acc, i) => acc + i.price * i.quantity, 0)}</strong>
            </p>
            
            <p>
              Status:{" "}
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
              >
                <option value="processing">Processing ⏳</option>
                <option value="preparing">Preparing 🍳</option>
                <option value="served">Served 🍽️</option>
                <option value="paid">Paid 💵</option>
              </select>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;