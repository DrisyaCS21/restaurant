import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const tableNumber = searchParams.get("table") || "1";

  // Fetch menu from backend
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/menu");
        setMenu(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching menu:", err);
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Add item to cart
  const addToCart = (item) => {
    const existing = cart.find(i => i._id === item._id);
    if (existing) {
      setCart(cart.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (item) => {
    setCart(cart.filter(i => i._id !== item._id));
  };

  // Place order
  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    try {
      await axios.post("http://localhost:1000/api/orders", {
        tableNumber,
        items: cart.map(i => ({
          name: i.name,
          price: i.price,
          quantity: i.quantity
        }))
      });

      alert("Order placed!");
      setCart([]); // clear cart
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order");
    }
  };

  if (loading) return <p>Loading menu...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Table: {tableNumber}</h2>

      <h3>Menu</h3>
      <div>
        {menu.map(item => (
          <div key={item._id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
            <h4>{item.name} - ₹{item.price}</h4>
            <p>Category: {item.category}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h3>Cart</h3>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item._id}>
              {item.name} x {item.quantity} - ₹{item.price * item.quantity}
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </div>
          ))}
          <p>
            <strong>
              Total: ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </strong>
          </p>
          <button onClick={placeOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default MenuPage;