"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "/components/ui/tabs"
import { MovieCard } from "/components/movie-card"
import { Button } from "/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "/components/ui/avatar"
import { Edit, Settings } from "lucide-react"
import { Star } from "lucide-react"

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
                  id={movie.id}
                  title={movie.title}
                  posterUrl={movie.posterUrl}
                  rating={movie.rating}
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
                  id={movie.id}
                  title={movie.title}
                  posterUrl={movie.posterUrl}
                  rating={movie.rating}
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
                  id={movie.id}
                  title={movie.title}
                  posterUrl={movie.posterUrl}
                  rating={movie.rating}
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
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span>{review.rating}/5</span>
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

