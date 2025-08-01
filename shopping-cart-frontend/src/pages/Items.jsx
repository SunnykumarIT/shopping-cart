import React, { useEffect, useState } from "react";
import {
  getItems,
  addToCart,
  placeOrder,
  getCart,
  getOrders,
} from "../api/api";

const Items = ({ token }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getItems(token);
        setItems(res.data);
      } catch (err) {
        alert("❌ Failed to load items");
        console.error("Error loading items:", err);
      }
    };
    fetchItems();
  }, [token]);

  const handleAddToCart = async (itemId) => {
    try {
      await addToCart(itemId, token);
      alert("✅ Item added to cart");
    } catch {
      alert("❌ Failed to add to cart");
    }
  };

  const handleCheckout = async () => {
    try {
      await placeOrder(token);
      alert("✅ Order placed successfully");
    } catch {
      alert("❌ Checkout failed");
    }
  };

  const handleShowCart = async () => {
    try {
      const res = await getCart(token);
      const userCart = res.data.find((cart) => cart.Items?.length > 0);
      if (!userCart) return alert("🛒 Cart is empty");

      const itemsList = userCart.Items.map((i) => `ID: ${i.ID}, ${i.Name}`).join("\n");
      alert("🛒 Cart Items:\n" + itemsList);
    } catch {
      alert("❌ Could not load cart");
    }
  };

  const handleShowOrders = async () => {
    try {
      const res = await getOrders(token);
      if (!res.data.length) return alert("📦 No orders yet");

      const formatted = res.data.map((order) => {
        const itemLines = order.Items?.map((i) => ` - ${i.Name}`) || [];
        return `Order ID: ${order.ID}\n${itemLines.join("\n")}`;
      }).join("\n\n");

      alert("📦 Order History:\n" + formatted);
    } catch {
      alert("❌ Could not load orders");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛍️ Available Items</h2>

      <div style={styles.actions}>
        <button style={styles.topButton} onClick={handleCheckout}>✅ Checkout</button>
        <button style={styles.topButton} onClick={handleShowCart}>🛒 Cart</button>
        <button style={styles.topButton} onClick={handleShowOrders}>📦 Order History</button>
      </div>

      <div style={styles.grid}>
        {items.length ? (
          items.map((item) => (
            <div key={item.ID} style={styles.card}>
              <h3 style={styles.title}>{item.name}</h3>
              <p style={styles.price}>₹ {item.price}</p>
              <button style={styles.cartBtn} onClick={() => handleAddToCart(item.ID)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p style={styles.noItems}>No items available</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  actions: {
    marginBottom: "1.5rem",
  },
  topButton: {
    padding: "0.5rem 1rem",
    marginRight: "10px",
    backgroundColor: "#444",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "1.5rem",
    width: "220px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
  },
  price: {
    fontSize: "1rem",
    color: "#333",
    marginBottom: "1rem",
  },
  cartBtn: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  noItems: {
    fontSize: "1rem",
    color: "#888",
  },
};

export default Items;



