"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import  MovieCard  from "~/components/movie-card"
import { Button } from "~/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Edit, Settings } from "lucide-react"
import { Star } from "lucide-react"
import { RatingStars } from "~/components/rating-stars"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("favorites")

  // Mock user data
  const user = {
    name: "Jane Smith",
    username: "janesmith",
    avatar: "/placeholder.svg?height=100&width=100",
    joinDate: "January 2023",
    reviewCount: 42,
    libraries: {
      favorites: [
        {
          id: "1",
          title: "The Batman",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.5,
          description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
        },
        {
          id: "3",
          title: "Top Gun: Maverick",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.3,
          description: "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot.",
        },
        {
          id: "5",
          title: "Oppenheimer",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.7,
          description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
        },
      ],
      watchlist: [
        {
          id: "6",
          title: "Poor Things",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.6,
          description: "The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.",
        },
        {
          id: "8",
          title: "Past Lives",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.5,
          description: "Nora and Hae Sung, two deeply connected childhood friends, are wrested apart after Nora's family emigrates from South Korea. Twenty years later, they are reunited for one fateful week.",
        },
      ],
      watched: [
        {
          id: "2",
          title: "Everything Everywhere All at Once",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.8,
          description: "A middle-aged Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.",
        },
        {
          id: "4",
          title: "The Banshees of Inisherin",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.1,
          description: "Two lifelong friends find themselves at an impasse when one abruptly ends their relationship, with alarming consequences for both of them.",
        },
        {
          id: "7",
          title: "Killers of the Flower Moon",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.4,
          description: "When oil is discovered in 1920s Oklahoma under Osage Nation land, the Osage people are murdered one by one - until the FBI steps in to unravel the mystery.",
        },
        {
          id: "9",
          title: "Barbie",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.2,
          description: "Barbie suffers a crisis that leads her to question her world and her existence.",
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
            <p className="text-muted-foreground mb-2">{user.username}</p>
            <p className="text-sm text-muted-foreground mb-4">Member since {user.joinDate}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-8 md:place-items-end">
          <div className="text-center p-4 rounded-lg border">
            <div className="text-3xl font-bold">{user.libraries.favorites.length}</div>
            <div className="text-sm text-muted-foreground">Favorites</div>
          </div>
          <div className="text-center p-4 rounded-lg border">
            <div className="text-3xl font-bold">{user.libraries.watched.length}</div>
            <div className="text-sm text-muted-foreground">Watched</div>
          </div>
          <div className="text-center p-4 rounded-lg border">
            <div className="text-3xl font-bold">{user.reviewCount}</div>
            <div className="text-sm text-muted-foreground">Reviews</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="favorites" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="watchlist">Watch Later</TabsTrigger>
          <TabsTrigger value="watched">Watched</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
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
                  description={movie.description}
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
                  description={movie.description}
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
                  description={movie.description}
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

