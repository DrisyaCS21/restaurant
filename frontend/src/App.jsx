import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import AddMenu from "./admin/AddMenu";
import AuthPage from "./pages/AuthPage";  
// import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/auth" element={<AuthPage />} /> 
         <Route path="/admin" element={<AdminPage />} />
         <Route path="/admin/add-menu" element={<AddMenu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;