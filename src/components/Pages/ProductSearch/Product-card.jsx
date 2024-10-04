import PropTypes from "prop-types";
import "./Product-card.css";
import mascot from "../../../assets/mascot-3.png";
import {Link} from "react-router-dom";

const ProductCard = ({product}) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="product-card">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="rating">
          <span>⭐️⭐️⭐️⭐️⭐️</span>
          <span>{product.sold}</span>
        </div>
        <div className="product-details">
          <div className="product-price-mascot-container">
            <div className="product-price-container">
              <h2>{product.name}</h2>
              <div className="product-price">
                <span>{product.price}</span>
              </div>
            </div>
            <img src={mascot} alt="glow-i mascot" />
          </div>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sold: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
