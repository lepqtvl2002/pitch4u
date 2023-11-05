"use client";

import { cn } from "@/lib/utils";
import { Star, StarHalf } from "lucide-react";
import * as React from "react";

export default function VoteStars({
  initialRating,
  onRatingChange,
}: {
  initialRating: number;
  onRatingChange: any;
}) {
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
          className={`star ${i <= rating ? "text-yellow-500" : ""}`}
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

export function Stars({
  rating,
  className,
  ...props
}: {
  rating: number;
  className?: string;
}) {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = rating - i > -0.5;
      const isHalfFilled = !isFilled && rating - i > -1;
      stars.push(
        <span key={i}>
          {isFilled ? (
            <Star color="yellow" fill="yellow" />
          ) : isHalfFilled ? (
            <StarHalf color="yellow" fill="yellow" />
          ) : (
            <Star color="yellow" />
          )}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={cn("flex", className)} {...props}>
      {renderStars()}
    </div>
  );
}
