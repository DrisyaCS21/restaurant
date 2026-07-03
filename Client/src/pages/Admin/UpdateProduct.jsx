import React from "react";
import { AppContext } from "../../context/AppContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:1000";

function UpdateProduct() {
  const { token } = React.useContext(AppContext);

  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [selectedId, setSelectedId] = React.useState(null);
  const [saving, setSaving] = React.useState(false);
  const [togglingId, setTogglingId] = React.useState(null);
  const [deletingId, setDeletingId] = React.useState(null);
  const [draft, setDraft] = React.useState({
    name: "",
    price: "",
    category: "",
    description: "",
    available: true
  });

  const fetchProducts = React.useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${backendUrl}/api/menu/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ([]));
      if (!res.ok) {
        setError(data.message || "Failed to load products");
        return;
      }
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const startEdit = (product) => {
    setSelectedId(product._id);
    setDraft({
      name: product.name || "",
      price: product.price ?? "",
      category: product.category || "",
      description: product.description || "",
      available: product.available !== false
    });
  };

  const cancelEdit = () => {
    setSelectedId(null);
    setDraft({
      name: "",
      price: "",
      category: "",
      description: "",
      available: true
    });
    setError("");
  };

  const handleDraftChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDraft((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  const save = async () => {
    if (!selectedId) return;

    setSaving(true);
    setError("");
    try {
      const res = await fetch(`${backendUrl}/api/menu/${selectedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify({
          name: draft.name,
          price: draft.price,
          category: draft.category,
          description: draft.description,
          available: draft.available,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Failed to update product");
        return;
      }

      setProducts((prev) => prev.map((p) => (p._id === selectedId ? data : p)));
      setSelectedId(null);
    } catch {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const setAvailability = async (productId, available) => {
    setTogglingId(productId);
    setError("");
    try {
      const res = await fetch(`${backendUrl}/api/menu/${productId}/availability`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify({ available }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Failed to update availability");
        return;
      }

      setProducts((prev) => prev.map((p) => (p._id === productId ? data : p)));
      if (selectedId === productId) {
        setDraft((prev) => ({ ...prev, available: data.available !== false }));
      }
    } catch {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setTogglingId(null);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;

    setDeletingId(productId);
    setError("");
    try {
      const res = await fetch(`${backendUrl}/api/menu/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Failed to delete product");
        return;
      }

      setProducts((prev) => prev.filter((p) => p._id !== productId));
      if (selectedId === productId) cancelEdit();
    } catch {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const selectedProduct = selectedId
    ? products.find((p) => p._id === selectedId)
    : null;

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Update Product</h2>
          <p className="text-gray-500 text-sm">Edit existing menu items.</p>
        </div>
        <button
          type="button"
          onClick={fetchProducts}
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

      {selectedProduct && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 max-w-2xl">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                Updating: {selectedProduct.name}
              </p>
              <p className="text-xs text-gray-400 truncate">{selectedProduct._id}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm hover:bg-gray-50"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Update"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                name="name"
                value={draft.name}
                onChange={handleDraftChange}
                className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Price</label>
              <input
                name="price"
                value={draft.price}
                onChange={handleDraftChange}
                className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
                inputMode="decimal"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Category</label>
              <input
                name="category"
                value={draft.category}
                onChange={handleDraftChange}
                className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={draft.description}
                onChange={handleDraftChange}
                className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 min-h-[110px]"
              />
            </div>

            <label className="md:col-span-2 flex items-center gap-3 mt-1 select-none">
              <input
                type="checkbox"
                name="available"
                checked={!!draft.available}
                onChange={handleDraftChange}
                className="h-4 w-4"
              />
              <span className="text-sm text-gray-700">Available</span>
            </label>
          </div>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-400">
          Loading products...
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-400">
          No products found
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {products.map((product) => (
              <div key={product._id} className="p-5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">
                    {product.category} • {product.available === false ? "Unavailable" : "Available"} • {product.price}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  {product.available === false ? (
                    <button
                      type="button"
                      onClick={() => setAvailability(product._id, true)}
                      disabled={togglingId === product._id || deletingId === product._id}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {togglingId === product._id ? "Working..." : "Activate"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setAvailability(product._id, false)}
                      disabled={togglingId === product._id || deletingId === product._id}
                      className="bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded-xl text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {togglingId === product._id ? "Working..." : "Deactivate"}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => startEdit(product)}
                    disabled={deletingId === product._id}
                    className="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded-xl text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteProduct(product._id)}
                    disabled={deletingId === product._id || togglingId === product._id}
                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {deletingId === product._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateProduct;
