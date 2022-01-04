const BaseUrl = 'https://api.themoviedb.org/3'
export const BaseUrlImage = 'https://image.tmdb.org/t/p/original'
export const qs = 'api_key=d05c4c574ccd378b9dc750c4a00e6454&language=en-US'
export const GetListMovieApi = (page = 1) => `${BaseUrl}/movie/now_playing?${qs}&page=${page}`
export const GetListTVApi = (page = 1) => `${BaseUrl}/tv/on_the_air?${qs}&page=${page}`
export const GetSimilarApi = (id) => `${BaseUrl}/movie/${id}/similar?${qs}`