"use client";

import Link from "next/link";
import { Card } from "~/components/ui/card";
import { GenreBadges } from "./genre-bagdes";
import type { Movie } from "~/lib/api/types";
import { fetchPoster } from "~/lib/utils";
import { useState, useEffect } from "react";
type MovieCardProps = {
  movie: Movie;
};

export function MovieCard({ movie }: MovieCardProps) {
  const [posterPath, setPosterPath] = useState<string | null>(null);
  useEffect(() => {
      async function getPoster() {
        const path = await fetchPoster(movie.id);
        setPosterPath(path);
      }
      getPoster();
  }, [movie.id]);
  return (
    <Link href={`/movies/${movie.id}`} className="group">
      <Card className="relative w-[300px] h-[450px] rounded-2xl overflow-hidden shadow-lg cursor-pointer">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-500 
                     group-hover:scale-105 
                     group-hover:bg-black/20 group-hover:dark:bg-white/20"
          style={{backgroundImage: `url(${posterPath})` }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent 
                        to-black/60 dark:to-white/60
                        group-hover:to-black/100 group-hover:dark:to-white/100
                        transition-all duration-500" />

        <div className="absolute inset-0 flex flex-col justify-end p-4 overflow-hidden">
          <div className="transform transition-all duration-500 ease-in-out translate-y-[calc(100%-110px)] group-hover:translate-y-0">
            <div className="pb-4">
              <h2 className="text-2xl font-bold text-white dark:text-gray-900 leading-tight">
                {movie.title}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-white dark:text-gray-800 text-sm font-medium">
                  IMDb: {movie.vote_average}/10
                </span>
              </div>
              <GenreBadges genres={movie.genres} />
            </div>
            <p className="text-sm text-white dark:text-gray-800 mt-7 line-clamp-6">
              {movie.description}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}