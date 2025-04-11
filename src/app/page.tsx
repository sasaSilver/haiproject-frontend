import MovieCard from "~/components/movie-card";

export default function HomePage() {
  return (
    <div className="p-4">
      <MovieCard image="https://upload.wikimedia.org/wikipedia/en/9/9c/George_Floyd.png"rating={5} title="Niggers 2" description="Movie about more niggers" />
    </div>
  );
}
