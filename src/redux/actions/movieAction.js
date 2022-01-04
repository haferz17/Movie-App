import { GET_LIST_MOVIE, GET_LIST_TV, GET_SIMILAR_MOVIE } from '../../config/actionType'

export const getListMovieAction = (item) => ({
    type: GET_LIST_MOVIE,
    payload: item
})

export const getListTVAction = (item) => ({
    type: GET_LIST_TV,
    payload: item
})

export const getSimilarAction = (id) => ({
    type: GET_SIMILAR_MOVIE,
    payload: { id }
})