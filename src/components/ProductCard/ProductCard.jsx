import "./productcard.css";
import { Button } from "../button/Button"
import PropTypes from 'prop-types';

export const ProductCard = ({ product }) => {
  return (
    <div>
      <div className="product-card">
        <img src={product.image} alt={product.name} className="product-image" />
        < hr />
        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price}</p>
          <Button text="Add to Cart"/>
        </div>
      </div>
    </div>
  )
}
