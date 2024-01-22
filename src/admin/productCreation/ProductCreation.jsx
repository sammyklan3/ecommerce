import { useState } from 'react';
import "./ProductCreation.css";
import { Navbar } from "../../components/navbar/Navbar";

export const ProductCreation = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stockquantity: "",
    model: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can add logic to send the form data to a server here
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <form onSubmit={handleSubmit} className='dark-form' encType="multipart/form-data">
          {/* Product name field */}
          <label>
            Product Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          {/* Description feild */}
          <label>
            Product Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <br />

          {/* Stockquantity */}
          <label>
            Number of items:
            <input
              type="number"
              name="stockquantity"
              value={formData.stockquantity}
              onChange={handleChange}
            />
          </label>
          <br />

          {/* Image*/}
          <div className="custom-file-input">
            <input
              type="file"
              id="fileInput"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="inputfile"
            />
            <label htmlFor="fileInput">Upload Image</label>
            </div>
          
          <br />

          {/* Price field */}
          <label>
            Product Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
