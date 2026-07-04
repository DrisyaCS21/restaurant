import React from "react";
import { AppContext } from "../../context/AppContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:1000";

function AddProduct() {
  const { token } = React.useContext(AppContext);

  const [formData, setFormData] = React.useState({
    name: "",
    price: "",
    category: "",
    description: "",
    available: true
  });
  const [imageFile, setImageFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (error) setError("");
    if (message) setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const body = new FormData();
      body.append("name", formData.name);
      body.append("price", formData.price);
      body.append("category", formData.category);
      body.append("description", formData.description);
      body.append("available", String(formData.available));
      if (imageFile) body.append("image", imageFile);

      const res = await fetch(`${backendUrl}/api/menu`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token || ""}`
        },
        body
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Failed to add product");
        return;
      }

      setMessage("Product added successfully");
      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
        available: true
      });
      setImageFile(null);
    } catch {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-1">Add Product</h2>
      <p className="text-gray-500 text-sm mb-6">Add a new item to the menu.</p>

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}
      {message && (
        <div className="mb-5 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-200 p-6 max-w-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
              placeholder="e.g. Chicken Momo"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Price</label>
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
              placeholder="e.g. 120"
              inputMode="decimal"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
              placeholder="e.g. Snacks"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 min-h-[120px]"
              placeholder="Optional description"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 bg-white"
            />
          </div>

          <label className="md:col-span-2 flex items-center gap-3 mt-2 select-none">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm text-gray-700">Available</span>
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-400 text-white px-5 py-3 rounded-xl text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
