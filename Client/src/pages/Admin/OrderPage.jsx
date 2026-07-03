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
      case "processing": return "bg-amber-100 text-amber-700";
      case "preparing":  return "bg-blue-100 text-blue-700";
      case "served":     return "bg-green-100 text-green-700";
      case "paid":       return "bg-gray-200 text-gray-600";
      default:           return "bg-gray-100 text-gray-600";
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
          {orders.map((order) => {
            const isOnlineOrder = order.tableNumber === 'Online Order';
            const isQROrder = order.tableNumber && order.tableNumber !== 'Online Order';
            
            return (
              <div key={order._id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Header Section */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      {order.user ? (
                        <>
                          <div className="flex items-center gap-2 mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                              <circle cx="12" cy="7" r="4"/>
                            </svg>
                            <h3 className="text-base font-semibold text-white">
                              {order.user.name}
                            </h3>
                          </div>
                          {isQROrder && (
                            <p className="text-xs text-orange-100">
                              Table {order.tableNumber}
                            </p>
                          )}
                        </>
                      ) : isQROrder ? (
                        <>
                          <div className="flex items-center gap-2 mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18M3 12h18M3 18h18"/>
                            </svg>
                            <h3 className="text-base font-semibold text-white">
                              Table {order.tableNumber}
                            </h3>
                          </div>
                          <p className="text-xs text-orange-100">Walk-in Guest</p>
                        </>
                      ) : (
                        <h3 className="text-base font-semibold text-white">Guest Order</h3>
                      )}
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-orange-100">
                    {new Date(order.createdAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                {/* Items Section */}
                <div className="p-4">
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center">
                            {item.quantity}
                          </span>
                          {item.name || "Item"}
                        </span>
                        <span className="font-semibold text-gray-900">
                          Rs {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total Section */}
                  <div className="border-t border-gray-200 pt-3 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Total Amount</span>
                      <span className="text-xl font-bold text-orange-600">
                        Rs {order.totalAmount.toLocaleString()}
                      </span>
                    </div>
                    {order.paymentMethod && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="14" x="2" y="5" rx="2"/>
                          <line x1="2" x2="22" y1="10" y2="10"/>
                        </svg>
                        <span className="capitalize">{order.paymentMethod}</span>
                      </div>
                    )}
                    {order.specialInstructions && (
                      <div className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-xs text-amber-800 font-medium flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 16v-4"/>
                            <path d="M12 8h.01"/>
                          </svg>
                          <span>{order.specialInstructions}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {order.status === "processing" && (
                      <>
                        <button
                          onClick={() => updateStatus(order._id, "preparing")}
                          disabled={updatingId === order._id}
                          className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
                            <line x1="6" x2="18" y1="17" y2="17"/>
                          </svg>
                          {updatingId === order._id ? "Processing..." : "Start Preparing"}
                        </button>
                        <button
                          onClick={() => updateStatus(order._id, "paid")}
                          disabled={updatingId === order._id}
                          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-4 py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          Skip & Mark as Paid
                        </button>
                      </>
                    )}
                    {order.status === "preparing" && (
                      <>
                        <button
                          onClick={() => updateStatus(order._id, "served")}
                          disabled={updatingId === order._id}
                          className="w-full bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5"/>
                          </svg>
                          {updatingId === order._id ? "Processing..." : "Mark as Served"}
                        </button>
                        <button
                          onClick={() => updateStatus(order._id, "paid")}
                          disabled={updatingId === order._id}
                          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-4 py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          Skip & Mark as Paid
                        </button>
                      </>
                    )}
                    {order.status === "served" && (
                      <button
                        onClick={() => updateStatus(order._id, "paid")}
                        disabled={updatingId === order._id}
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="14" x="2" y="5" rx="2"/>
                          <line x1="2" x2="22" y1="10" y2="10"/>
                        </svg>
                        {updatingId === order._id ? "Processing..." : "Mark as Paid"}
                      </button>
                    )}
                    {order.status === "paid" && (
                      <div className="w-full bg-gray-50 text-gray-500 text-sm font-medium px-4 py-2.5 rounded-lg text-center">
                        Order Completed
                      </div>
                    )}
                    <button
                      onClick={() => deleteOrder(order._id)}
                      disabled={deletingId === order._id}
                      className="w-full bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium px-4 py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"/>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                      </svg>
                      {deletingId === order._id ? "Deleting..." : "Delete Order"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OrderPage;