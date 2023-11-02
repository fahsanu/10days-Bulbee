import { useEffect, useState } from "react";
import Category from "../../components/Category/Category";
import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {
//   const Category = ({ category: any, path }) => (
//     <div className="category">
//       <Link to={path}>{category}</Link>
// ]    </div>
  //   );
  // Get user
  const [bulb, setBulb] = useState(0);
  useEffect(() => {
    try {
      const token = window.localStorage.getItem("access_token")
      // console.log(token)
      const response = fetch(`http://127.0.0.1:4000/auth/get_bulb` , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
      })
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .then((data) => setBulb(data.result))
      .catch((error) => console.log("Getting error", error));
    } catch (error) {
        console.error(error);
    }
  },[bulb])

  return (
    <div className="homepage">
      <div className="banner">
        <h1>Banner Area</h1>
      </div>
      <div className="banner-indicator">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      <div className="section">
        <div className="my-bulb">
          <img src="/light-bulb.png" className="bulb-icon" />
          <h3>Balance</h3>
          <h2>{bulb}</h2>
        </div>
        <div className="my-purchase">
          <img src="/shopping-bag.png" className="bag-icon" />
          <h2 className="text1">My</h2>
          <h2 className="text2">Purchase</h2>
        </div>
      </div>
      <div className="category-header">
        <h2>Browse Category</h2>
      </div>
      <div className="category-section">
        <div className="category">
          <Link to='/product-page'><Category category="All Products" items={150} imageSrc='/category-pic1.png'/></Link>
          <Link to='/fashion-page' ><Category category="Fashion" items={30} imageSrc='/category-pic2.png' /></Link>
          <Link to='beauty-page'><Category category="Beauty" items={50} imageSrc='category-pic3.png'/></Link>
          <Link to='/fooddrinks-page'><Category category="Food & Drinks" items={70}imageSrc='/category-pic4.png' /></Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
