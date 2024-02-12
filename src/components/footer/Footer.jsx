import "./footer.css";
import { FiShoppingCart } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="footer-container">
        <ul>
            <li>
                <NavLink to="/"><FaHome /></NavLink>
            </li>
            <li>
                <NavLink to="/products"><FaWarehouse /></NavLink>
            </li>
            <li>
                <NavLink to="/cart"><FiShoppingCart /></NavLink>
            </li>
            <li>
                <NavLink to="/account"><FaUser /></NavLink>
            </li>
        </ul>
    </div>
  )
}
