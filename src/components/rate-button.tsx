"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useLoginState } from "~/store/login";
import { RatingService } from "~/lib/api/ratingService";

type RateButtonProps = {
  movieId: string;
};

export function RateButton({ movieId }: RateButtonProps) {
  const { isLoggedIn, userId } = useLoginState();
  const [rating, setRating] = useState<number | null>(0);
  
  useEffect(() => {
    async function fetchRating(userId: number, movieId: string) {
      try {
        const response = await RatingService.get(userId, movieId);
        setRating(response.rating);
      } catch {
        setRating(null);
      }
    }
    fetchRating(userId!, movieId);
  }, [isLoggedIn, userId, movieId]);
  if (!isLoggedIn || !userId) return null;

  const handleClick = async (value: number) => {
    try {
      const newRating = { user_id: userId, movie_id: movieId, rating: value };
      if (rating === null || rating === 0) {
        await RatingService.create(newRating);
      } else {
        await RatingService.update(newRating);
      }
      setRating(value);
    } catch (err) {
      console.log("Failed to update rating");
    }
  };

  return (
    <div className="flex space-x-1">
      {Array.from({ length: 10 }, (value, index) => index + 1).map((value) => (
        <Star
          key={value}
          size={24}
          className={`cursor-pointer ${ rating ?
            value <= rating ? "text-yellow-400" : "text-gray-400"
            : "text-gray-400"
          }`}
          onClick={() => handleClick(value)}
        />
      ))}
    </div>
  );
}
