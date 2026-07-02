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

  const formStyle = {
    padding: 28
  };

  const fieldStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    outline: "none"
  };

  const fieldWrapperStyle = {
    marginBottom: 12
  };

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
      const API_URL = "http://localhost:1000/api/auth";
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
    <div className="min-h-screen flex items-center justify-center bg-white p-5">
      <form
        className="w-full max-w-[360px] rounded-lg border border-gray-200 bg-white text-left text-sm text-gray-600 shadow-md"
        style={formStyle}
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {message && (
          <div
            className={`mb-4 rounded p-2 text-center ${
              message.includes("successful")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {!isLogin && (
          <div style={fieldWrapperStyle}>
            <label htmlFor="name" className="sr-only">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              style={fieldStyle}
              type="text"
              placeholder="Username"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>
        )}

        <div style={fieldWrapperStyle}>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            style={fieldStyle}
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div style={{ ...fieldWrapperStyle, marginBottom: 18 }}>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            style={fieldStyle}
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
        </div>

        {!isLogin && (
          <div style={{ ...fieldWrapperStyle, marginBottom: 18 }}>
            <label htmlFor="role" className="sr-only">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={fieldStyle}
            >
              <option value="user">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        <button
          className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium disabled:opacity-70 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading ? "Processing..." : isLogin ? "Log In" : "Create Account"}
        </button>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={toggleMode}
            className="text-blue-500 underline px-4 py-5 m-5"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default AuthPage;
