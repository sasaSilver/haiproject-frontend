type SearchResultsProps = {
  searchParams: {
    query?: string | string[];
    and?: string | string[];
    not?: string | string[];
    or?: string | string[];
  };
};

import MovieCard from "~/components/movie-card";

const movies = [
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology.",
    image: "/images/inception.jpg",
    rating: 4.8,
  },
  {
    title: "The Matrix",
    description: "A computer hacker learns about the true nature of his reality.",
    image: "/images/matrix.jpg",
    rating: 4.7,
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    image: "/images/interstellar.jpg",
    rating: 4.6,
  },
];

export default function SearchResults({ searchParams }: SearchResultsProps) {
  const query = Array.isArray(searchParams.query)
    ? searchParams.query[0]
    : searchParams.query || '';

  const andFilters = Array.isArray(searchParams.and)
    ? searchParams.and
    : searchParams.and
    ? [searchParams.and]
    : [];

  const notFilters = Array.isArray(searchParams.not)
    ? searchParams.not
    : searchParams.not
    ? [searchParams.not]
    : [];

  const orFilters = Array.isArray(searchParams.or)
    ? searchParams.or
    : searchParams.or
    ? [searchParams.or]
    : [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.title}
            title={movie.title}
            image={movie.image}
            rating={movie.rating}
          />
        ))}
      </div>
    </div>
  );
}
