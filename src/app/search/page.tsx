import { MovieCard } from "~/components/movie-card";
import { MovieService } from "~/lib/api/movieService";


export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const movies = await MovieService.search(await searchParams);
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </>
  );
}
