import "./banner.css";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Banner = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/banners");
        
        setData(response.data.banners);
      } catch (err) {
        setError(err.response.data.error);
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
        <div className="slider-container">
          <Slider autoplay autoplaySpeed={3000} className="custom-slider">
            {data.map((banner, index) => (
              <div key={index} className="banner">
                <img src={banner.ImageName} alt={`Banner ${index}`} />
              </div>
            ))}
          </Slider>
        </div>
        ) : error ? (
          <div className="banner-error">
            {error && <div>Error: {error}</div>}
          </div>
        
      ) : (
        <div className="banner-loading">
          <div className="spinner-loading"></div>
        </div>
      )}
      
    </>
  );  
};
