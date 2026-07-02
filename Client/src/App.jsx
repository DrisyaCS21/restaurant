import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import Footer from './components/Footer.jsx'
import Dashboard from './pages/User/Dashboard.jsx'
import OrderForm from './pages/User/OrderForm.jsx'
import Cart from './components/Cart.jsx'
import { AppProvider } from './context/AppContext.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'

function App() {
  const [cartOpen, setCartOpen] = React.useState(false)

  return (
    <AppProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/order" element={<OrderForm />} />
            <Route path="/admindashboard/*" element={<AdminDashboard />} />
          </Routes>
          <Footer />

          <button
            onClick={() => setCartOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-orange-500 hover:bg-orange-400 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
          </button>

          <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
