"use client";

import * as React from "react";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card";
import Image from "next/image";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface MovieCarouselProps {
  movies: Movie[];
}

export function MovieCarousel({ movies }: MovieCarouselProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {movies.map((movie) => (
          <Card key={movie.id} className="w-[250px] shrink-0">
            <CardHeader>
              <CardTitle className="truncate">{movie.title}</CardTitle>
              <CardDescription>
                {new Date(movie.release_date).getFullYear()} • ⭐ {movie.vote_average.toFixed(1)}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="rounded-b-lg object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <p className="line-clamp-3 text-sm text-muted-foreground">{movie.overview}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}