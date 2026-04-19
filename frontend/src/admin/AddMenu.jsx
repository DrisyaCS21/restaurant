import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

function AddMenu() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    available: true
  });
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    "Appetizers",
    "Main Course",
    "Chinese",
    "Italian",
    "Indian",
    "Snacks",
    "Beverages",
    "Desserts",
    "Fast Food",
    "Seafood",
    "Healthy",
    "Breakfast"
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid image (JPEG, PNG, or WEBP)");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError("");
    }
  };

  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (!formData.name.trim()) {
      setError("Please enter menu item name");
      setLoading(false);
      return;
    }
    
    if (!formData.price || formData.price <= 0) {
      setError("Please enter a valid price");
      setLoading(false);
      return;
    }
    
    if (!formData.category) {
      setError("Please select a category");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("available", formData.available);
      
      if (selectedImage) {
        formDataToSend.append("image", selectedImage);
      }

      const response = await axios.post(
        "http://localhost:1000/api/menu",
        formDataToSend,
        getAuthConfig()
      );

      setSuccess("Menu item added successfully!");
      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
        available: true
      });
      setSelectedImage(null);
      setImagePreview(null);
      
      // Reset file input
      const fileInput = document.getElementById("image-input");
      if (fileInput) fileInput.value = "";
      
      setTimeout(() => {
        setSuccess("");
        // Optional: Navigate to menu list after 2 seconds
        // navigate("/admin/menu");
      }, 3000);
      
    } catch (err) {
      console.error("Error adding menu:", err);
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        setTimeout(() => navigate("/auth"), 2000);
      } else if (err.response?.status === 403) {
        setError("You don't have permission to add menu items");
      } else {
        setError(err.response?.data?.message || "Failed to add menu item. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
      available: true
    });
    setSelectedImage(null);
    setImagePreview(null);
    setError("");
    setSuccess("");
    const fileInput = document.getElementById("image-input");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      
      <div className="main-content">
        <div className="top-bar">
          <h1>Add New Menu Item</h1>
          <button onClick={() => navigate("/admin")} className="back-btn">
            ← Back to Dashboard
          </button>
        </div>

        <div className="form-container">
          {success && (
            <div className="alert success">
              ✅ {success}
            </div>
          )}
          
          {error && (
            <div className="alert error">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="menu-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Item Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Margherita Pizza"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price (₹) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 299"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the dish (ingredients, serving size, etc.)"
                  rows="4"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="image">Item Image</label>
                <div className="image-upload-area">
                  <input
                    type="file"
                    id="image-input"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                  <div className="upload-preview">
                    {imagePreview ? (
                      <div className="preview-container">
                        <img src={imagePreview} alt="Preview" className="preview-image" />
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedImage(null);
                            setImagePreview(null);
                            document.getElementById("image-input").value = "";
                          }}
                          className="remove-image"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="upload-placeholder">
                        <span className="upload-icon">📸</span>
                        <p>Click or drag image here</p>
                        <small>JPEG, PNG, WEBP (max 5MB)</small>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-group full-width">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleInputChange}
                  />
                  <span>Item Available (visible to customers)</span>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? "Adding..." : "➕ Add Menu Item"}
              </button>
              <button type="button" onClick={resetForm} className="reset-btn">
                Reset Form
              </button>
            </div>
          </form>
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

        .back-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 8px 20px;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .back-btn:hover {
          background: #5a67d8;
        }

        .form-container {
          background: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .alert {
          padding: 12px 20px;
          border-radius: 5px;
          margin-bottom: 20px;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .alert.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .alert.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .menu-form {
          max-width: 100%;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: span 2;
        }

        .form-group label {
          margin-bottom: 8px;
          font-weight: 500;
          color: #333;
          font-size: 14px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
          transition: all 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .image-upload-area {
          border: 2px dashed #ddd;
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          transition: all 0.3s;
        }

        .image-upload-area:hover {
          border-color: #667eea;
          background: #f9f9ff;
        }

        .file-input {
          display: none;
        }

        .upload-preview {
          min-height: 200px;
        }

        .upload-placeholder {
          cursor: pointer;
          padding: 40px;
          text-align: center;
        }

        .upload-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 10px;
        }

        .upload-placeholder p {
          margin: 10px 0;
          color: #666;
        }

        .upload-placeholder small {
          color: #999;
        }

        .preview-container {
          position: relative;
          display: inline-block;
        }

        .preview-image {
          max-width: 100%;
          max-height: 250px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .remove-image {
          position: absolute;
          top: -10px;
          right: -10px;
          background: #dc3545;
          color: white;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: transform 0.2s;
        }

        .remove-image:hover {
          transform: scale(1.1);
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .checkbox-label input {
          width: auto;
          cursor: pointer;
        }

        .checkbox-label span {
          margin: 0;
          cursor: pointer;
        }

        .form-actions {
          display: flex;
          gap: 15px;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }

        .submit-btn {
          flex: 1;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .reset-btn {
          background: #6c757d;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .reset-btn:hover {
          background: #5a6268;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 70px;
            padding: 10px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-group.full-width {
            grid-column: span 1;
          }

          .top-bar {
            flex-direction: column;
            gap: 10px;
          }

          .top-bar h1 {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default AddMenu;