import React from "react";
import {useParams} from "react-router-dom";
import imageProduct from "../../../assets/imageProducts.png";
import {useNavigate} from "react-router-dom";
const products = [
  {
    id: 1,
    name: "Ceramic Skin Saviour Moisturizer Gel",
    price: "Rp. 263.000",
    sold: "10RB++ sold",
    image: imageProduct,
    rating: 5,
  },
  {
    id: 2,
    name: "Hydra Boost Water Gel",
    price: "Rp. 175.000",
    sold: "5RB++ sold",
    image: imageProduct,
    rating: 4,
  },
  {
    id: 3,
    name: "Vitamin C Brightening Serum",
    price: "Rp. 225.000",
    sold: "7RB++ sold",
    image: imageProduct,
    rating: 5,
  },
  {
    id: 4,
    name: "Retinol Advanced Night Cream",
    price: "Rp. 290.000",
    sold: "8RB++ sold",
    image: imageProduct,
    rating: 5,
  },
  {
    id: 5,
    name: "Daily Sunblock SPF 50+",
    price: "Rp. 150.000",
    sold: "20RB++ sold",
    image: imageProduct,
    rating: 4,
  },
  {
    id: 6,
    name: "Aloe Vera Soothing Gel",
    price: "Rp. 90.000",
    sold: "25RB++ sold",
    image: imageProduct,
    rating: 4,
  },
  {
    id: 7,
    name: "Green Tea Pore Minimizer",
    price: "Rp. 180.000",
    sold: "12RB++ sold",
    image: imageProduct,
    rating: 4,
  },
  {
    id: 8,
    name: "Collagen Booster Serum",
    price: "Rp. 300.000",
    sold: "3RB++ sold",
    image: imageProduct,
    rating: 5,
  },
  {
    id: 9,
    name: "Hyaluronic Acid Hydrating Serum",
    price: "Rp. 220.000",
    sold: "15RB++ sold",
    image: imageProduct,
    rating: 5,
  },
  {
    id: 10,
    name: "Oil Control Face Wash",
    price: "Rp. 120.000",
    sold: "30RB++ sold",
    image: imageProduct,
    rating: 4,
  },
  {
    id: 11,
    name: "Acne Spot Treatment Gel",
    price: "Rp. 100.000",
    sold: "18RB++ sold",
    image: imageProduct,
    rating: 5,
  },
  {
    id: 12,
    name: "Anti-aging Serum with Peptides",
    price: "Rp. 320.000",
    sold: "5RB++ sold",
    image: imageProduct,
    rating: 5,
  },
  {
    id: 13,
    name: "Whitening Body Lotion",
    price: "Rp. 160.000",
    sold: "22RB++ sold",
    image: imageProduct,
    rating: 4,
  },
  {
    id: 14,
    name: "Rose Water Toner",
    price: "Rp. 130.000",
    sold: "28RB++ sold",
    image: imageProduct,
    rating: 4,
  },
  {
    id: 15,
    name: "Exfoliating Facial Scrub",
    price: "Rp. 145.000",
    sold: "11RB++ sold",
    image: imageProduct,
    rating: 4,
  },
];

function ProductDetail() {
  const {id} = useParams();
  const product = products.find((product) => product.id === parseInt(id));
  const navigate = useNavigate()

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const handleBack = () => {
    navigate("/products-search")
  };

  return (
    <>
      <button onClick={handleBack}> back </button>
      <div className="product-detail">
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} />
        <p>Price: {product.price}</p>
        <p>{product.sold}</p>
        <p>Rating: {product.rating} stars</p>
      </div>
    </>
  );
}

export default ProductDetail;
