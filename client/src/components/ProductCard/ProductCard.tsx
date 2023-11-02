import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./ProductCard.css";
import LightBulbImg from "../../assets/light-bulb.png";
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;700&display=swap"
  rel="stylesheet"
></link>;

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  picture_url: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  picture_url,
}) => {
  return (
    <Link to={`/description?id=${id}`} className="product-card-link">
      <div className="product-card">
        <img src={picture_url} alt="product pic" />
        <div className="product-card-des">
          <div className="product-name">{name}</div>
          <div className="price-container">
            <div>
              <p className="price-number">{price}</p>
            </div>
            <div>
              <img
                src={LightBulbImg}
                alt="รูปหลอดไฟจ้า"
                className="thumbnail"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
