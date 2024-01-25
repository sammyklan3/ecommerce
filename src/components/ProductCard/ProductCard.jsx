import "./productcard.css";
import { Button } from "../button/button";
import PropTypes from 'prop-types';
import { BsApple } from "react-icons/bs";
import { DiAndroid } from "react-icons/di";
import { SiSamsung, SiHuawei, SiXiaomi, SiNokia, SiOneplus } from "react-icons/si";
import { CartContext } from "../../context/Cart";
import { useEffect, useContext, useState } from "react";



export const ProductCard = ({ product }) => {

  const { addToCart } = useContext(CartContext);
  
  const model = product.Model.toLowerCase();
  const isSamsungGalaxy = ["samsung", "galaxy"].some(keyword => model.includes(keyword));

  return (
    <div>
      <div className="product-card">
        <div>
          <img src={ product.Image || "https://via.placeholder.com/400"} alt={product.Name} className="product-image" />
        </div>
        < hr />
        <div className="product-details">
          <h3 className="product-name">{product.Name}</h3>
          <small className="product-description">{product.Description.slice(0, 31)}...</small>
          <p className="product-price">Ksh. {parseFloat(product.Price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <br />
          {product.Model.toLowerCase().includes("iphone") ? (
            <p className="product-model"><span className="model-brand"><BsApple /></span> {product.Model}</p>
          ) : isSamsungGalaxy ? (
            <p className="product-model"><span className="model-brand"><SiSamsung /></span> {product.Model}</p>
          ) : product.Model.toLowerCase().includes("xiaomi") ? (
            <p className="product-model"><span className="model-brand"><SiXiaomi /></span> {product.Model}</p>
          ) : product.Model.toLowerCase().includes("huawei") ? (
            <p className="product-model"><span className="model-brand"><SiHuawei /></span> {product.Model}</p>
          ) : product.Model.toLowerCase().includes("nokia") ?(
            <p className="product-model"><span className="model-brand"><SiNokia /></span> {product.Model}</p>
          ): product.Model.toLowerCase().includes("oneplus") ? (
            <p className="product-model"><span className="model-brand"><SiOneplus /></span> {product.Model}</p>
          ) : (
            <p className="product-model"><span className="model-brand"><DiAndroid /></span> {product.Model}</p>
          )}


          <br />
          <Button text="Add to Cart" onClick={() => addToCart(product)}/>
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    Image: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Model: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Price: PropTypes.number.isRequired,
  }).isRequired,
};

