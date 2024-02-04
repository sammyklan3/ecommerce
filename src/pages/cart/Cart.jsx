import { Navbar } from "../../components/navbar/Navbar";
import { useContext } from "react";
import { CartContext } from "../../context/Cart";
import "./cart.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom"

export const Cart = () => {

  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);

  const RedirectComponent = () => {
    return <NavLink to="/checkout" />;
  };

  return (
    <div>
      <Navbar />
      {/* Conditional rendering */}
      {cartItems && cartItems.length > 0 ? (
        <div className="cart-body">
          <div className="cart-container">
            {/* Mapping The cart items */}
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>

                <div className="cart-item-content">
                  <img src={item.Images || "https://via.placeholder.com/400"} alt={item.Name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h1 className="cart-item-name">{item.Name}</h1>
                    <p className="cart-item-desc">{item.Description}</p>
                    <p className="cart-item-price">Ksh. {parseFloat(item.Price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
                </div>

                <div className="cart-item-funcs">
                  <div className="func-grp-1">
                    <p>Qty: </p>
                    <button
                      className="cart-add-btn"
                      onClick={() => {
                        addToCart(item)
                      }}
                    >
                      +
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      className="cart-remove-btn"
                      onClick={() => {
                        removeFromCart(item)
                      }}
                    >
                      -
                    </button>
                  </div>

                  <p className="trash-icon" onClick={() => {
                    removeFromCart(item)
                  }}><FaRegTrashAlt /></p>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-box">
            {/* Subtotal */}
            <div className="sub-total">
              <p>Subtotal: </p>
              <p>Ksh. {parseFloat(getCartTotal()).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            {/* Delivery fee */}
            <div className="delivery-fee">
              <p>Delivery Fee: </p>
              <p>Ksh. 0</p>
            </div>
            <hr />
            {/* Totals */}
            <div className="cart-total">
              <h3>Total: </h3>
              <h3>Ksh. {parseFloat(getCartTotal()).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
            </div>
            {/* Button for clearing cart */}
            <div className="buttons">
              <button className="cart-clear" onClick={clearCart}>Discard</button>
              <button className="cart-checkout" onClick={RedirectComponent}>checkout</button>
            </div>
          </div>

        </div>
      ) : (
        // In the case the cart is empty
        <div className="cart-empty-body">
          <div className="cart-empty">
            <h1>Your cart is empty!</h1>
          </div>
        </div>
      )}
    </div>
  )
}
