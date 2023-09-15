"use client"

import * as React from "react"

export default function VoteStars({initialRating, onRatingChange}: { initialRating: number, onRatingChange: any }) {
    const [rating, setRating] = React.useState(initialRating || 0);

    const handleStarClick = (starRating: number) => {
        setRating(starRating);
        if (onRatingChange) {
            onRatingChange(starRating);
        }
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={`star ${i <= rating ? 'text-yellow-500' : ''}`}
                    onClick={() => handleStarClick(i)}
                >
          &#9733; {/* Unicode star character */}
        </span>
            );
        }
        return stars;
    };

    return (
        <div className="voting-stars">
            {renderStars()}
            <p>Rating: {rating}</p>
        </div>
    );
}

export function Stars({rating, className, ...props}: {
    rating: number,
    className?: string,
}) {
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const isFilled = i <= Math.floor(rating) || (i === Math.ceil(rating) && rating % 1 !== 0);

            stars.push(
                <span
                    key={i}
                    className={`star ${isFilled ? 'filled' : ''}`}
                >
          {isFilled ? '\u2605' : '\u2606'} {/* Filled and empty star Unicode characters */}
        </span>
            );
        }
        return stars;
    };

    return (
        <div className={className} {...props}>
            {renderStars()}
        </div>
    );
}