import "./admin.css";
import { SideNav } from "../../../components/adminNav/SideNav";
import { useEffect, useState } from "react";
import { FaTag } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { Loader } from "../../../components/loader/Loader";
import { useAuth } from "../../../context/AuthContext";
import { FaBell } from "react-icons/fa";
import { axiosInstance } from "../../../api/axiosInstance";
import { OrderList } from "../../../components/orderList/OrderList";



export const Admin = () => {

    const { token, role } = useAuth();

    const [orderData, setOrderData] = useState(null);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/orders", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });

                // Simulate data fetching for 2 seconds
                await new Promise(resolve => setTimeout(resolve, 2000));

                if (response.status !== 200) {
                    setError("An error occurred while fetching!");
                    setLoading(false);
                }

                // If status code is 200
                setOrderData(response.data);
                setLoading(false);

            } catch (error) {
                setError(error.response.data.error);
                setLoading(false);
            }
        }

        fetchData();

    }, [token]);

    if (!token) {
        return (
            <>
                <p>Please sign in</p>
            </>
        )
    } else if (role !== "admin") {
        return (
            <>
                <p>{error}</p>
            </>
        )
    } else if (loading) {
        return (
            <>
                <Loader />
            </>
        )
    } else {
        return (
            <>
                <div className="body-container">

                    {/* Sidenav */}
                    < SideNav />
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
                                <img src="https://via.placeholder.com/400" className="admin-header-profile" alt="admin-header-profile" />
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
                                                        <img src="https://via.placeholder.com/400" className="top-selling-img" alt="top-selling-img" />
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
                                            {error ? (
                                                <p>Error: {error}</p>
                                            ) : orderData && orderData.length > 0 ? (
                                                orderData.map((order, index) => (
                                                    <OrderList key={index} order={order} />
                                                ))
                                            ) : (
                                                <p>No available orders</p>
                                            )
                                            }
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
}
