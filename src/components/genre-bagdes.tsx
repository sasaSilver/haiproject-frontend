import { Badge } from "~/components/ui/badge";
import type { Genre } from "~/lib/api/types";

type GenreBadgesProps = {
    genres: Genre[]
}

export function GenreBadges({ genres }: GenreBadgesProps) {
    return (
      <div className="flex gap-1 mt-1">
          {genres.map((genre) => (
            <Badge key={genre.id} variant="secondary">
              {genre.name}
            </Badge>
          ))}
      </div>
    )
}