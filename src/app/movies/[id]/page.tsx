import Image from "next/image"
import { Clock, Calendar, Star, Heart, Bookmark, Share2 } from "lucide-react"

import { Button } from "/components/ui/button"
import { Badge } from "/components/ui/badge"
import { RatingStars } from "/components/rating-stars"
import { Separator } from "/components/ui/separator"
import { MovieCard } from "/components/movie-card"

// This would normally come from a database
const getMovieDetails = (id: string) => {
  return {
    id,
    title: "Dune: Part Two",
    posterUrl: "/placeholder.svg?height=600&width=400",
    backdropUrl: "/placeholder.svg?height=500&width=1200",
    rating: 4.7,
    releaseDate: "2024-03-01",
    runtime: "166 min",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
    plot: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he must prevent a terrible future only he can foresee.",
    similar: [
      {
        id: "19",
        title: "Blade Runner 2049",
        posterUrl: "/placeholder.svg?height=450&width=300",
        rating: 4.5,
      },
      {
        id: "20",
        title: "Arrival",
        posterUrl: "/placeholder.svg?height=450&width=300",
        rating: 4.6,
      },
      {
        id: "21",
        title: "Interstellar",
        posterUrl: "/placeholder.svg?height=450&width=300",
        rating: 4.8,
      },
      {
        id: "22",
        title: "The Martian",
        posterUrl: "/placeholder.svg?height=450&width=300",
        rating: 4.4,
      },
    ],
  }
}

export default function MoviePage({ params }: { params: { id: string } }) {
  const movie = getMovieDetails(params.id)

  return (
    <div>
      <div className="relative h-[400px] w-full">
        <Image src={movie.backdropUrl || "/placeholder.svg"} alt={movie.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-[300px_1fr] gap-8 -mt-32 relative z-10">
          <div className="hidden md:block">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src={movie.posterUrl || "/placeholder.svg"}
                alt={movie.title}
                width={300}
                height={450}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                <span className="font-medium">{movie.rating}/5</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{movie.releaseDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{movie.runtime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <Button>Watch Now</Button>
              <Button variant="outline" size="icon">
                <Heart className="w-4 h-4" />
                <span className="sr-only">Add to favorites</span>
              </Button>
              <Button variant="outline" size="icon">
                <Bookmark className="w-4 h-4" />
                <span className="sr-only">Add to watchlist</span>
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-muted-foreground">{movie.plot}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Director</h2>
                <p className="text-muted-foreground">{movie.director}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Cast</h2>
                <ul className="text-muted-foreground">
                  {movie.cast.map((actor) => (
                    <li key={actor}>{actor}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Rate this movie</h2>
              <RatingStars movieId={movie.id} />
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <section>
          <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movie.similar.map((similarMovie) => (
              <MovieCard
                key={similarMovie.id}
                id={similarMovie.id}
                title={similarMovie.title}
                posterUrl={similarMovie.posterUrl}
                rating={similarMovie.rating}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

