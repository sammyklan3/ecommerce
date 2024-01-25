import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Function for adding to cart
    const addToCart = (item) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id); // Check if the item is already in the cart

        if (isItemInCart) {
            setCartItems(
                cartItems.map((cartItem) => //If the item is in the cart, Increase the quantity of the item
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem // Otherwise, return the cart item
                )
            );
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }])
        }
    }

    // Function for removing the item from the cart
    const removeFromCart = (item) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

        if (isItemInCart.quantity === 1) {
            setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id)) // If the quantity of the item is 1, remove the item from the cart
        } else {
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity - 1 } // If the quantity of the item is greater than 1, then decrease the quantity of the item
                        : cartItem
                )
            );
        }
    };

    // Function for clearing the cart
    const clearCart = () => {
        setCartItems([]); // Sets the cart item to an empty array
    }

    // Function for getting the cart total
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);
    }

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        const cartItems = localStorage.getItem("cartItems");
        if (cartItems) {
            setCartItems(JSON.parse(cartItems));
        }
    }, []);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                getCartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    )

};