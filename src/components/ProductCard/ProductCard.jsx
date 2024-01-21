import "./productcard.css";
import { Button } from "../button/button";
import PropTypes from 'prop-types';

export const ProductCard = ({ product }) => {
  return (
    <div>
      <div className="product-card">
        <div>
          <img src={ product.image ? product.image : "https://via.placeholder.com/400"} alt={product.Name} className="product-image" />
        </div>
        < hr />
        <div className="product-details">
          <h3 className="product-name">{product.Name}</h3>
          <p className="product-description">{product.Description}</p>
          <p className="product-price">Ksh. {product.Price}</p>
          <Button text="Add to Cart"/>
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Price: PropTypes.number.isRequired,
  }).isRequired,
};

