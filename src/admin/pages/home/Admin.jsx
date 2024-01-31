import "./admin.css";
import { SideNav } from "../../../components/adminNav/SideNav";

import { FaTag } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaBell } from "react-icons/fa";


export const Admin = () => {
    return (
        <>
            <div className="body-container">
                {/* Sidenav */}
                <SideNav />
                {/* The container that carries all other components */}
                <div className="admin-container">
                    {/* Page header */}
                    <div className="admin-header">
                        <h1>Dashboard</h1>
                        <div className="admin-header-icons">
                            <div className="admin-header-notification">
                                <span className="notification-bell"><FaBell /></span>
                                <span className="notification-counter">0</span>
                            </div>
                            <img src="https://via.placeholder.com/400" className="admin-header-profile" alt="admin-header-profile"/>
                        </div>
                    </div>
                    <div className="container-group">
                        {/* Main middle container */}
                        <div className="admin-main-container">
                            {/* The top section */}
                            <div className="top-section">
                                {/* First element */}
                                <div className="total-sales">
                                    <h2><FaTag /> Total Sales</h2>
                                    <div className="total-sales-details">
                                        <h3>$ 20,000</h3>
                                    </div>
                                </div>

                                {/* Second element */}
                                <div className="total-earnings">
                                    <h2><FaRegMoneyBillAlt /> Total Earnings</h2>
                                    <div className="total-earnings-details">
                                        <h3>$ 20,000</h3>
                                    </div>
                                </div>

                                {/* Third element */}
                                <div className="total-orders">
                                    <h2><FaShoppingBag /> Total Orders</h2>
                                    <div className="total-orders-details">
                                        <h3>300</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Middle Section */}
                            <div className="analytics-graph">
                                <div className="analytics-graph-header">
                                    <h3>analytics</h3>
                                    <p>Earnings</p>
                                </div>
                            </div>

                            {/* Bottom section */}
                            <div className="top-selling">
                                {/* Header */}
                                <div className="top-selling-header">
                                    <h3>Top Selling</h3>
                                    <p>Units Sold</p>
                                    <p>Earnings</p>
                                </div>
                                {/* Top Selling Content */}
                                <div className="top-selling-content">
                                    <div>
                                        <ul className="top-selling-item-list">
                                            <li className="top-selling-item">
                                                <div>
                                                    <img src="https://via.placeholder.com/400" className="top-selling-img" alt="top-selling-img"/>
                                                    <p>IPhone x</p>
                                                </div>
                                                <p>11</p>
                                                <p>Ksh. 20,000</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>


                        {/* Sidebar container */}
                        <div className="admin-sidebar-container">
                            <div className="order-list">
                                <div className="order-list-header">
                                    <p>Recent Orders</p>
                                    <p>...</p>
                                </div>
                                <ul>
                                    <li>
                                        <div className="order-list-item">
                                            <div className="order-list-item-details">
                                                <h3>Order #1</h3>
                                                <div className="order-list-item-details-date">
                                                    <h4>Date: 12/12/2020</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
