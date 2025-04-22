import Image from "next/image";
import type { Movie } from "~/lib/api/types"
import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
} from "~/components/ui/card";


export default function MovieCard(movie: Movie) {
  return (
    <Card className="w-[350px] relative overflow-hidden">
      <CardContent className="p-0">
        <div className="relative w-full h-[400px]">
          <Image 
            src={movie.image} 
            alt={movie.title} 
            fill 
            style={{ objectFit: "cover" }} 
            className="hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 flex flex-col justify-end text-white">
            <CardTitle className="text-2xl font-bold mb-1">{movie.title}</CardTitle>
            <CardDescription className="text-gray-300 mb-2">
              {movie.year}
            </CardDescription>
            <p className="text-sm text-gray-200 line-clamp-2">
              {movie.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}