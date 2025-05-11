import { MovieCard } from "~/components/movie-card";
import type { Movie } from "~/lib/api/types";

const movies: Movie[] = [
  {
    id: 0,
    user_rating: 1,
    title: "Cool Movie",
    duration: 50,
    genres: [{id: 1, name: "autism"}, {id: 2, name: "retards"}],
    year: 2000,
    rating: 3,
    description: "Ut sint eiusmod ex proident nisi et quis duis irure veniam est.",
    image: "https://placehold.co/800x800",
  }
];

type SearchParams = {
  query?: string;
  and?: string | string[];
  not?: string | string[];
  or?: string | string[];
};

export default function SearchPage(
  { searchParams }: { searchParams: SearchParams }
) {
  const { query, and, not, or } = searchParams;

  const andFilters = Array.isArray(and)
    ? and : and ? [and] : [];

  const notFilters = Array.isArray(not)
    ? not : not ? [not] : [];

  const orFilters = Array.isArray(or)
    ? or : or ? [or] : [];

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Search Results{query ?? ` for "${query}"`}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
