import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import AdminPage from "./admin/AdminPage";
import HomePage from "./pages/HomePage";
import AddMenu from "./admin/AddMenu";
import AuthPage from "./pages/AuthPage";
import UserDashboard from "./pages/UserDashboard";
import MenuItemsPage from "./admin/MenuItemsPage";
import Orders from "./admin/Orders";
function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Protected Admin Routes */}
        <Route 
          path="/admin" 
          element={
            isAuthenticated && user.role === "admin" ? 
            <AdminPage /> : 
            <AuthPage />
          } 
        />
        
        <Route 
          path="/admin/menu" 
          element={
            isAuthenticated && user.role === "admin" ? 
            <MenuItemsPage /> : 
            <AuthPage />
          } 
        />

         <Route 
          path="/admin/orders" 
          element={
            isAuthenticated && user.role === "admin" ? 
            <Orders /> : 
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
        
        {/* Protected User Routes */}
        <Route 
          path="/dashboard/*" 
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