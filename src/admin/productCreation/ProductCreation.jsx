// Updated Component
import { useState } from 'react';
import "./productCreation.css";
import { SideNav } from "../../components/adminNav/SideNav";
import { axiosInstance } from '../../api/axiosInstance';

export const ProductCreation = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stockquantity: "",
    model: "",
    category: "",
    image: undefined,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.stockquantity ||
      !formData.model ||
      !formData.category
    ) {
      setError("Please fill in all required fields");

      // Set a timer to clear the error after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;

    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("stockquantity", formData.stockquantity);
    formDataToSend.append("model", formData.model);
    formDataToSend.append("category", formData.category);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await axiosInstance.post("/createProducts", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(response.data.message);
      console.log(response.message);

    } catch (error) {
      console.log(error)
      setError(error.response.data.error)

      // Set a timer to clear the error after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
  };

  return (
    <>
      <div className="product-creation-container">
        <SideNav />
        <form className='product-creation-form' encType="multipart/form-data">
          <div className="form-row">
            <label>
              Product Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Product Description:
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Number of items:
              <input
                type="number"
                name="stockquantity"
                value={formData.stockquantity}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Model:
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Category:
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Product Price:
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-row file-input">
            <input
              type="file"
              id="fileInput"
              name="image"
              onChange={handleChange}
              className="inputfile"
            />
            <label htmlFor="fileInput">Upload Image</label>
          </div>
          <div className="form-row">
            <button type="submit" onClick={handleSubmit} className="submitBtn">Create</button>
          </div>

          {error ? (
            <span className="error">Error: {error}</span>
          ) : success ? (
            <span className="success">{success}</span>
          ) : null
          }
        </form>
      </div>
    </>
  );
}
