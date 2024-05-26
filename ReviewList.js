import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewList = ({ productId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/api/reviews/${productId}`);
                setReviews(response.data);
            } catch (error) {
                console.error('There was an error fetching the reviews:', error);
            }
        };

        fetchReviews();
    }, [productId]);

    return (
        <div>
            <h3>Customer Reviews</h3>
            {reviews.map((review) => (
                <div key={review._id}>
                    <h4>{review.userName}</h4>
                    <p>Rating: {review.rating} stars</p>
                    <p>{review.reviewText}</p>
                    {review.photo && <img src={review.photo} alt="Review" />}
                    {review.video && <video src={review.video} controls />}
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
