import "./home.css";
import { Navbar } from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Loader } from "../../components/loader/loader";
import { Banner } from "../../components/banner/Banner";
import { axiosInstance } from "../../api/axiosInstance";

export const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {
        // Make your API call or fetch data here
        const response = await axiosInstance.get("/products");

        // Simulate data fetching for 2 seconds
        await new Promise(resolve => setTimeout(resolve, 500));

        // After data is fetched, update the state
        setData(response.data);

        setLoading(false);

      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render the component based on the state
  if (error) {
    return (
      <>
        <Navbar />
        <p>Error: {error.message}</p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      { data ? (<Banner />) : ""}

      <div className="container">
        {error ? (
          // Show error message if there's an error
          <p>Error: {error.message}</p>
        ) : loading ? (
          // Show loading spinner or loading box while data is being fetched
          <Loader />
        ) : data && data.length > 0 ? (
          // Render the component
          data.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          // Show a message if no data is available
          <p>No products are available for now.</p>
        )}
      </div>
    </>
  );

};
