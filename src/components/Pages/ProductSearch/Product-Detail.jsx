import React, {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import imageProduct from "../../../assets/imageProducts.png";
import "./Product-Detail.css";
import image2 from "./../../../assets/Foodmate.jpeg"
import Hero from "./HeroProduct";

const products = [
  {
    id: 1,
    name: "Ceramic Skin Saviour Moisturizer Gel",
    price: "Rp. 263.000",
    sold: "10RB++ sold",
    image: imageProduct,
    image2:image2,
    rating: 5,
    reviews: [
      {
        user: "Alice",
        rating: 5,
        review: "Leaves my skin soft and hydrated all day!",
      },
      {user: "Bob", rating: 4, review: "Good but a bit pricey."},
      {user: "Charlie", rating: 5, review: "Perfect for sensitive skin!"},
    ],
    ingredients:
      "Water, Glycerin, Dimethicone, Niacinamide, Hyaluronic Acid, Ceramide NP, Marine Collagen.",
  },
  {
    id: 2,
    name: "Hydra Boost Water Gel",
    price: "Rp. 175.000",
    sold: "5RB++ sold",
    image: imageProduct,
    rating: 4,
    reviews: [
      {user: "David", rating: 4, review: "Great hydration but strong scent."},
      {user: "Eva", rating: 5, review: "So refreshing!"},
      {user: "Frank", rating: 4, review: "Keeps my face moist all day."},
    ],
    ingredients:
      "Aloe Vera Extract, Sodium Hyaluronate, Glycerin, Niacinamide, Allantoin.",
  },
  {
    id: 3,
    name: "Vitamin C Brightening Serum",
    price: "Rp. 225.000",
    sold: "7RB++ sold",
    image: imageProduct,
    rating: 5,
    reviews: [
      {user: "Grace", rating: 5, review: "Faded my dark spots!"},
      {user: "Henry", rating: 4, review: "Takes time but works."},
      {user: "Isabel", rating: 5, review: "Improved my skin tone!"},
    ],
    ingredients:
      "Ascorbic Acid, Vitamin E, Hyaluronic Acid, Ferulic Acid, Panthenol.",
  },
  {
    id: 4,
    name: "Retinol Advanced Night Cream",
    price: "Rp. 290.000",
    sold: "8RB++ sold",
    image: imageProduct,
    rating: 5,
    reviews: [
      {user: "Jack", rating: 5, review: "Reduced fine lines visibly!"},
      {user: "Kelly", rating: 4, review: "Retinol takes time but effective."},
      {user: "Leo", rating: 5, review: "Skin feels firmer!"},
    ],
    ingredients: "Retinol, Peptides, Hyaluronic Acid, Squalane, Vitamin E.",
  },
  {
    id: 5,
    name: "Daily Sunblock SPF 50+",
    price: "Rp. 150.000",
    sold: "20RB++ sold",
    image: imageProduct,
    rating: 4,
    reviews: [
      {user: "Megan", rating: 4, review: "Leaves a slight white cast."},
      {user: "Nate", rating: 5, review: "Lightweight and not greasy."},
      {
        user: "Olivia",
        rating: 4,
        review: "Good but could be more moisturizing.",
      },
    ],
    ingredients: "Zinc Oxide, Titanium Dioxide, Aloe Vera Extract, Vitamin E.",
  },
  {
    id: 6,
    name: "Aloe Vera Soothing Gel",
    price: "Rp. 90.000",
    sold: "25RB++ sold",
    image: imageProduct,
    rating: 4,
    reviews: [
      {user: "Paula", rating: 4, review: "Soothing for sunburns."},
      {user: "Quincy", rating: 5, review: "Instantly cools my skin!"},
      {user: "Rita", rating: 4, review: "Dries out quickly."},
    ],
    ingredients: "Aloe Vera Extract, Glycerin, Panthenol, Sodium Hyaluronate.",
  },
  {
    id: 7,
    name: "Green Tea Pore Minimizer",
    price: "Rp. 180.000",
    sold: "12RB++ sold",
    image: imageProduct,
    rating: 4,
    reviews: [
      {
        user: "Sam",
        rating: 4,
        review: "Helps minimize pores but slow results.",
      },
      {user: "Tina", rating: 5, review: "Love the tightening effect!"},
      {
        user: "Uma",
        rating: 4,
        review: "Good for oily skin but doesn’t last long.",
      },
    ],
    ingredients:
      "Green Tea Extract, Witch Hazel, Niacinamide, Hyaluronic Acid.",
  },
  {
    id: 8,
    name: "Collagen Booster Serum",
    price: "Rp. 300.000",
    sold: "3RB++ sold",
    image: imageProduct,
    rating: 5,
    reviews: [
      {
        user: "Victor",
        rating: 5,
        review: "My skin feels plumper and youthful!",
      },
      {user: "Wendy", rating: 5, review: "Improved skin texture."},
      {user: "Xavier", rating: 4, review: "Good but a bit thick."},
    ],
    ingredients: "Hydrolyzed Collagen, Peptides, Niacinamide, Glycerin.",
  },
  {
    id: 9,
    name: "Hyaluronic Acid Hydrating Serum",
    price: "Rp. 220.000",
    sold: "15RB++ sold",
    image: imageProduct,
    rating: 5,
    reviews: [
      {user: "Yara", rating: 5, review: "Most hydrating serum I’ve tried!"},
      {user: "Zach", rating: 4, review: "Good but can feel sticky."},
      {user: "Alana", rating: 5, review: "Great under makeup!"},
    ],
    ingredients: "Hyaluronic Acid, Glycerin, Panthenol, Allantoin.",
  },
  {
    id: 10,
    name: "Oil Control Face Wash",
    price: "Rp. 120.000",
    sold: "30RB++ sold",
    image: imageProduct,
    rating: 4,
    reviews: [
      {
        user: "Ben",
        rating: 4,
        review: "Great for oil control but can be drying.",
      },
      {user: "Carmen", rating: 5, review: "Keeps oily skin in check all day!"},
      {
        user: "Diana",
        rating: 4,
        review: "Leaves skin feeling tight sometimes.",
      },
    ],
    ingredients: "Salicylic Acid, Tea Tree Oil, Witch Hazel, Glycerin.",
  },
  {
    id: 11,
    name: "Acne Spot Treatment Gel",
    price: "Rp. 100.000",
    sold: "18RB++ sold",
    image: imageProduct,
    rating: 5,
    reviews: [
      {user: "Eddie", rating: 5, review: "Clears pimples quickly!"},
      {user: "Faye", rating: 4, review: "Works but can be drying."},
      {user: "Grace", rating: 5, review: "The best for sudden breakouts."},
    ],
    ingredients: "Benzoyl Peroxide, Tea Tree Oil, Glycerin, Niacinamide.",
  },
  {
    id: 12,
    name: "Anti-aging Serum with Peptides",
    price: "Rp. 320.000",
    sold: "5RB++ sold",
    image: imageProduct,
    rating: 5,
    reviews: [
      {user: "Hank", rating: 5, review: "My skin looks firmer and smoother."},
      {user: "Isla", rating: 5, review: "Helped reduce my fine lines."},
      {user: "Jake", rating: 5, review: "Feels luxurious and effective."},
    ],
    ingredients: "Peptides, Hyaluronic Acid, Niacinamide, Vitamin C.",
  },
  {
    id: 13,
    name: "Whitening Body Lotion",
    price: "Rp. 160.000",
    sold: "22RB++ sold",
    image: imageProduct,
    rating: 4,
    reviews: [
      {
        user: "Karen",
        rating: 4,
        review: "It does brighten the skin, but it takes time.",
      },
      {user: "Leo", rating: 5, review: "Leaves my skin smooth and lightened!"},
      {user: "Mia", rating: 4, review: "Good lotion but a bit thick."},
    ],
    ingredients: "Niacinamide, Glycerin, Vitamin C, Shea Butter.",
  },
];

function ProductDetail() {
  const {id} = useParams();
  const product = products.find((product) => product.id === parseInt(id));
  const navigate = useNavigate();

  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(true);
  const [isPic1, setIsPic1] = useState(true);
  const [isPPic2, setIsPic2] = useState(false);

  if (!product) {
    return <h2>Product not found</h2>;
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
            {isPic1 && <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />}
            {isPPic2 && <img
              src={product.image2}
              alt={product.name}
              className="product-image"
            /> }
            <div className="product-header-container-image">
              <img
                src={product.image}
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
