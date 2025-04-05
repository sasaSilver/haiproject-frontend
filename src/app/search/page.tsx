"use client"

import type React from "react"

import { useState } from "react"
import { Search, Sparkles } from "lucide-react"
import { Button } from "/components/ui/button"
import { Input } from "/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "/components/ui/tabs"
import { MovieCard } from "/components/movie-card"
import { Textarea } from "/components/ui/textarea"

export default function SearchPage() {
  const [regularQuery, setRegularQuery] = useState("")
  const [aiQuery, setAiQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleRegularSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    // Simulate search results
    setTimeout(() => {
      setSearchResults([
        {
          id: "11",
          title: "Inception",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.8,
        },
        {
          id: "12",
          title: "The Shawshank Redemption",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.9,
        },
        {
          id: "13",
          title: "The Dark Knight",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.7,
        },
        {
          id: "14",
          title: "Pulp Fiction",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.6,
        },
      ])
      setIsSearching(false)
    }, 1000)
  }

  const handleAiSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    // Simulate AI search results
    setTimeout(() => {
      setSearchResults([
        {
          id: "15",
          title: "The Grand Budapest Hotel",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.4,
        },
        {
          id: "16",
          title: "Moonrise Kingdom",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.3,
        },
        {
          id: "17",
          title: "The Royal Tenenbaums",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.2,
        },
        {
          id: "18",
          title: "Fantastic Mr. Fox",
          posterUrl: "/placeholder.svg?height=450&width=300",
          rating: 4.5,
        },
      ])
      setIsSearching(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Search Movies</h1>

      <Tabs defaultValue="regular" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="regular">Regular Search</TabsTrigger>
          <TabsTrigger value="ai">AI Search</TabsTrigger>
        </TabsList>

        <TabsContent value="regular">
          <form onSubmit={handleRegularSearch} className="mb-8">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for movies, actors, directors..."
                  className="pl-10"
                  value={regularQuery}
                  onChange={(e) => setRegularQuery(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={isSearching}>
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="ai">
          <form onSubmit={handleAiSearch} className="mb-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="text-primary" />
                <h3 className="font-medium">AI-Powered Search</h3>
              </div>
              <Textarea
                placeholder="Describe the movie you're looking for... (e.g., 'A visually stunning sci-fi movie with deep philosophical themes')"
                className="min-h-[100px]"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
              />
              <Button type="submit" className="mt-2" disabled={isSearching}>
                {isSearching ? "Searching..." : "Find Movies"}
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>

      {searchResults.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {searchResults.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                rating={movie.rating}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

