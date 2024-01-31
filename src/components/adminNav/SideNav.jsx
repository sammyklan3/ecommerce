import "./sidenav.css";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

export const SideNav = () => {
    return (
        <div className="navigation">
            {/* Logo */}
            <div className="logo">
                <h1>PS</h1>
            </div>

            {/* Nav links */}
            <div className="nav-wrapper">
                <ul>
                    <li>
                        <NavLink to="/admin"><FaHome /> Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/products"><FaWarehouse /> Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/sales"><FaDollarSign /> Sales</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/reports"><FaChartBar /> Reports</NavLink>
                    </li>
                    <li>
                        <NavLink to="/"><FaUsers /> Customers</NavLink>
                    </li>

                </ul>
            </div>

            {/* Footer */}
            <div className="admin-footer">
                <hr />
                <ul>
                    <li>
                        <NavLink to="/admin/settings"><FaCog /> Settings</NavLink>
                    </li>
                    <li>
                        <NavLink to="/logout"><FaSignOutAlt /> Logout</NavLink>
                    </li>
                    
                </ul>
            </div>
        </div>
    )
}
