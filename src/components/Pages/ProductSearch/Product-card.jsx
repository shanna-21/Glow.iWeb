import React from "react";
import "./Product-card.css";
import productimg from "../../../assets/imageProducts.png";
import mascot from "../../../assets/mascot-3.png";

const ProductCard = () => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={productimg} alt="Ceramic Skin Saviour" />
      </div>
      <div className="rating">
        <span>⭐️⭐️⭐️⭐️⭐️</span>
        <span>10RB++ sold</span>
      </div>
      <div className="product-details">
        <div className="product-price-mascot-container">
          <div className="product-price-container">
            <h2>Ceramic Skin Saviour Moisturizer Gel</h2>
            <div className="product-price">
              <span>Rp. 263,000</span>
            </div>
          </div>

          <img src={mascot} alt="glow-i mascot" />
        </div>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
