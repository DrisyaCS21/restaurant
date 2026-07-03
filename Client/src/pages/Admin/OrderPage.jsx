import React from "react";
import { AppContext } from "../../context/AppContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:1000";

function OrderPage() {
  const { token } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [updatingId, setUpdatingId] = React.useState(null);
  const [deletingId, setDeletingId] = React.useState(null);

  const fetchOrders = React.useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${backendUrl}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => []);
      if (res.ok) {
        setOrders(data);
      } else {
        setError(data.message || "Failed to load orders");
      }
    } catch {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  React.useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`${backendUrl}/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json().catch(() => {});
      if (res.ok) {
        setOrders((prev) => prev.map((order) => 
          order._id === orderId ? data : order
        ));
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Delete this order? This cannot be undone.")) return;
    
    setDeletingId(orderId);
    try {
      const res = await fetch(`${backendUrl}/api/orders/${orderId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.ok) {
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
      }
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "processing": return "bg-yellow-100 text-yellow-800";
      case "preparing": return "bg-blue-100 text-blue-800";
      case "served": return "bg-green-100 text-green-800";
      case "paid": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Order History</h2>
          <p className="text-gray-500 text-sm">View and manage all customer orders.</p>
        </div>
        <button
          type="button"
          onClick={fetchOrders}
          className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm hover:bg-gray-50"
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-400">
          Loading orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-400">
          No orders yet
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Table {order.tableNumber}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                  {order.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">
                      {item.quantity}x {item.name || "Item"}
                    </span>
                    <span className="font-semibold text-gray-900">
                      Rs {item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Total</span>
                  <span className="text-lg font-bold text-gray-900">
                    Rs {order.totalAmount}
                  </span>
                </div>
                {order.paymentMethod && (
                  <p className="text-xs text-gray-500 mt-1">
                    Payment: {order.paymentMethod}
                  </p>
                )}
                {order.specialInstructions && (
                  <p className="text-xs text-gray-600 mt-2 p-2 bg-gray-50 rounded-lg">
                    Note: {order.specialInstructions}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {order.status === "processing" && (
                  <button
                    onClick={() => updateStatus(order._id, "preparing")}
                    disabled={updatingId === order._id}
                    className="flex-1 bg-blue-500 hover:bg-blue-400 text-white text-sm px-3 py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {updatingId === order._id ? "Updating..." : "Start Preparing"}
                  </button>
                )}
                {order.status === "preparing" && (
                  <button
                    onClick={() => updateStatus(order._id, "served")}
                    disabled={updatingId === order._id}
                    className="flex-1 bg-green-500 hover:bg-green-400 text-white text-sm px-3 py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {updatingId === order._id ? "Updating..." : "Mark as Served"}
                  </button>
                )}
                {order.status === "served" && (
                  <button
                    onClick={() => updateStatus(order._id, "paid")}
                    disabled={updatingId === order._id}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-sm px-3 py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {updatingId === order._id ? "Updating..." : "Mark as Paid"}
                  </button>
                )}
                {(order.status === "processing" || order.status === "preparing") && (
                  <button
                    onClick={() => updateStatus(order._id, "paid")}
                    disabled={updatingId === order._id}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm px-3 py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Skip & Mark Paid
                  </button>
                )}
                <button
                  onClick={() => deleteOrder(order._id)}
                  disabled={deletingId === order._id}
                  className="bg-red-500 hover:bg-red-400 text-white text-sm px-3 py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {deletingId === order._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderPage;