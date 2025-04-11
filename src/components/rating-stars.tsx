"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "~/lib/utils"

interface RatingStarsProps {
  movieId: string
  initialRating?: number
  onRatingChange?: (rating: number) => void
}

export function RatingStars({ movieId, initialRating = 0, onRatingChange }: RatingStarsProps) {
  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState(0)

  const handleRating = (value: number) => {
    setRating(value)
    onRatingChange?.(value)
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          className="focus:outline-none"
          onClick={() => handleRating(value)}
          onMouseEnter={() => setHover(value)}
          onMouseLeave={() => setHover(0)}
        >
          <Star
            className={cn(
              "w-6 h-6 transition-colors",
              (hover || rating) >= value
                ? "fill-yellow-500 text-yellow-500"
                : "text-muted-foreground"
            )}
          />
        </button>
      ))}
    </div>
  )
} 