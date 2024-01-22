import "./productcard.css";
import { Button } from "../button/button";
import PropTypes from 'prop-types';
import { BsApple } from "react-icons/bs";
import { DiAndroid } from "react-icons/di";
import { SiSamsung, SiHuawei, SiXiaomi, SiNokia, SiOneplus } from "react-icons/si";

export const ProductCard = ({ product }) => {

  return (
    <div>
      <div className="product-card">
        <div>
          <img src={ product.image ? product.image : "https://via.placeholder.com/400"} alt={product.name} className="product-image" />
        </div>
        < hr />
        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">Ksh. {parseFloat(product.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <br />
          {product.model.toLowerCase().includes("iphone") ? (
            <p className="product-model"><span className="model-brand"><BsApple /></span> {product.model}</p>
          ) : product.model.toLowerCase().includes("samsung") ? (
            <p className="product-model"><span className="model-brand"><SiSamsung /></span> {product.model}</p>
          ) : product.model.toLowerCase().includes("xiaomi") ? (
            <p className="product-model"><span className="model-brand"><SiXiaomi /></span> {product.model}</p>
          ) : product.model.toLowerCase().includes("huawei") ? (
            <p className="product-model"><span className="model-brand"><SiHuawei /></span> {product.model}</p>
          ) : product.model.toLowerCase().includes("nokia") ?(
            <p className="product-model"><span className="model-brand"><SiNokia /></span> {product.model}</p>
          ): product.model.toLowerCase().includes("oneplus") ? (
            <p className="product-model"><span className="model-brand"><SiOneplus /></span> {product.model}</p>
          ) : (
            <p className="product-model"><span className="model-brand"><DiAndroid /></span> {product.model}</p>
          )}


          <br />
          <Button text="Add to Cart"/>
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

