"use client";

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import  MovieCard  from "~/components/movie-card"
import { Button } from "~/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Edit } from "lucide-react"
import { RatingStars } from "~/components/rating-stars"
import { useLoginState } from "~/store/login"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("favorites")
  const router = useRouter()
  const logout = useLoginState((state) => state.logout)
  const { isLoggedIn, username } = useLoginState();

  if (!isLoggedIn || !username) {
    useLoginState.getState().openSignInDropdown();
    router.push("/");
    return null;
  }
  
  const user = {
    name: username,
    avatar: "/placeholder.svg?height=100&width=100",
    libraries: {
      favorites: [
        {
          id: "1",
          title: "The Batman",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.5,
        },
        {
          id: "3",
          title: "Top Gun: Maverick",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.3,
        },
        {
          id: "5",
          title: "Oppenheimer",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.7,
        },
      ],
      watchlist: [
        {
          id: "6",
          title: "Poor Things",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.6,
        },
        {
          id: "8",
          title: "Past Lives",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.5,
        },
      ],
      watched: [
        {
          id: "2",
          title: "Everything Everywhere All at Once",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.8,
        },
        {
          id: "4",
          title: "The Banshees of Inisherin",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.1,
        },
        {
          id: "7",
          title: "Killers of the Flower Moon",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.4,
        },
        {
          id: "9",
          title: "Barbie",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.2,
        },
      ],
      reviews: [
        {
          id: "2",
          title: "Everything Everywhere All at Once",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 5,
          review:
            "A mind-bending masterpiece that perfectly balances absurdist humor with genuine emotional depth. The performances are outstanding, especially Michelle Yeoh.",
        },
        {
          id: "9",
          title: "Barbie",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4,
          review:
            "Much more thoughtful and clever than I expected. Greta Gerwig delivers a film that's both entertaining and surprisingly meaningful.",
        },
      ],
    },
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex flex-col items-center md:items-start">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logout()
                  router.push("/")
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="reviews" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="favorites">Favorites ({user.libraries.favorites.length})</TabsTrigger>
          <TabsTrigger value="watchlist">Watch Later ({user.libraries.watchlist.length})</TabsTrigger>
          <TabsTrigger value="watched">Watched ({user.libraries.watched.length})</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({user.libraries.reviews.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="favorites">
          <h2 className="text-2xl font-bold mb-6">Favorites</h2>
          {user.libraries.favorites.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {user.libraries.favorites.map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  image={movie.posterUrl}
                  rating={movie.rating}
                  year={2000}
                  description="asd"
                  genres={[]}
                  duration={2000}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">You haven't added any favorites yet.</p>
              <Button className="mt-4">Explore Movies</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="watchlist">
          <h2 className="text-2xl font-bold mb-6">Watch Later</h2>
          {user.libraries.watchlist.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {user.libraries.watchlist.map((movie) => (
                <MovieCard
                key={movie.id}
                title={movie.title}
                image={movie.posterUrl}
                rating={movie.rating}
                year={2000}
                description="asd"
                genres={[]}
                duration={2000}
              />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Your watchlist is empty.</p>
              <Button className="mt-4">Explore Movies</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="watched">
          <h2 className="text-2xl font-bold mb-6">Watched</h2>
          {user.libraries.watched.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {user.libraries.watched.map((movie) => (
                <MovieCard
                key={movie.id}
                title={movie.title}
                image={movie.posterUrl}
                rating={movie.rating}
                year={2000}
                description="asd"
                genres={[]}
                duration={2000}
              />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">You haven't marked any movies as watched.</p>
              <Button className="mt-4">Explore Movies</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="reviews">
          <h2 className="text-2xl font-bold mb-6">My Reviews</h2>
          {user.libraries.reviews.length > 0 ? (
            <div className="grid gap-6">
              {user.libraries.reviews.map((review) => (
                <div key={review.id} className="flex gap-4 p-4 border rounded-lg">
                  <Image
                    src={review.posterUrl || "/placeholder.svg"}
                    alt={review.title}
                    width={100}
                    height={150}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{review.title}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <RatingStars movieId={review.id} initialRating={review.rating} />
                    </div>
                    <p className="text-muted-foreground">{review.review}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">You haven't written any reviews yet.</p>
              <Button className="mt-4">Rate Movies</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

