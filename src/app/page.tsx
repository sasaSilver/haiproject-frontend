import { MovieCarousel } from "~/components/movie-carousel";
import { MovieService } from "~/lib/api/movieService";

export default async function Home() {
  const popular = await MovieService.search({limit: "10"});
  const drama = await MovieService.search({and: "Drama"});
  const crime = await MovieService.search({and: "Crime"});
  const horror = await MovieService.search({and: "Horror"});
  return (
    <>
      <MovieCarousel title="Popular" description="Most popular movies" movies={popular}/>
      <MovieCarousel title="Best Drama" description="Best Drama Movies" movies={drama}/>
      <MovieCarousel title="Best Horror" description="Best Horror Movies" movies={horror}/>
      <MovieCarousel title="Best Crime" description="Best Crime Movies" movies={crime}/>
    </>
  );
}
