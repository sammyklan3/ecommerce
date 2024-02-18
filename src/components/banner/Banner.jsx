import "./banner.css";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import Slider from "react-slick";
import { Loader } from "../loader/Loader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Banner = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/banners");

        // Simulate data fetching for 2 seconds
        await new Promise(resolve => setTimeout(resolve, 500));

        console.log(response.data.banners);
        setData(response.data.banners);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {data && data.length === 1 ? (
        <div className="banner">
          <img src={data[0].ImageName} alt={`Banner 0`} />
        </div>
      ) : data && data.length > 1 ? (
        <Slider autoplay autoplaySpeed={3000}>
          {data.map((banner, index) => (
            <div key={index} className="banner">
              <img src={banner.ImageName} alt={`Banner ${index}`} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="banner">
          <Loader />
        </div>
      )}
      {error && <div>Error: {error}</div>}
    </>
  );  
};
