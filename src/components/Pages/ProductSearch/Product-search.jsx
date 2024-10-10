import React, {useState} from "react";
import ProductCard from "./Product-card";
import "./Product-search.css";
import imageProduct from "../../../assets/imageProducts.png";
import useFetch from "../../../hooks/useFetch";
import Hero from "./HeroProduct";
const products = [
  {
    id: 1,
    name: "Ceramic Skin Saviour Moisturizer Gel",
    price: "Rp. 263.000",
    sold: "10RB++ sold",
    image: imageProduct,
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

function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const {data: productDatas, loading: courseLoading} = useFetch(
    "http://localhost:3002/product/getProducts"
  );

  console.log(productDatas);

  if (courseLoading) {
    return <div></div>;
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="space-products">
        <Hero />
        <div className="product-search-container">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search Product"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductSearch;
