import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import AddMenu from "./admin/AddMenu";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./admin/Dashboard";  // Import Dashboard from admin folder

function App() {
  // Check if user is authenticated
  const isAuthenticated = !!localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Protected Admin Routes - only accessible by admin */}
        <Route 
          path="/admin" 
          element={
            isAuthenticated && user.role === "admin" ? 
            <AdminPage /> : 
            <AuthPage />
          } 
        />
        
        <Route 
          path="/admin/add-menu" 
          element={
            isAuthenticated && user.role === "admin" ? 
            <AddMenu /> : 
            <AuthPage />
          } 
        />
        
        {/* Dashboard Route - accessible by both admin and users */}
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? 
            <Dashboard /> : 
            <AuthPage />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;