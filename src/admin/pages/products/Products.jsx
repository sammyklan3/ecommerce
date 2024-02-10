import "./products.css";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../api/axiosInstance";
import { Loader } from "../../../components/loader/Loader";
import { SideNav } from "../../../components/adminNav/SideNav";
import { NavLink } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

const ProductCard = ({ data, onDelete }) => {
    return (
        data.map((product, index) => (
            <li className="adminProduct-card" key={index}>
                <div className="product-card-name">
                    <img src={product.ImageURL || "https://via.placeholder.com/400"} alt={product.Name} />
                    <h3>{product.Name}</h3>
                </div>
                <p>{product.Description.slice(0, 20)}...</p>
                <p>Ksh. {parseFloat(product.Price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p>{product.StockQuantity}</p>
                <button className="deleteBtn" onClick={() => onDelete(product.ProductID)}><FaRegTrashAlt /></button>
            </li>
        ))
    )
}

export const Products = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/products");

                // Simulate data fetching for 2 seconds
                await new Promise(resolve => setTimeout(resolve, 1000));

                if (response.status !== 200) {
                    setError(response.data.error)
                    setLoading(false)
                } else {
                    setData(response.data);
                    setLoading(false)
                }

            } catch (err) {

                console.log(err);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // Function for deleting product
    const handleDelete = async (productId) => {
        try {
            setLoading(true);
            const response = await axiosInstance.delete(`/products/${productId}`);

            // Simulate data fetching for 2 seconds
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (response.status === 204) {
                // Product successfully deleted
                console.log("Product deleted successfully");
                await fetchData(); // Refetch data
            } else {
                // Handle other status codes or errors
                setError("Error deleting product");
            }

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    // Separate function for fetching data
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/products");

            if (response.status !== 200) {
                setError(response.data.error);
            } else {
                setData(response.data);
            }

        } catch (err) {
            console.log(err);
        }
    };

    const filteredData = data && data.filter(product =>
        product.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.Description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }


    if (loading) {
        return (
            <Loader />
        )
    } else {
        return (
            <>
                <div className="product-body-container">
                    <SideNav />
                    {error ? (
                        <p>Error: {error}</p>
                    ) : data && data.length > 0 ? (
                        <div className="products-container">
                            <div className="actions-container">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    id="search"
                                />
                                <NavLink to="/admin/createproduct">+</NavLink>
                            </div>
                            <p>Products found: {filteredData.length}</p>
                            <header className="products-header">
                                <h3>Image</h3>
                                <h3>Name</h3>
                                <h3>Description</h3>
                                <h3>Price</h3>
                                <h3>Quantity</h3>
                                <h3> </h3>
                            </header>
                            <ul className="products-container-list">
                                <ProductCard data={filteredData} onDelete={handleDelete} />
                            </ul>
                        </div>

                    ) : (
                        <>
                            <div className="products-container">
                                <div className="actions-container">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        id="search"
                                    />
                                    <NavLink to="/admin/createproduct">+</NavLink>
                                </div>
                                <p>Products found: {filteredData.length}</p>
                                <p>No available products</p>
                            </div>
                        </>
                    )}
                </div>
            </>
        )
    }
}
