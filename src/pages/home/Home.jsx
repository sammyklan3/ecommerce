import "./home.css";
import { Navbar } from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { ProductCard } from "../../components/ProductCard/ProductCard";

export const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = "http://localhost:3001/api/products";

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
      <div className="container">
        {loading ? (
          // Show loading spinner or loading box while data is being fetched
          <div className="loading-spinner"></div>
        ) : (
          // Render the component
          data && data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </>
  );
  
};
