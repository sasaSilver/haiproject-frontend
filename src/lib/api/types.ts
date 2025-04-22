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
    id: number,
    name: string
}

export type Movie = {
    id?: number,
    title: string,
    duration: number,
    genres: Genre[],
    year: number,
    rating: number,
    description: string,
    image: string
}

export type MovieUpdate = Partial<Movie>;

export type User = {
    id: number,
    name: string,
    recommendations: Movie[],
    ratings: Rating[]
}

export type UserCreate = {
    name: string,
    password: string
}

export type UserUpdate = Partial<User>;

export type MovieFilters = {
    andGenres?: string[],
    notGenres?: string[],
    orGenres?: string[],
    year?: number,
    rating?: number,
    limit?: number
}

export type Oauth2PasswordRequestForm = {
    username: string,
    password: string
}