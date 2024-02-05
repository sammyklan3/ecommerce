import "./product.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";
import { Loader } from "../../components/loader/Loader";
import { Navbar } from "../../components/navbar/Navbar";
import { CartContext } from "../../context/Cart";
import { Button } from "../../components/button/button";

export const ProductDetail = () => {

    const { addToCart } = useContext(CartContext);

    const { ProductID } = useParams();
    const [product, setProduct] = useState(null);
    const [ error, setError ] = useState(null);
 
    const handleAddToCart = () => {
        addToCart(product);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/product/${ProductID}`);

                // Simulate data fetching for 2 seconds
                await new Promise(resolve => setTimeout(resolve, 200));

                setProduct(response.data[0])

            } catch (err) {
                setError(err.message)
            }
        }

        fetchData();

    }, [ProductID])

    if( error ) {
        return (
            <>
                <Navbar />
                <p>{error}</p>
            </>
        )
    }

    if (!product) {
        return <Loader />
    }

    return (
        <>
            <Navbar />
            <br />
            <div className="product-body">

                <div className="product-container">
                    <div className="product-image-container">
                        <img src={product.Images} alt={product.Name} className="product-image-slider" />
                        <div className="product-image-selector">
                            <img src={product.Images} alt={product.Name} className="product-single-image" />
                        </div>
                    </div>
                    <div className="product-info">
                        <h1>{product.Name}</h1>
                        <h2>Ksh. {parseFloat(product.Price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                        {product.StockQuantity < 5 ? (
                            <p>Hurry up! Only {product.StockQuantity} left</p>
                        ) : (
                            <p>{product.StockQuantity} Items left</p>
                        )}
                        <Button text="Add to cart" onClick={handleAddToCart} />
                    </div>
                </div>

                <div className="product-description">
                    <h3>Detailed Description</h3>
                    <p>{product.Description}</p>
                </div>

                <div className="recommendation">
                    <h2>
                        Recommendations
                    </h2>
                    <hr />
                    <div className="recommendation-products">

                    </div>
                </div>
            </div>

        </>
    )

}
