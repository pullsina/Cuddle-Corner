import { createContext, useContext, useState } from "react";

/* skapar själva context*/
const CartContext = createContext();

/* skapar state för varukorgen - statvärden är tom array []*/
function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
/*Den här funktionen lägger till produkter i varukorgen. Den kollar först om produkten redan finns i varukorgen.
 Om den gör det, ökar den kvantiteten med 1. 
 Om den inte gör det, lägger den till produkten som en ny post i varukorgen med en kvantitet på 1.*/
    
    function addToCart(product) {
      console.log("Adding to cart:", product);
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCartItems(updatedCart);
      return;
    }

    const newCartItem = {
      ...product,
      quantity: 1,
    };

    setCartItems([...cartItems, newCartItem]);
  }

  function removeFromCart(productId) {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
  }

  function increaseQuantity(productId) {
    const updatedCart = cartItems.map((item) =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCartItems(updatedCart);
  }

  function decreaseQuantity(productId) {
    const updatedCart = cartItems
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

    function clearCart() {
  setCartItems([]);
    }
    
const value = {
  cartItems,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  cartCount,
  cartTotal,
};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}



function useCart() {
  return useContext(CartContext);
}

export { CartProvider, useCart };