import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import AdminPage from "./admin/AdminPage";
import HomePage from "./pages/HomePage";
import AddMenu from "./admin/AddMenu";
import AuthPage from "./pages/AuthPage";
import UserDashboard from "./pages/UserDashboard";  // Import Dashboard from admin folder
import Sidebar from "./admin/Sidebar";
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
        <Route path="/sidebar" element={<Sidebar />} />
        
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
            <UserDashboard /> : 
            <AuthPage />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;