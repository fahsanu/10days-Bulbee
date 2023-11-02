import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AdminAdd.css";
import axios from "axios";

interface UploadParams {
  image: File;
  product: string;
  description: string;
  category: string;
  quantity: number;
  bulb_price: number;
}

const AdminAdd = () => {
  const [file, setFile] = useState();
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] =
    useState<string>("select an option");
  const [quantity, setQuantity] = useState(0);
  const [bulb_price, setPrice] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    // if (file) {
    //   const result = await postData({ image: file, product, description, category, quantity, price });
    //   setImages([result, ...images]);
    // }
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("product", product);
      formData.append("description", description);
      formData.append("category", selectedOption);
      formData.append("quantity", quantity.toString());
      formData.append("bulb_price", bulb_price.toString());

      try {
        const response = await axios.post(
          "http://localhost:4000/products/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.status) {
          alert("Upload Successful");
          setProduct("");
          setDescription("");
          setSelectedOption("select an option");
          setQuantity(0);
          setPrice(0);
          setFile(undefined);

          // const imageUrl = response.data.imageUrl;
          // console.log('File upload successful:', imageUrl);
          // setImages([imageUrl, ...images]);
        } else {
          console.log("Upload failed");
        }
      } catch (error) {
        console.error("Error during the file upload:", error);
      }
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "product") {
      setProduct(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "quantity") {
      setQuantity(parseInt(value) || 0);
    } else if (name === "bulb_price") {
      setPrice(parseInt(value) || 0);
    }
  };

  const fileSelected = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleCategoryChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="admin-page">
      <div className="admin-title">Add New Product</div>
      <form onSubmit={submit}>
        <div className="product-title">Product Name</div>
        <input
          type="text"
          name="product"
          className="name-input"
          value={product}
          onChange={handleInputChange}
          placeholder="name"
          required
        ></input>
        <div className="product-title">Description</div>
        <textarea
          name="description"
          className="description-input"
          value={description}
          onChange={handleInputChange}
          placeholder="description"
          required
        ></textarea>
        <div className="product-title">Category</div>
        <select
          value={selectedOption}
          onChange={handleCategoryChange}
          className="category-dropdown"
        >
          <option value="" disabled hidden>
            Select an option
          </option>
          <option value="Beauty" className="category-option">
            Beauty
          </option>
          <option value="Fashion" className="category-option">
            Fashion
          </option>
          <option value="FoodDrinks" className="category-option">
            Food & Drinks
          </option>
        </select>
        <div className="product-title">
          <div className="product-title left">Quantity</div>
          <div className="product-title right">Price</div>
        </div>
        <div className="input-container">
          <input
            type="text"
            name="quantity"
            className="two-input left2"
            value={quantity}
            onChange={handleInputChange}
            placeholder="quantity"
            required
          ></input>
          <input
            type="text"
            name="bulb_price"
            className="two-input right2"
            value={bulb_price}
            onChange={handleInputChange}
            placeholder="price"
            required
          ></input>
        </div>
        <div className="product-title">Image</div>

        <div className="product-title">
          <input
            onChange={fileSelected}
            type="file"
            accept="image/*"
            className="choose-file"
            required
          ></input>

          {images.map((image) => (
            <div key={image}>
              <img src={image}></img>
            </div>
          ))}
        </div>
        <button className="add-button" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminAdd;
