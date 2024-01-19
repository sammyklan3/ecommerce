import "./navbar.css";
import { NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { Button } from "../button/button";
import { BsApple } from "react-icons/bs";
import { SiSamsung } from "react-icons/si";
import { SiHuawei } from "react-icons/si";
import { SiXiaomi } from "react-icons/si";
import { SiNokia } from "react-icons/si";
import { SiOneplus } from "react-icons/si";
import { FiFilter } from "react-icons/fi";

function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

function closeSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

export const Navbar = () => {

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
        <li>
          <NavLink to="/login">
            < Button text="Login" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/checkout">checkout</NavLink>
        </li>
      </ul>

      {/* Wide screens navigation */}
      <ul>

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
            <p className="cart-counter">0</p>
          </NavLink>
        </li>

        {/* Account  Link */}
        <li>
          <NavLink to="/account" className="account-link">
            <FaUser />
          </NavLink>
        </li>

        {/* Login Link */}
        <li>
          <NavLink to="/login" className="hideOnMobile">
            < Button text="Login" />
          </NavLink>
        </li>
        <li onClick={showSidebar} className=" menu-btn">
          <a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="26" fill="white" viewBox="0 -960 960 960" width="26"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg></a>
        </li>
      </ul>
    </nav>

  );
}
