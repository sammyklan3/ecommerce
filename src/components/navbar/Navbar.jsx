import "./navbar.css";
import { NavLink } from "react-router-dom";
import { FiShoppingCart, FiFilter } from "react-icons/fi";
import { FaUser, } from "react-icons/fa";
import { Button } from "../button/Button";
import { BsApple } from "react-icons/bs";
import { SiSamsung, SiHuawei, SiXiaomi, SiNokia, SiOneplus } from "react-icons/si";
import { CartContext } from "../../context/Cart";
import { useContext, useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";


export const Navbar = () => {

  const { token, logout } = useAuth();

  const { cartItems } = useContext(CartContext);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible]);


  function showSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "flex";
  }

  function closeSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
  }

  return (
    <nav>
      <NavLink to="/" className="logo">PS</NavLink>

      {/* Sidebar navigation */}
      <ul className="sidebar">
        <li onClick={closeSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="26" viewBox="0 -960 960 960" width="26"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
        </li>

        <h3>CARTEGORIES</h3>
        < hr />
        {/* Cartegories section */}
        <ul className="cartegory">
          <li><a href="#">Motherboards</a></li>
          <li><a href="#">Screens</a></li>
          <li><a href="#">Cameras</a></li>
        </ul>
        <hr />

        {/* Manufacterers section */}
        <h3>Manufacterers</h3>
        < hr />
        <ul className="cartegory">
          <li><a href="#"><BsApple />&nbsp;&nbsp;Apple</a></li>
          <li><a href="#"><SiHuawei /> &nbsp;&nbsp;Huawei</a></li>
          <li><a href="#" className="custom-icon"><SiSamsung />&nbsp;&nbsp;Samsung</a></li>
          <li><a href="#"><SiXiaomi /> &nbsp;&nbsp;Xiaomi</a></li>
          <li><a href="#"><SiNokia />&nbsp;&nbsp; Nokia</a></li>
          <li><a href="#"><SiOneplus />&nbsp;&nbsp; OnePlus</a></li>
        </ul>
        {/* Login Link */}
        {token ? (
          <li>
            <Button text="Logout" onClick={logout} />
          </li>
        ) : (
          <li>
            <NavLink to="/login">
              < Button text="Login" />
            </NavLink>
          </li>
        )
        }

      </ul>

      {/* Wide screens navigation */}
      <ul style={{ top: visible ? "0" : "-100px", transition: "top 0.5s" }}>

        <div className="dropdown hideOnMobile">
          <p>Filter&nbsp;<FiFilter /></p>
          <div className="dropdown-content">
            <a href="#"><BsApple />&nbsp;&nbsp;Apple</a>
            <a href="#"><SiHuawei /> &nbsp;&nbsp;Huawei</a>
            <a href="#"><SiSamsung />&nbsp;&nbsp;Samsung</a>
            <a href="#"><SiXiaomi /> &nbsp;&nbsp;Xiaomi</a>
            <a href="#"><SiNokia />&nbsp;&nbsp; Nokia</a>
            <a href="#"><SiOneplus />&nbsp;&nbsp; OnePlus</a>
          </div>
        </div>
        &nbsp;&nbsp;&nbsp;
        {/* Cart Link */}
        <li>
          <NavLink to="/cart" className="cart-link">
            <FiShoppingCart />
            <p className="cart-counter">{cartItems.length}</p>
          </NavLink>
        </li>

        {/* Conditional  */}
        {token ? (
          <>
            {/* Render the account Icon if the user has signed in */}
            < li >
              <NavLink to="/account" className="account-link">
                <FaUser />
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" className="hideOnMobile">
              <Button text="Login" />
            </NavLink>
          </li>
        )}
        <li onClick={showSidebar} className=" menu-btn">
          <a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="26" fill="white" viewBox="0 -960 960 960" width="26"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg></a>
        </li>
      </ul>
    </nav >

  );
}