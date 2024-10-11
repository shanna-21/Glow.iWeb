import React, {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import imageProduct from "../../../assets/imageProducts.png";
import "./Product-Detail.css";
import image2 from "./../../../assets/Foodmate.jpeg";
import Hero from "./HeroProduct";
import useFetch from "../../../hooks/useFetch";

function ProductDetail() {
  const {productId} = useParams();
  console.log("id :", productId);
  const {
    data: productDatas,
    loading: productLoading,
    error,
  } = useFetch(`http://localhost:3002/product/getProductById/${productId}`);
  console.log(productDatas);
  const product = productDatas;
  const navigate = useNavigate();

  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(true);
  const [isPic1, setIsPic1] = useState(true);
  const [isPPic2, setIsPic2] = useState(false);

  if (!product) {
    return <h2>Product not found</h2>;
  }
  if (productLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error("Error fetching product data:", error);
    return <div>Error fetching data</div>;
  }
  const handleBack = () => {
    navigate("/products-search");
  };

  const toggleReviews = () => {
    setIsReviewsOpen(!isReviewsOpen);
    setIsIngredientsOpen(!isIngredientsOpen);
  };
  const toggleIngredients = () => {
    setIsReviewsOpen(!isReviewsOpen);
    setIsIngredientsOpen(!isIngredientsOpen);
  };

  const handlepic1 = () => {
    setIsPic1(!isPic1);
    setIsPic2(!isPPic2);
  };
  const handlepic2 = () => {
    setIsPic1(!isPic1);
    setIsPic2(!isPPic2);
  };

  return (
    <>
      <div className="hero-container-product-detail">
        <Hero />
      </div>
      <div className="product-detail">
        <div className="product-info">
          <button onClick={handleBack} className="back-button">
            {" "}
            ← Back{" "}
          </button>
          <div className="product-header-info">
            <div className="left-side-product-header">
              {isPic1 && (
                <img
                  src={product.image1}
                  alt={product.name}
                  className="product-image"
                />
              )}
              {isPPic2 && (
                <img
                  src={product.image2}
                  alt={product.name}
                  className="product-image"
                />
              )}
              <div className="product-header-container-image">
                <img
                  src={product.image1}
                  alt={product.name}
                  className="product-image"
                  onClick={handlepic1}
                />
                <img
                  src={product.image2}
                  alt={product.name}
                  className="product-image"
                  onClick={handlepic2}
                />
              </div>
            </div>
            <div className="right-side-product-header">
              <h2>{product.name}</h2>
              <p>Price: {product.price}</p>
              <p>{product.sold}</p>
              <p>Rating: {product.rating} stars</p>
            </div>
          </div>

          <div className="button-container">
            <button onClick={toggleIngredients} className="toggle-button">
              {isIngredientsOpen ? "Hide Ingredients" : "Show Ingredients"}
            </button>
            <button onClick={toggleReviews} className="toggle-button">
              {isReviewsOpen ? "Hide Reviews" : "Show Reviews"}
            </button>
          </div>

          {isIngredientsOpen && (
            <div className="product-ingredients">
              <h3>Ingredients</h3>
              <p>{product.ingredients}</p>
            </div>
          )}

          {isReviewsOpen && (
            <div className="product-reviews">
              <h3>Reviews</h3>
              {product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <div key={index} className="review-item">
                    <p>
                      <strong>{review.user}</strong>
                    </p>
                    <p>Rating: {review.rating} stars</p>
                    <p>{review.review}</p>
                  </div>
                ))
              ) : (
                <p>No reviews available for this product.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
