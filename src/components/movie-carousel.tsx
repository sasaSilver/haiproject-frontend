import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { MovieCard } from "./movie-card";
import type { Movie } from "~/lib/api/types";

interface MovieCarouselProps {
  title: string;
  description?: string;
  movies: Movie[];
}

export function MovieCarousel({ title, description, movies }: MovieCarouselProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        {description && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>}
      </div>
      <div className="relative">
        <ScrollArea className="w-full pb-6 rounded-md">
          <div className="flex w-max space-x-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="mt-2" />
        </ScrollArea>
      </div>
    </div>
  );
}
