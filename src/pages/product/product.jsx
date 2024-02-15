import "./product.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";
import { Loader } from "../../components/loader/Loader";
import { Navbar } from "../../components/navbar/Navbar";
import { CartContext } from "../../context/Cart";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Carousel } from "../../components/carousel/Carousel";
import { Rating } from "../../components/rating/Rating";

const SimilarProduct = ({ product }) => {
    return (
        <li>
            <div className="similar-product-container">
                <NavLink to={`/product/${product.ProductID}`} className="similar-product-link">
                    <img src={product.Images} alt={product.Name} className="similar-product-image" />
                    <div className="similar-product-info">
                        <h3 className="similar-product-name">{product.Name}</h3>
                        <p className="similar-product-price">Ksh. {parseFloat(product.Price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                </NavLink>
            </div>
        </li>
    )
}

export const ProductDetail = () => {

    const { addToCart } = useContext(CartContext);
    const { ProductID } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [similarProducts, setSimilarProducts] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
    };

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    // Function to check if the image URL is valid
    function isValidImageUrl(url) {
        const image = new Image();
        image.src = url;
        return image.complete && image.naturalWidth !== 0;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/product/${ProductID}`);

                // Simulate data fetching for 2 seconds
                await new Promise(resolve => setTimeout(resolve, 200));

                setProduct(response.data);

            } catch (err) {
                setError(err.message)
            }
        }

        fetchData();

    }, [ProductID])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!product) return; // Check if product is null

                const response = await axiosInstance.get("/products");

                // Simulate data fetching for some time
                await new Promise(resolve => setTimeout(resolve, 200));

                const filteredProducts = response.data
                    .filter(p => p.Category) // Filter out objects where Category is undefined or null
                    .filter(p => p.Category.toLowerCase() === product.Category.toLowerCase() && p.ProductID !== product.ProductID);

                setSimilarProducts(filteredProducts);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();

    }, [product]); // Update the dependency to include 'product'

    if (error) {
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
                        <div className="image-slider">
                            {/* Carousel */}
                            <Carousel images={product.Images} />
                        </div>
                    </div>
                    <div className="content-container">
                        <div className="product-info">
                            <h1>{product.Name}</h1>
                            <h2>Ksh. {parseFloat(product.Price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                            {product.StockQuantity < 5 ? (
                                <p className="low-quantity">Hurry up! Only {product.StockQuantity} left</p>
                            ) : (
                                <p>{product.StockQuantity} Items left</p>
                            )}

                            {product.Reviews.length > 0 && product.Reviews ? (
                                <p><Rating ratings={product.Reviews.map(review => parseFloat(review.Rating))} /></p>
                            ) : (
                                <p>No reviews</p>
                            )}
                        </div>
                        <div className="action-section">
                            <button onClick={handleAddToCart} className="addToCartBtn"> Add to Cart</button>
                            <button className="buyBtn">Buy now</button>
                        </div>
                    </div>
                </div>

                <div className="product-description">
                    <h3>About this Item</h3>
                    <p>{product.Description}</p>
                </div>

                <div className="reviews-section">
                    <div className="reviews-section-title" onClick={toggleOpen}>
                        <p>Reviews {product.Reviews.length}</p>
                        {isOpen ? (
                            <p><FaAngleUp /></p>
                        ) : (
                            <p><FaAngleDown /></p>
                        )}
                    </div>

                    {isOpen && (
                        <div className="reviews-section-content">
                            <ul>
                                {product.Reviews.map((review, index) => (
                                    <li key={index}>
                                        <div className="review-container">
                                            <div className="review-image-container">
                                                <img
                                                    src={isValidImageUrl(review.profile_image) ? review.profile_image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                                                    alt={review.username}
                                                    className="review-image"
                                                />
                                                <h3 className="review-name">{review.username}</h3>
                                                <p className="review-rating">
                                                    <FaStar />
                                                    <p>{review.Rating}</p>
                                                </p>
                                            </div>
                                            <div className="review-info">
                                                <p className="review-text">{review.Comment}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="recommendation">
                    <h2>
                        Similar products
                    </h2>
                    <hr />
                    <div className="recommendation-products">
                        <ul>
                            {similarProducts && similarProducts.length > 0 ? (
                                similarProducts.map((product, index) => (
                                    <SimilarProduct key={index} product={product} />
                                ))
                            ) : (
                                <p>Similar Items cannot be found</p>
                            )}

                        </ul>
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </>
    )

}

SimilarProduct.propTypes = {
    product: PropTypes.shape({
        Images: PropTypes.arrayOf(PropTypes.string).isRequired,
        Name: PropTypes.string.isRequired,
        Model: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Price: PropTypes.number.isRequired,
        ProductID: PropTypes.string.isRequired,
    }).isRequired,
};
