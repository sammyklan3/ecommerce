import "./carousel.css";
import { useState, useEffect } from 'react';
import PropTypes from "prop-types";

export const Carousel = ({ images, interval = 3000 }) => {

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const autoPlayInterval = setInterval(() => {
      if (!isHovered) {
        nextSlide();
      }
    }, interval);

    return () => {
      clearInterval(autoPlayInterval);
    };
  }, [interval, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Duplicate the first and last images for circular carousel
  const duplicatedImages = [...images, images[0], images[1]]; // Add first two images to the end
  const adjustedIndex = activeIndex % images.length; // Adjust activeIndex to be within the original images range

  return (
    <div className="carousel" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button onClick={prevSlide} className="carousel__btn carousel__btn--prev">
        &lt;
      </button>
      <img
        src={duplicatedImages[adjustedIndex]}
        alt={`Slide ${adjustedIndex}`}
        className="carousel__img"
      />
      <button onClick={nextSlide} className="carousel__btn carousel__btn--next">
        &gt;
      </button>
    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  interval: PropTypes.number.isRequired,
};