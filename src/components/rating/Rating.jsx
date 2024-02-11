import "./rating.css";
import PropTypes from "prop-types";

const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return 0;
    if (ratings.length === 1) return ratings; // If there's only one rating, return it directly
    const total = ratings.reduce((acc, rating) => acc + rating);
    return total / ratings.length;
};



// Function to render stars
const renderStars = (rating) => {
    const stars = [];
    // Whole stars
    for (let i = 0; i < Math.floor(rating); i++) {
        stars.push(<i key={i} className="fas fa-star filled"></i>);
    }
    // Half star (only if there are more than one review)
    if (rating % 1 !== 0 && rating !== 1) {
        stars.push(<i key="half" className="fas fa-star-half-alt filled"></i>);
    }
    // Empty stars
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
        stars.push(<i key={i + Math.floor(rating)} className="far fa-star"></i>);
    }
    return stars;
};


export const Rating = ({ ratings }) => {
    const averageRating = calculateAverageRating(ratings);

    return (
        <div className="review-stars">
            <div className="average-rating">
                <div>{averageRating.toFixed(1)}</div>
                <div>{renderStars(averageRating)}</div>
            </div>
        </div>
    );
}

Rating.propTypes = {
    ratings: PropTypes.arrayOf(PropTypes.number).isRequired,
};