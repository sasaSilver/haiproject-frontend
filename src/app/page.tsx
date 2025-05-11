import { MovieCarousel } from "~/components/movie-carousel";
import { MovieService } from "~/lib/api/movieService";

export default async function Home() {
  const filters = {limit: 10}
  const movies = await MovieService.getAll(filters)
  return (
    <MovieCarousel title="Popular" description="COool" movies={movies}/>
  );
}
