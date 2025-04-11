import Image from "next/image";
import { Star } from "lucide-react"
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardFooter,
  CardDescription,
  CardTitle,
  CardContent,
} from "~/components/ui/card";

type MovieCardProps = {
  title: string;
  description: string;
  image: string;
  rating: number;
};

export default function MovieCard(movie: MovieCardProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{movie.title}</CardTitle>
        <CardDescription>{movie.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image width={350} height={300} src={movie.image} alt="movie image"/>
      </CardContent>
      <CardFooter className="flex">
        <Star/> {movie.rating}
      </CardFooter>
    </Card>
  );
}
