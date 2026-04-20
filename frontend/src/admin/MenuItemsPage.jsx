import Sidebar from "./Sidebar";
import MenuItems from "../components/MenuItems";

function MenuItemsPage() {
  return (
    <div className="admin-layout">
      <Sidebar />
      
      <div className="main-content">
        <div className="top-bar">
          <h1>🍽️ Menu Items</h1>
          <p>View all menu items (Admin View)</p>
        </div>
        
        <div className="content-wrapper">
          <MenuItems userRole="admin" />
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
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .top-bar h1 {
          margin: 0 0 5px 0;
          font-size: 24px;
          color: #333;
        }

        .top-bar p {
          margin: 0;
          color: #666;
        }

        .content-wrapper {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 70px;
          }
        }
      `}</style>
    </div>
  );
}

export default MenuItemsPage;