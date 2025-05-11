export type Token = {
    access_token: string,
    token_type: string
}

export type Rating = {
    user_id: number,
    movie_id: number,
    rating: number
}

export type Genre = {
    id: string,
    name: string
}

export type Movie = {
    id?: string,
    user_rating?: number,
    vote_average: number,
    title: string,
    popularity: number,
    genres: Genre[],
    year: number,
    vote_count: number,
    description: string,
}

export type MovieUpdate = Partial<Movie>;

export type User = {
    id: number,
    name: string
}

export type CurrentUserRating = {
    movie: Movie,
    rating: number
}

export type CurrentUser = {
    id: number,
    name: string,
    recommendations: Movie[],
    ratings: CurrentUserRating[]
}

export type UserCreate = {
    name: string,
    password: string
}

export type CurrentUserUpdate = Partial<CurrentUser>;