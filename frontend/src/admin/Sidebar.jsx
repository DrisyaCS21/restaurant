import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { path: "/admin", name: "Dashboard", icon: "📊" },
    { path: "/admin/orders", name: "Orders", icon: "📦" },
    { path: "/admin/menu", name: "Menu Items", icon: "🍽️" },
    { path: "/admin/add-menu", name: "Add Menu", icon: "➕" },
    { path: "/admin/users", name: "Users", icon: "👥" },
    { path: "/admin/reports", name: "Reports", icon: "📈" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <>
      <div className={`admin-sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <button 
          className="toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? "→" : "←"}
        </button>
        
        <div className="sidebar-header">
          {!isCollapsed ? (
            <>
              <div className="logo">🍕 QR Restaurant</div>
              <div className="role-badge">Admin Panel</div>
            </>
          ) : (
            <div className="logo-mini">👑</div>
          )}
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `nav-link ${isActive ? "active" : ""}`
              }
              title={isCollapsed ? item.name : ""}
            >
              <span className="icon">{item.icon}</span>
              {!isCollapsed && <span className="name">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn" title={isCollapsed ? "Logout" : ""}>
            <span className="icon">🚪</span>
            {!isCollapsed && <span className="name">Logout</span>}
          </button>
        </div>
      </div>

      <style>{`
        .admin-sidebar {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          transition: all 0.3s ease;
          z-index: 1000;
          overflow-y: auto;
          overflow-x: hidden;
          box-shadow: 2px 0 10px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
        }

        .admin-sidebar:not(.collapsed) {
          width: 260px;
        }

        .admin-sidebar.collapsed {
          width: 70px;
        }

        /* Scrollbar styling */
        .admin-sidebar::-webkit-scrollbar {
          width: 5px;
        }

        .admin-sidebar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
        }

        .admin-sidebar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
          border-radius: 5px;
        }

        .toggle-btn {
          position: absolute;
          right: -12px;
          top: 20px;
          background: white;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #667eea;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: transform 0.2s;
          z-index: 1001;
        }

        .toggle-btn:hover {
          transform: scale(1.1);
        }

        .sidebar-header {
          padding: 30px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.2);
          margin-bottom: 20px;
          text-align: center;
        }

        .logo {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .logo-mini {
          font-size: 32px;
        }

        .role-badge {
          font-size: 12px;
          background: rgba(255,255,255,0.2);
          padding: 4px 8px;
          border-radius: 20px;
          display: inline-block;
          margin-top: 5px;
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 0 15px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px 15px;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.3s;
          white-space: nowrap;
        }

        .nav-link:hover {
          background: rgba(255,255,255,0.1);
          transform: translateX(5px);
        }

        .nav-link.active {
          background: rgba(255,255,255,0.2);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .icon {
          font-size: 20px;
          min-width: 24px;
        }

        .name {
          font-size: 14px;
          font-weight: 500;
        }

        .sidebar-footer {
          padding: 20px;
          border-top: 1px solid rgba(255,255,255,0.2);
          margin-top: auto;
        }

        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px 15px;
          background: rgba(255,255,255,0.1);
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 14px;
          font-weight: 500;
        }

        .logout-btn:hover {
          background: rgba(255,255,255,0.2);
          transform: translateX(5px);
        }

        /* Collapsed state styles */
        .admin-sidebar.collapsed .nav-link,
        .admin-sidebar.collapsed .logout-btn {
          justify-content: center;
          padding: 12px;
        }

        .admin-sidebar.collapsed .icon {
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .admin-sidebar:not(.collapsed) {
            width: 200px;
          }
        }
      `}</style>
    </>
  );
}

export default Sidebar;