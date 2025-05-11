import { Button } from "~/components/ui/button";
import { GenreBadges } from "~/components/genre-bagdes"
import Image from "next/image";
import { MovieService } from "~/lib/api/movieService";
import { fetchPoster } from "~/lib/utils";


export default async function MoviePage(
  { params }: {params: Promise<{ id: string }>}
) {
  const { id } = await params;
  const movie = await MovieService.getById(id);
  const poster_path = await fetchPoster(movie.id);
  
  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-10">
      <div className="flex-shrink-0 w-full md:w-1/3">
        <div className="overflow-hidden rounded-2xl shadow-xl">
          <Image
            src={poster_path}
            alt={movie.title}
            width={500}
            height={700}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
      <div className="flex-1 text-gray-900 dark:text-white space-y-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {movie.title} <span className="text-sm font-light">({movie.year})</span>
          </h1>
          <p className="text-lg">IMDb: {movie.vote_average}/10</p>
          {movie.user_rating !== undefined && (
            <p className="text-sm">You rated this: {movie.user_rating}/10</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <GenreBadges genres={movie.genres}/>
        </div>
        <p className="leading-relaxed text-base md:text-lg max-w-prose">
          {movie.description}
        </p>
        <div>
          <Button variant="secondary">
            Watch Trailer
          </Button>
        </div>
      </div>
    </div>
  );
}
