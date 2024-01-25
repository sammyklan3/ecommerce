import { Navbar } from "../../components/navbar/Navbar";
import { useContext } from "react";
import { CartContext } from "../../context/Cart";
import "./cart.css";
import { Button } from "../../components/button/button";

export const Cart = () => {

  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);

  return (
    <div>
      <Navbar />
      <div>
        <h1>Cart</h1>
        <div className="cart-container">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-content">
                <img src={item.Image || "https://via.placeholder.com/400"} alt={item.Name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h1 className="">{item.Name}</h1>
                  <p>{item.Description.slice(0, 26)}...</p>
                  <p className="cart-item-price">Ksh. {parseFloat(item.Price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
              </div>
              <div className="cart-item-funcs">
                <button
                  className=""
                  onClick={() => {
                    addToCart(item)
                  }}
                >
                  +
                </button>
                <p>{item.quantity}</p>
                <button
                  className=""
                  onClick={() => {
                    removeFromCart(item)
                  }}
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
        {
          cartItems.length > 0 ? (
            <div className="">
              <h1 className="">Ksh. {parseFloat(getCartTotal()).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
              <Button 
                text="Clear Cart"
                onClick={clearCart}
              />
            </div>
          ) : (
            <h1 className="">Your cart is empty</h1>
          )
        }
      </div>
    </div>
  )
}
