import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const API_URL = "https://restaurant-s0qk.onrender.com/api/auth";
      let response;
      
      if (isLogin) {
        response = await axios.post(`${API_URL}/login`, {
          email: formData.email,
          password: formData.password
        });
      } else {
        response = await axios.post(`${API_URL}/signup`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        });
      }
      
      // Store user data and token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify({
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role
      }));
      
      setMessage(`${isLogin ? "Login" : "Account created"} successful! Redirecting...`);
      
      // Redirect based on role
      setTimeout(() => {
        if (response.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 1000);
      
    } catch (error) {
      console.error("Auth error:", error);
      if (error.response) {
        setMessage(error.response.data.message || "Authentication failed");
      } else if (error.request) {
        setMessage("Cannot connect to server. Make sure backend is running.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMessage("");
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user"
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        
        {message && (
          <div className={`message ${message.includes("successful") ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />

          {!isLogin && (
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">Customer</option>
              <option value="admin">Admin</option>
            </select>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : (isLogin ? "Login" : "Sign Up")}
          </button>
        </form>

        <p onClick={toggleMode} className="toggle-link">
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </p>
      </div>

      <style>{`
        .auth-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: 0;
          padding: 20px;
        }

        .auth-container {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        input, select {
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
        }

        button {
          padding: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:disabled {
          opacity: 0.7;
        }

        .toggle-link {
          text-align: center;
          margin-top: 20px;
          color: #667eea;
          cursor: pointer;
        }

        .message {
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 20px;
          text-align: center;
        }

        .message.success {
          background-color: #d4edda;
          color: #155724;
        }

        .message.error {
          background-color: #f8d7da;
          color: #721c24;
        }
      `}</style>
    </div>
  );
}

export default AuthPage;