import React, {useState} from "react";
import ProductCard from "./Product-card";
import "./Product-search.css";
import useFetch from "../../../hooks/useFetch";
import Hero from "./HeroProduct";

function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: productDatas,
    loading: productLoading,
    error,
  } = useFetch("http://localhost:3002/product/getProduct");

  const fallbackProducts = [
    {
      id: "97TQWKADv7d7wdWPM7bM",
      name: "Ceramic Skin Saviour Moisturizer Gel",
      price: "Rp. 263.000",
      sold: "10RB++ sold",
      image1:
        "https://firebasestorage.googleapis.com/v0/b/glowi-4d056.appspot.com/o/products%2Fceramix-2.webp?alt=media&token=9227acc6-bd27-4564-a677-0dc05fb453fe",
      rating: 5,
      ingredients: [
        "Water",
        "Glycerin",
        "Dimethicone",
        "Niacinamide",
        "Hyaluronic Acid",
        "Ceramide NP",
        "Marine Collagen",
      ],
    },
  ];

  const products = productDatas?.length ? productDatas : fallbackProducts;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const mappedProducts = products.map((product) => ({
    id: product.id,
    image: product.image1,
    name: product.name,
    sold: product.sold,
    price: product.price,
  }));

  if (productLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching product data:", error);
    return <div>Error fetching data</div>;
  }
  const filteredProducts = products.filter((product) =>
  product.name?.toLowerCase().includes(searchTerm.toLowerCase())
);

  console.log("Filtered Products:", filteredProducts);
  
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
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div>No products found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}  
export default ProductSearch;
