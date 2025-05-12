"use client";

import { useState, useEffect } from "react"
import { Edit } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Button } from "~/components/ui/button"
import { Avatar, AvatarFallback } from "~/components/ui/avatar"
import { UserService } from "~/lib/api/userService";
import { type Movie, type CurrentUser } from "~/lib/api/types";
import { useLoginState } from "~/store/login";
import { AuthService } from "~/lib/api/authService";
import { MovieCarousel } from "~/components/movie-carousel";
import { RecommenderService } from "~/lib/api/recommenderService";

export default function ProfilePage() {
  const router = useRouter()
  const { isLoggedIn, setLoggedIn, setUserId } = useLoginState();
  const [activeTab, setActiveTab] = useState("ratings")
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [recs, setRecs] = useState<Movie[] | null>(null);
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
      return;
    }
    async function fetchUser() {
      const currentUser = await UserService.getCurrentUser();
      setUser(currentUser);
      setUserId(currentUser.id);
    }
    fetchUser();
  }, [isLoggedIn]);

  useEffect(() => {
    async function getRecs() {
      if (!user) return;
      const recs = await RecommenderService.get(user.id, undefined);
      setRecs(recs);
    }
    getRecs();
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex flex-col items-center md:items-start">
          <Avatar className="w-24 h-24 mb-4">
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
                variant="destructive"
                size="sm"
                onClick={() => {AuthService.logout(); setLoggedIn(false); router.push("/");}}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="ratings" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="ratings">Ratings ({user.ratings.length})</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="ratings">
          {user.ratings.length > 0 ? (
            <MovieCarousel title="My ratings" movies={user.ratings.map(rating => rating.movie)} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">You haven't given any ratings yet.</p>
              <Button asChild className="mt-4">
                <Link href="/">
                  Explore Movies
                </Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recommendations">
          {user.ratings.length > 0 ? (
            <MovieCarousel
              title="Your Recommendations"
              description="Movies that other users similar to you liked"
              movies={recs ?? []}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">You don't have any recommendations.</p>
              <Button asChild className="mt-4">
                <Link href="/">
                  Explore Movies
                </Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
