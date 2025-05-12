import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { env } from "~/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchPoster(id?: string) {
  if (!id) {
    return null;
  }
  let response = null;
  try {
    response = await fetch(`http://www.omdbapi.com/?i=tt${id}&apikey=${env.NEXT_PUBLIC_OMDB_KEY}`)
  } catch (e) {
    return null;
  }
  if (!response) {
    return null;
  }
  const json = await response.json()
  const poster_path = json.Poster
  return poster_path
}