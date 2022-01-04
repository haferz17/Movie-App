import { GET_LIST_MOVIE, GET_LIST_TV, GET_SIMILAR_MOVIE } from '../../config/actionType'

export const getListMovieAction = () => ({
    type: GET_LIST_MOVIE
})

export const getListTVAction = () => ({
    type: GET_LIST_TV
})

export const getSimilarAction = (id) => ({
    type: GET_SIMILAR_MOVIE,
    payload: { id }
})