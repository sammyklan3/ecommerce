import "./home.css";
import { Navbar } from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Loader } from "../../components/loader/loader";
import { Banner } from "../../components/banner/Banner";

export const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = "http://localhost:3000/products";

    const fetchData = async () => {
      try {
        // Make your API call or fetch data here
        const response = await fetch(API_URL);

        const result = await response.json();

        // Simulate data fetching for 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));

        // After data is fetched, update the state
        setData(result);
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
        ) : data && data ? (
          // Render the component
          data.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          // Show a message if no data is available
          <p>No data available</p>
        )}
      </div>
    </>
  );

};
